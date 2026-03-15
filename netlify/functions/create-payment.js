import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const PAYFAST_SANDBOX_URL = 'https://sandbox.payfast.co.za/eng/process'
const PAYFAST_LIVE_URL = 'https://www.payfast.co.za/eng/process'

const IS_SANDBOX = process.env.PAYFAST_SANDBOX !== 'false'
const PAYFAST_URL = IS_SANDBOX ? PAYFAST_SANDBOX_URL : PAYFAST_LIVE_URL

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function generateSignature(data, passphrase) {
  const params = Object.entries(data)
    .filter(([, v]) => v !== '' && v !== null && v !== undefined)
    .map(([k, v]) => `${k}=${encodeURIComponent(v).replace(/%20/g, '+')}`)
    .join('&')

  const str = passphrase ? `${params}&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, '+')}` : params

  return crypto.createHash('md5').update(str).digest('hex')
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' }
  }

  const { items, total, user_id, email, delivery_address } = body

  if (!items?.length || !total || !user_id || !email) {
    return { statusCode: 400, body: 'Missing required fields' }
  }

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id,
      items: items.map(i => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
      total,
      status: 'pending',
      delivery_address,
    })
    .select('id')
    .single()

  if (orderError) {
    console.error('Order insert error:', orderError)
    return { statusCode: 500, body: 'Failed to create order' }
  }

  const merchant_id = process.env.PAYFAST_MERCHANT_ID || '10000100'
  const merchant_key = process.env.PAYFAST_MERCHANT_KEY || '46f0cd694581a'
  const passphrase = process.env.PAYFAST_PASSPHRASE || ''

  const baseUrl = process.env.SITE_URL || 'https://wonder-lawn.netlify.app'
  const itemName = items.length === 1
    ? `${items[0].qty}x ${items[0].name}`
    : `Wonder Lawn order (${items.reduce((s, i) => s + i.qty, 0)} items)`

  const form_data = {
    merchant_id,
    merchant_key,
    return_url: `${baseUrl}/order-confirmed`,
    cancel_url: `${baseUrl}/checkout`,
    notify_url: `${baseUrl}/.netlify/functions/payfast-webhook`,
    email_address: email,
    m_payment_id: order.id,
    amount: Number(total).toFixed(2),
    item_name: itemName,
  }

  const signature = generateSignature(form_data, passphrase)
  form_data.signature = signature

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ payfast_url: PAYFAST_URL, form_data }),
  }
}
