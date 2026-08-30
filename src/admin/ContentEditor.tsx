import { useEffect, useMemo, useState } from 'react'
import { Save } from 'lucide-react'
import { contentSections, defaultTranslations, localeOptions, type Locale } from '../i18n/I18nContext'

type ContentRow = { locale: Locale; key: string; value: string }
type ContentResponse = { content: ContentRow[]; settings: Record<string, string> }

const fieldLabel = (key: string) => {
  const last = key.split('.').at(-1)
  const labels: Record<string, string> = { eyebrow: 'Chamada pequena', title: 'Título', title1: 'Título — primeira parte', title2: 'Título em destaque', text: 'Descrição', description: 'Descrição', badge: 'Selo superior', cta: 'Botão principal', projects: 'Botão de projetos', p1: 'Primeiro parágrafo', p2: 'Segundo parágrafo', card1: 'Primeiro destaque', card2: 'Segundo destaque', card3: 'Terceiro destaque', card3text: 'Descrição do terceiro destaque', marquee: 'Texto da faixa animada', services: 'Link Serviços', about: 'Link Sobre', portfolio: 'Link Portfólio', contact: 'Link Contato', whatsapp: 'Texto do WhatsApp', email: 'Rótulo do e-mail', instagram: 'Rótulo do Instagram', type: 'Categoria' }
  return labels[last ?? ''] ?? key
}

export default function ContentEditor({ setNotice }: { setNotice: (message: string) => void }) {
  const [locale, setLocale] = useState<Locale>('pt-BR')
  const [rows, setRows] = useState<ContentRow[]>([])
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  const valuesFor = (targetLocale: Locale, sourceRows: ContentRow[]) => {
    const next = { ...defaultTranslations[targetLocale] }
    for (const row of sourceRows) if (row.locale === targetLocale) next[row.key] = row.value
    return next
  }
  useEffect(() => {
    fetch('/api/content', { credentials: 'include' }).then((response) => response.json()).then((data: ContentResponse) => { const loaded = data.content ?? []; setRows(loaded); setValues(valuesFor('pt-BR', loaded)) }).finally(() => setLoading(false))
  }, [])
  const entries = useMemo(() => contentSections.flatMap((section) => section.keys.map((key) => ({ locale, key, value: values[key] ?? '' }))), [locale, values])

  async function save() {
    setNotice('Salvando todos os textos…')
    const response = await fetch('/api/content', { method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ entries }) })
    if (!response.ok) { const data = await response.json(); setNotice(data.error ?? 'Não foi possível salvar.'); return }
    setRows((current) => [...current.filter((row) => row.locale !== locale), ...entries])
    setNotice('Conteúdo salvo. Atualize o site público para visualizar.')
  }

  if (loading) return <p className="text-white/50">Carregando conteúdo…</p>
  return <div><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h1 className="font-display text-3xl font-bold">Conteúdo da landing page</h1><p className="mt-2 text-sm text-white/50">Edite todos os textos sem alterar a estrutura visual.</p></div><label className="text-xs text-white/50">Idioma<select value={locale} onChange={(event) => { const nextLocale = event.target.value as Locale; setLocale(nextLocale); setValues(valuesFor(nextLocale, rows)) }} className="mt-2 block min-w-64 rounded-xl border border-white/10 bg-ink px-4 py-3 text-white">{localeOptions.map((option) => <option key={option.code} value={option.code}>{option.flag} {option.label}</option>)}</select></label></div>
    <div className="mt-8 space-y-5">{contentSections.map((section) => <section key={section.title} className="glass-panel rounded-2xl p-5 sm:p-7"><h2 className="font-display text-xl font-semibold text-white">{section.title}</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{section.keys.map((key) => { const multiline = ['text','description','p1','p2','card3text'].some((part) => key.endsWith(part)); return <label key={key} className={`block text-xs text-white/50 ${multiline ? 'md:col-span-2' : ''}`}>{fieldLabel(key)}<span className="ml-2 font-mono text-[10px] text-white/20">{key}</span>{multiline ? <textarea rows={3} value={values[key] ?? ''} onChange={(event) => setValues({ ...values, [key]: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-neon-purple" /> : <input value={values[key] ?? ''} onChange={(event) => setValues({ ...values, [key]: event.target.value })} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-neon-purple" />}</label>})}</div></section>)}</div>
    <div className="sticky bottom-5 mt-6 flex justify-end"><button onClick={save} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-pink px-6 py-3 text-sm font-semibold text-white shadow-xl"><Save size={17} /> Salvar todos os textos</button></div>
  </div>
}
