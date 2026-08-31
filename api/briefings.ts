import { desc, eq } from 'drizzle-orm'
import { isAuthenticated } from './_lib/auth.js'
import { getDb } from './_lib/db.js'
import { briefings } from '../src/db/schema.js'

export default {
  async fetch(request: Request) {
    const db = getDb()
    if (request.method === 'POST') {
      const body = await request.json() as { contactName?: string; companyName?: string; email?: string; whatsapp?: string; website?: string; consent?: boolean; startedAt?: number; answers?: Record<string, unknown> }
      if (body.website || !body.consent || !body.contactName || !body.companyName || !body.email || !body.whatsapp || !body.answers) return Response.json({ error: 'Preencha os campos obrigatórios.' }, { status: 400 })
      if (body.startedAt && Date.now() - body.startedAt < 8000) return Response.json({ error: 'Envio muito rápido. Revise as respostas e tente novamente.' }, { status: 429 })
      const [created] = await db.insert(briefings).values({ contactName: body.contactName.trim(), companyName: body.companyName.trim(), email: body.email.trim().toLowerCase(), whatsapp: body.whatsapp.trim(), answers: body.answers }).returning({ id: briefings.id })
      return Response.json(created, { status: 201 })
    }
    if (!await isAuthenticated(request)) return Response.json({ error: 'Não autorizado' }, { status: 401 })
    if (request.method === 'GET') return Response.json(await db.select().from(briefings).orderBy(desc(briefings.createdAt)))
    const id = Number(new URL(request.url).searchParams.get('id'))
    if (!Number.isInteger(id)) return Response.json({ error: 'Briefing inválido.' }, { status: 400 })
    if (request.method === 'PUT') { const body = await request.json() as { status?: string; internalNotes?: string }; const [updated] = await db.update(briefings).set({ ...body, updatedAt: new Date() }).where(eq(briefings.id, id)).returning(); return Response.json(updated) }
    if (request.method === 'DELETE') { await db.delete(briefings).where(eq(briefings.id, id)); return Response.json({ ok: true }) }
    return new Response('Method not allowed', { status: 405 })
  },
}
