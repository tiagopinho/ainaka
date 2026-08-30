import { and, eq } from 'drizzle-orm'
import { isAuthenticated } from './_lib/auth.js'
import { getDb } from './_lib/db.js'
import { settings, siteContent } from '../src/db/schema.js'

export default {
  async fetch(request: Request) {
    const db = getDb()
    if (request.method === 'GET') {
      const [content, config] = await Promise.all([db.select().from(siteContent), db.select().from(settings)])
      return Response.json({ content, settings: Object.fromEntries(config.map((item) => [item.key, item.value])) })
    }
    if (!await isAuthenticated(request)) return Response.json({ error: 'Não autorizado' }, { status: 401 })
    if (request.method === 'PUT') {
      const body = await request.json() as { locale?: string; key?: string; value?: string; entries?: { locale: string; key: string; value: string }[]; setting?: { key: string; value: string } }
      if (body.setting) {
        const [saved] = await db.insert(settings).values(body.setting).onConflictDoUpdate({ target: settings.key, set: { value: body.setting.value, updatedAt: new Date() } }).returning()
        return Response.json(saved)
      }
      const entries = body.entries ?? (body.locale && body.key && typeof body.value === 'string' ? [{ locale: body.locale, key: body.key, value: body.value }] : [])
      if (!entries.length) return Response.json({ error: 'Conteúdo inválido' }, { status: 400 })
      const saved = await Promise.all(entries.map((entry) => db.insert(siteContent).values(entry).onConflictDoUpdate({ target: [siteContent.locale, siteContent.key], set: { value: entry.value, updatedAt: new Date() } }).returning()))
      return Response.json(saved.flat())
    }
    if (request.method === 'DELETE') {
      const body = await request.json() as { locale: string; key: string }
      await db.delete(siteContent).where(and(eq(siteContent.locale, body.locale), eq(siteContent.key, body.key)))
      return Response.json({ ok: true })
    }
    return new Response('Method not allowed', { status: 405 })
  },
}
