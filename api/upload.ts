import { put } from '@vercel/blob'
import { isAuthenticated } from './_lib/auth.js'

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])
const maxFileSize = 4_000_000

export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
    if (!await isAuthenticated(request)) return Response.json({ error: 'Não autorizado' }, { status: 401 })
    try {
      const form = await request.formData()
      const file = form.get('file')
      if (!(file instanceof File)) return Response.json({ error: 'Nenhuma imagem foi recebida.' }, { status: 400 })
      if (!allowedTypes.has(file.type)) return Response.json({ error: 'Formato inválido. Use JPG, PNG ou WebP.' }, { status: 400 })
      if (file.size > maxFileSize) return Response.json({ error: 'A imagem deve ter no máximo 4 MB.' }, { status: 400 })
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
      const blob = await put(`ainaka/${crypto.randomUUID()}-${safeName}`, file, { access: 'public', addRandomSuffix: false })
      return Response.json({ url: blob.url })
    } catch (reason) {
      console.error('Upload failed', reason)
      return Response.json({ error: 'Não foi possível enviar a imagem. Tente novamente.' }, { status: 500 })
    }
  },
}
