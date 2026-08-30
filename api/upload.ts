import { put } from '@vercel/blob'
import { isAuthenticated } from './_lib/auth.js'

export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
    if (!await isAuthenticated(request)) return Response.json({ error: 'Não autorizado' }, { status: 401 })
    const form = await request.formData()
    const file = form.get('file')
    if (!(file instanceof File) || !file.type.startsWith('image/') || file.size > 8_000_000) return Response.json({ error: 'Envie uma imagem de até 8 MB' }, { status: 400 })
    const blob = await put(`ainaka/${crypto.randomUUID()}-${file.name}`, file, { access: 'public', addRandomSuffix: false })
    return Response.json(blob)
  },
}
