import { compare } from 'bcryptjs'
import { and, eq } from 'drizzle-orm'
import { clearSessionCookie, createSession, isAuthenticated, sessionCookie } from './_lib/auth.js'
import { getDb } from './_lib/db.js'
import { adminUsers } from '../src/db/schema.js'

export default {
  async fetch(request: Request) {
    if (request.method === 'GET') return Response.json({ authenticated: await isAuthenticated(request) })
    if (request.method === 'DELETE') return Response.json({ ok: true }, { headers: { 'Set-Cookie': clearSessionCookie() } })
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
    const { email, password } = await request.json() as { email?: string; password?: string }
    if (!email || !password) return Response.json({ error: 'Credenciais inválidas' }, { status: 401 })
    let valid = false
    try {
      const db = getDb()
      const [user] = await db.select().from(adminUsers).where(and(eq(adminUsers.email, email.toLowerCase()), eq(adminUsers.active, true))).limit(1)
      valid = !!user && await compare(password, user.passwordHash)
    } catch { /* O acesso de recuperação por variável continua disponível. */ }
    if (!valid) {
      const validEmail = email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase()
      valid = validEmail && !!process.env.ADMIN_PASSWORD_HASH && await compare(password, process.env.ADMIN_PASSWORD_HASH)
    }
    if (!valid) return Response.json({ error: 'Credenciais inválidas' }, { status: 401 })
    const token = await createSession()
    return Response.json({ ok: true }, { headers: { 'Set-Cookie': sessionCookie(token) } })
  },
}
