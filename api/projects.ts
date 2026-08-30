import { asc, eq } from 'drizzle-orm'
import { isAuthenticated } from './_lib/auth.js'
import { getDb } from './_lib/db.js'
import { projects } from '../src/db/schema.js'

export default {
  async fetch(request: Request) {
    const db = getDb()
    const url = new URL(request.url)
    if (request.method === 'GET') {
      const admin = await isAuthenticated(request)
      const rows = admin ? await db.select().from(projects).orderBy(asc(projects.sortOrder)) : await db.select().from(projects).where(eq(projects.published, true)).orderBy(asc(projects.sortOrder))
      return Response.json(rows)
    }
    if (!await isAuthenticated(request)) return Response.json({ error: 'Não autorizado' }, { status: 401 })
    if (request.method === 'POST') {
      const body = await request.json() as typeof projects.$inferInsert
      const [created] = await db.insert(projects).values(body).returning()
      return Response.json(created, { status: 201 })
    }
    const id = Number(url.searchParams.get('id'))
    if (!Number.isInteger(id)) return Response.json({ error: 'ID inválido' }, { status: 400 })
    if (request.method === 'PUT') {
      const body = await request.json() as Partial<typeof projects.$inferInsert>
      const [updated] = await db.update(projects).set({ ...body, updatedAt: new Date() }).where(eq(projects.id, id)).returning()
      return Response.json(updated)
    }
    if (request.method === 'DELETE') { await db.delete(projects).where(eq(projects.id, id)); return Response.json({ ok: true }) }
    return new Response('Method not allowed', { status: 405 })
  },
}

