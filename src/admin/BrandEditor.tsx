import { useEffect, useState, type ChangeEvent } from 'react'
import { ImageUp, Save } from 'lucide-react'

const assets = [
  { key: 'logoUrl', label: 'Logo horizontal', fallback: '/ainaka-logo-horizontal.png', size: 'Recomendado: 1200 × 400 px, fundo transparente.' },
  { key: 'symbolUrl', label: 'Símbolo da marca', fallback: '/ainaka-symbol.png', size: 'Recomendado: 1000 × 1000 px, fundo transparente.' },
  { key: 'faviconUrl', label: 'Favicon', fallback: '/ainaka-symbol.png', size: 'Recomendado: 512 × 512 px, formato quadrado.' },
]

export default function BrandEditor({ setNotice }: { setNotice: (message: string) => void }) {
  const [settings, setSettings] = useState<Record<string, string>>({})
  useEffect(() => { fetch('/api/content').then((response) => response.json()).then((data) => setSettings(data.settings ?? {})) }, [])
  async function saveSetting(key: string, value: string) {
    const response = await fetch('/api/content', { method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ setting: { key, value } }) })
    if (!response.ok) throw new Error('Não foi possível salvar a configuração.')
    setSettings((current) => ({ ...current, [key]: value }))
  }
  async function upload(key: string, event: ChangeEvent<HTMLInputElement>) {
    const input = event.target; const file = input.files?.[0]; if (!file) return
    setNotice(`Enviando ${file.name}…`)
    const form = new FormData(); form.append('file', file)
    try { if (!['image/jpeg','image/png','image/webp'].includes(file.type)) throw new Error('Formato inválido. Use JPG, PNG ou WebP.'); if (file.size > 4_000_000) throw new Error('A imagem deve ter no máximo 4 MB.'); const response = await fetch('/api/upload', { method: 'POST', credentials: 'include', body: form }); const raw = await response.text(); let data:{url?:string;error?:string}={}; try { data=JSON.parse(raw) } catch { throw new Error(response.status===413?'A imagem excede o limite de envio. Use um arquivo de até 4 MB.':'O servidor não retornou uma resposta válida.') } if (!response.ok) throw new Error(data.error??'Erro no envio.'); if (!data.url) throw new Error('O envio terminou sem retornar a imagem.'); await saveSetting(key, data.url); setNotice('Imagem atualizada com sucesso.') } catch (reason) { setNotice(reason instanceof Error ? reason.message : 'Erro no envio.') } finally { input.value='' }
  }
  async function saveContacts() {
    setNotice('Salvando contatos…')
    try { for (const key of ['whatsappUrl','emailAddress','instagramUrl']) await saveSetting(key, settings[key] ?? ''); setNotice('Contatos atualizados.') } catch (reason) { setNotice(reason instanceof Error ? reason.message : 'Erro ao salvar.') }
  }
  return <div><h1 className="font-display text-3xl font-bold">Marca e contatos</h1><p className="mt-2 text-sm text-white/50">Troque os arquivos visuais e os destinos dos botões do site.</p><div className="mt-8 grid gap-5 lg:grid-cols-3">{assets.map((asset) => <div key={asset.key} className="glass-panel rounded-2xl p-5"><div className="flex h-36 items-center justify-center rounded-xl bg-black/30 p-4"><img src={settings[asset.key] || asset.fallback} alt={asset.label} className="max-h-full max-w-full object-contain" /></div><h2 className="mt-4 font-display font-semibold">{asset.label}</h2><p className="mt-1 text-xs leading-5 text-white/40">{asset.size}<br/>JPG, PNG ou WebP, até 4 MB.</p><label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm text-white/70 hover:bg-white/5"><ImageUp size={17} /> Escolher arquivo<input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(event) => upload(asset.key, event)} /></label></div>)}</div><section className="glass-panel mt-6 max-w-3xl rounded-2xl p-6"><h2 className="font-display text-xl font-semibold">Canais de contato</h2>{[{ key: 'whatsappUrl', label: 'Link do WhatsApp', placeholder: 'https://wa.me/5511999999999' },{ key: 'emailAddress', label: 'E-mail', placeholder: 'contato@ainaka.com.br' },{ key: 'instagramUrl', label: 'Link do Instagram', placeholder: 'https://instagram.com/ainaka' }].map((field) => <label key={field.key} className="mt-4 block text-xs text-white/50">{field.label}<input value={settings[field.key] ?? ''} placeholder={field.placeholder} onChange={(event) => setSettings({ ...settings, [field.key]: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-neon-purple" /></label>)}<button onClick={saveContacts} className="mt-5 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-void"><Save size={16} /> Salvar contatos</button></section></div>
}
