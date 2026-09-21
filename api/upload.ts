import { put } from '@vercel/blob'
import { isAuthenticated } from './_lib/auth.js'

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])
const maxFileSize = 4_000_000
const json = (body: Record<string, string>, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'private, no-store' } })

function uploadError(reason: unknown) {
  const detail = reason instanceof Error ? reason.message : String(reason)
  const message = detail.toLowerCase()
  if (message.includes('token') && (message.includes('missing') || message.includes('not found') || message.includes('provided'))) {
    return json({ error: 'O Vercel Blob não está conectado a este ambiente. Verifique BLOB_READ_WRITE_TOKEN em Production.', code: 'BLOB_TOKEN_MISSING' }, 503)
  }
  if (message.includes('unauthorized') || message.includes('invalid token') || message.includes('forbidden')) {
    return json({ error: 'A credencial do Vercel Blob é inválida ou não pertence a este projeto.', code: 'BLOB_TOKEN_INVALID' }, 503)
  }
  if (message.includes('access') || message.includes('private')) {
    return json({ error: 'O armazenamento Blob não permite imagens públicas. Conecte um Blob público ao projeto.', code: 'BLOB_ACCESS_INVALID' }, 503)
  }
  console.error('Upload failed', reason)
  return json({ error: 'O Vercel Blob recusou o envio. Consulte o log da função /api/upload.', code: 'BLOB_UPLOAD_FAILED' }, 500)
}

export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })
    if (!await isAuthenticated(request)) return json({ error: 'Sua sessão expirou. Entre novamente no painel.', code: 'UNAUTHORIZED' }, 401)
    if (!process.env.BLOB_READ_WRITE_TOKEN && !(process.env.VERCEL_OIDC_TOKEN && process.env.BLOB_STORE_ID)) {
      return json({ error: 'O Vercel Blob não está conectado. Falta BLOB_READ_WRITE_TOKEN no ambiente de produção.', code: 'BLOB_NOT_CONFIGURED' }, 503)
    }
    try {
      const form = await request.formData()
      const file = form.get('file')
      if (!(file instanceof File)) return json({ error: 'Nenhuma imagem foi recebida.', code: 'FILE_MISSING' }, 400)
      if (!allowedTypes.has(file.type)) return json({ error: 'Formato inválido. Use JPG, PNG ou WebP.', code: 'FILE_TYPE_INVALID' }, 400)
      if (file.size > maxFileSize) return json({ error: 'A imagem deve ter no máximo 4 MB.', code: 'FILE_TOO_LARGE' }, 400)
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-')
      const blob = await put(`ainaka/${crypto.randomUUID()}-${safeName}`, file, { access: 'public', addRandomSuffix: false })
      return json({ url: blob.url })
    } catch (reason) {
      return uploadError(reason)
    }
  },
}
