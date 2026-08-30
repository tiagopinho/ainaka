import { hash } from 'bcryptjs'
import { eq, sql } from 'drizzle-orm'
import { isAuthenticated } from './_lib/auth.js'
import { getDb } from './_lib/db.js'
import { adminUsers } from '../src/db/schema.js'

const publicFields = { id: adminUsers.id, name: adminUsers.name, email: adminUsers.email, active: adminUsers.active, createdAt: adminUsers.createdAt }

export default {
  async fetch(request: Request) {
    if (!await isAuthenticated(request)) return Response.json({ error: 'Não autorizado' }, { status: 401 })
    const db = getDb()
    const url = new URL(request.url)
    if (request.method === 'GET') return Response.json(await db.select(publicFields).from(adminUsers).orderBy(adminUsers.name))
    if (request.method === 'POST') {
      const body = await request.json() as { name?: string; email?: string; password?: string }
      if (!body.name || !body.email || !body.password || body.password.length < 10) return Response.json({ error: 'Informe nome, e-mail e uma senha com pelo menos 10 caracteres.' }, { status: 400 })
      try {
        const [created] = await db.insert(adminUsers).values({ name: body.name.trim(), email: body.email.trim().toLowerCase(), passwordHash: await hash(body.password, 12) }).returning(publicFields)
        return Response.json(created, { status: 201 })
      } catch { return Response.json({ error: 'Este e-mail já está cadastrado.' }, { status: 409 }) }
    }
    const id = Number(url.searchParams.get('id'))
    if (!Number.isInteger(id)) return Response.json({ error: 'Usuário inválido.' }, { status: 400 })
    if (request.method === 'PUT') {
      const body = await request.json() as { name?: string; email?: string; password?: string; active?: boolean }
      if (body.password && body.password.length < 10) return Response.json({ error: 'A senha deve ter pelo menos 10 caracteres.' }, { status: 400 })
      const changes: Partial<typeof adminUsers.$inferInsert> = { updatedAt: new Date() }
      if (body.name) changes.name = body.name.trim()
      if (body.email) changes.email = body.email.trim().toLowerCase()
      if (typeof body.active === 'boolean') changes.active = body.active
      if (body.password) changes.passwordHash = await hash(body.password, 12)
      const [updated] = await db.update(adminUsers).set(changes).where(eq(adminUsers.id, id)).returning(publicFields)
      return updated ? Response.json(updated) : Response.json({ error: 'Usuário não encontrado.' }, { status: 404 })
    }
    if (request.method === 'DELETE') {
      const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(adminUsers).where(eq(adminUsers.active, true))
      const [target] = await db.select({ active: adminUsers.active }).from(adminUsers).where(eq(adminUsers.id, id)).limit(1)
      if (target?.active && count <= 1) return Response.json({ error: 'Não é possível excluir o último administrador ativo.' }, { status: 400 })
      await db.delete(adminUsers).where(eq(adminUsers.id, id))
      return Response.json({ ok: true })
    }
    return new Response('Method not allowed', { status: 405 })
  },
}
