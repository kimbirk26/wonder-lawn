import crypto from 'crypto'
import https from 'https'
import { createClient } from '@supabase/supabase-js'

const IS_SANDBOX = process.env.PAYFAST_SANDBOX !== 'false'
const PAYFAST_VALIDATE_HOST = IS_SANDBOX
  ? 'sandbox.payfast.co.za'
  : 'www.payfast.co.za'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function validateSignature(data, receivedSignature, passphrase) {
  const params = Object.entries(data)
    .filter(([k]) => k !== 'signature')
    .filter(([, v]) => v !== '' && v !== null && v !== undefined)
    .map(([k, v]) => `${k}=${encodeURIComponent(v).replace(/%20/g, '+')}`)
    .join('&')

  const str = passphrase
    ? `${params}&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, '+')}`
    : params

  const expected = crypto.createHash('md5').update(str).digest('hex')
  return expected === receivedSignature
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let body = ''
      res.on('data', chunk => body += chunk)
      res.on('end', () => resolve(body))
    }).on('error', reject)
  })
}

function parseQueryString(qs) {
  return Object.fromEntries(new URLSearchParams(qs))
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  const data = parseQueryString(event.body)

  const passphrase = process.env.PAYFAST_PASSPHRASE || ''
  const signatureValid = validateSignature(data, data.signature, passphrase)
  if (!signatureValid) {
    console.error('PayFast ITN: invalid signature')
    return { statusCode: 400, body: 'Invalid signature' }
  }

  const validationUrl = `https://${PAYFAST_VALIDATE_HOST}/eng/query/validate`
  const validationParams = Object.entries(data)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join('&')

  try {
    const validationResult = await httpsGet(`${validationUrl}?${validationParams}`)
    if (!validationResult.includes('VALID')) {
      console.error('PayFast ITN: server validation failed', validationResult)
      return { statusCode: 400, body: 'Validation failed' }
    }
  } catch (err) {
    console.error('PayFast ITN: validation request failed', err)
    return { statusCode: 500, body: 'Validation error' }
  }

  const { m_payment_id, pf_payment_id, payment_status } = data

  if (payment_status === 'COMPLETE') {
    const { error } = await supabase
      .from('orders')
      .update({ status: 'paid', payfast_payment_id: pf_payment_id })
      .eq('id', m_payment_id)

    if (error) {
      console.error('Supabase update error:', error)
      return { statusCode: 500, body: 'DB update failed' }
    }
  } else if (payment_status === 'CANCELLED') {
    await supabase
      .from('orders')
      .update({ status: 'cancelled' })
      .eq('id', m_payment_id)
  }

  return { statusCode: 200, body: 'OK' }
}
