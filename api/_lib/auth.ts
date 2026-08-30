import { jwtVerify, SignJWT } from 'jose'

const cookieName = 'ainaka_admin_session'
const secret = () => {
  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) throw new Error('SESSION_SECRET inválido')
  return new TextEncoder().encode(process.env.SESSION_SECRET)
}

export async function createSession() {
  return new SignJWT({ role: 'admin' }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('8h').sign(secret())
}

export async function isAuthenticated(request: Request) {
  const cookie = request.headers.get('cookie') ?? ''
  const token = cookie.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${cookieName}=`))?.split('=')[1]
  if (!token) return false
  try { await jwtVerify(token, secret()); return true } catch { return false }
}

export function sessionCookie(token: string) {
  return `${cookieName}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800`
}

export function clearSessionCookie() {
  return `${cookieName}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`
}

