import { createClient } from '@supabase/supabase-js'

const VALID_STATUSES = ['pending', 'paid', 'shipped', 'delivered', 'cancelled']
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' }

  const token = event.headers.authorization?.replace('Bearer ', '')
  if (!token) return { statusCode: 401, body: 'Unauthorized' }

  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) return { statusCode: 401, body: 'Invalid token' }
  if (user.email !== process.env.ADMIN_EMAIL) return { statusCode: 403, body: 'Forbidden' }

  let body
  try { body = JSON.parse(event.body) } catch { return { statusCode: 400, body: 'Invalid JSON' } }

  const { orderId, status } = body
  if (!orderId || !VALID_STATUSES.includes(status)) return { statusCode: 400, body: 'Invalid params' }

  const { error } = await supabase.from('orders').update({ status }).eq('id', orderId)
  if (error) return { statusCode: 500, body: 'Update failed' }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) }
}
