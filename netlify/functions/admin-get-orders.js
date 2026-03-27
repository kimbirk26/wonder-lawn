import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async (event) => {
  if (event.httpMethod !== 'GET') return { statusCode: 405, body: 'Method not allowed' }

  const token = event.headers.authorization?.replace('Bearer ', '')
  if (!token) return { statusCode: 401, body: 'Unauthorized' }

  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) return { statusCode: 401, body: 'Invalid token' }
  if (user.email !== process.env.ADMIN_EMAIL) return { statusCode: 403, body: 'Forbidden' }

  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return { statusCode: 500, body: 'Failed to fetch orders' }

  const userIds = [...new Set(orders.map(o => o.user_id))]

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name, phone')
    .in('id', userIds)
  const profileMap = Object.fromEntries((profiles || []).map(p => [p.id, p]))

  const { data: { users: authUsers } } = await supabase.auth.admin.listUsers({ perPage: 1000 })
  const emailMap = Object.fromEntries(
    (authUsers || []).filter(u => userIds.includes(u.id)).map(u => [u.id, u.email])
  )

  const enriched = orders.map(o => ({
    ...o,
    customer_email: emailMap[o.user_id] || null,
    customer_name: profileMap[o.user_id]?.full_name || null,
    customer_phone: profileMap[o.user_id]?.phone || null,
  }))

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enriched),
  }
}
