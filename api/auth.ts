import { compare } from 'bcryptjs'
import { clearSessionCookie, createSession, isAuthenticated, sessionCookie } from './_lib/auth.js'

export default {
  async fetch(request: Request) {
    if (request.method === 'GET') return Response.json({ authenticated: await isAuthenticated(request) })
    if (request.method === 'DELETE') return Response.json({ ok: true }, { headers: { 'Set-Cookie': clearSessionCookie() } })
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
    const { email, password } = await request.json() as { email?: string; password?: string }
    const validEmail = !!email && email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase()
    const validPassword = !!password && !!process.env.ADMIN_PASSWORD_HASH && await compare(password, process.env.ADMIN_PASSWORD_HASH)
    if (!validEmail || !validPassword) return Response.json({ error: 'Credenciais inválidas' }, { status: 401 })
    const token = await createSession()
    return Response.json({ ok: true }, { headers: { 'Set-Cookie': sessionCookie(token) } })
  },
}

