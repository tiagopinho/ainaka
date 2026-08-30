import { useEffect, useState, type FormEvent } from 'react'
import { ImageUp, LayoutDashboard, LogOut, Plus, Save, Settings2 } from 'lucide-react'
import Logo from '../components/Logo'

type Project = { id: number; name: string; slug: string; coverUrl?: string; published: boolean; featured: boolean; websiteUrl?: string }

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { credentials: 'include', ...init, headers: { 'Content-Type': 'application/json', ...init?.headers } })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error ?? 'Erro inesperado')
  return data
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError('')
    const form = new FormData(event.currentTarget)
    try { await api('/api/auth', { method: 'POST', body: JSON.stringify({ email: form.get('email'), password: form.get('password') }) }); onSuccess() }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Falha no acesso') } finally { setLoading(false) }
  }
  return <main className="flex min-h-screen items-center justify-center px-5"><form onSubmit={submit} className="glass-panel glow-border w-full max-w-md rounded-3xl p-8"><Logo /><h1 className="mt-10 font-display text-3xl font-bold">Painel administrativo</h1><p className="mt-2 text-sm text-white/50">Entre com as credenciais configuradas no Vercel.</p><label className="mt-8 block text-xs text-white/50">E-mail<input name="email" type="email" required className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-neon-purple" /></label><label className="mt-4 block text-xs text-white/50">Senha<input name="password" type="password" required className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-neon-purple" /></label>{error && <p className="mt-4 text-sm text-red-300">{error}</p>}<button disabled={loading} className="mt-6 w-full rounded-xl bg-gradient-to-r from-neon-blue to-neon-pink px-5 py-3 font-semibold disabled:opacity-50">{loading ? 'Entrando…' : 'Entrar'}</button></form></main>
}

export default function AdminApp() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [tab, setTab] = useState<'projects' | 'content'>('projects')
  const [notice, setNotice] = useState('')
  const loadProjects = () => api<Project[]>('/api/projects').then(setProjects).catch(() => setProjects([]))
  useEffect(() => { api<{ authenticated: boolean }>('/api/auth').then((data) => setAuthenticated(data.authenticated)).catch(() => setAuthenticated(false)) }, [])
  useEffect(() => { if (authenticated) loadProjects() }, [authenticated])
  if (authenticated === null) return <div className="flex min-h-screen items-center justify-center text-white/50">Carregando…</div>
  if (!authenticated) return <Login onSuccess={() => setAuthenticated(true)} />

  async function createProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget); setNotice('Salvando…')
    try { await api('/api/projects', { method: 'POST', body: JSON.stringify({ name: form.get('name'), slug: form.get('slug'), websiteUrl: form.get('websiteUrl') || null, published: form.get('published') === 'on', featured: form.get('featured') === 'on', translations: {}, technologies: [] }) }); event.currentTarget.reset(); await loadProjects(); setNotice('Projeto criado.') } catch (reason) { setNotice(reason instanceof Error ? reason.message : 'Erro') }
  }
  async function saveContent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget); setNotice('Salvando…')
    try { await api('/api/content', { method: 'PUT', body: JSON.stringify({ locale: form.get('locale'), key: form.get('key'), value: form.get('value') }) }); setNotice('Texto salvo. Ele substituirá o conteúdo padrão quando a integração pública estiver ativa.') } catch (reason) { setNotice(reason instanceof Error ? reason.message : 'Erro') }
  }

  return <div className="min-h-screen bg-void"><header className="glass-panel sticky top-0 z-20"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5"><Logo /><div className="flex items-center gap-3"><a href="/" className="text-sm text-white/60 hover:text-white">Ver site</a><button onClick={async () => { await api('/api/auth', { method: 'DELETE' }); setAuthenticated(false) }} className="rounded-xl border border-white/10 p-2 text-white/60 hover:text-white" title="Sair"><LogOut size={18} /></button></div></div></header><div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[220px_1fr]"><aside className="space-y-2"><button onClick={() => setTab('projects')} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm ${tab === 'projects' ? 'bg-neon-purple/20 text-white' : 'text-white/50'}`}><LayoutDashboard size={18} /> Projetos</button><button onClick={() => setTab('content')} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm ${tab === 'content' ? 'bg-neon-purple/20 text-white' : 'text-white/50'}`}><Settings2 size={18} /> Conteúdo</button></aside><main>{notice && <div className="mb-5 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 px-4 py-3 text-sm text-neon-cyan">{notice}</div>}{tab === 'projects' ? <div><h1 className="font-display text-3xl font-bold">Projetos</h1><div className="mt-7 grid gap-5 xl:grid-cols-[1fr_360px]"><div className="space-y-3">{projects.length === 0 && <div className="glass-panel rounded-2xl p-8 text-center text-sm text-white/40">Nenhum projeto cadastrado.</div>}{projects.map((project) => <div key={project.id} className="glass-panel flex items-center gap-4 rounded-2xl p-4">{project.coverUrl ? <img src={project.coverUrl} className="h-16 w-20 rounded-lg object-cover" /> : <div className="flex h-16 w-20 items-center justify-center rounded-lg bg-white/5"><ImageUp className="text-white/20" /></div>}<div className="flex-1"><strong className="text-white">{project.name}</strong><p className="text-xs text-white/40">/{project.slug}</p></div><span className={`rounded-full px-3 py-1 text-xs ${project.published ? 'bg-emerald-400/10 text-emerald-300' : 'bg-white/5 text-white/40'}`}>{project.published ? 'Publicado' : 'Rascunho'}</span></div>)}</div><form onSubmit={createProject} className="glass-panel h-fit rounded-2xl p-6"><h2 className="flex items-center gap-2 font-display text-xl font-semibold"><Plus size={19} /> Novo projeto</h2>{['name','slug','websiteUrl'].map((name) => <label key={name} className="mt-4 block text-xs capitalize text-white/50">{name}<input name={name} required={name !== 'websiteUrl'} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-white outline-none focus:border-neon-purple" /></label>)}<div className="mt-4 flex gap-5 text-xs text-white/60"><label><input name="published" type="checkbox" className="mr-2" />Publicado</label><label><input name="featured" type="checkbox" className="mr-2" />Destaque</label></div><button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-void"><Save size={16} /> Salvar projeto</button></form></div></div> : <div><h1 className="font-display text-3xl font-bold">Conteúdo do site</h1><p className="mt-2 text-sm text-white/50">Cadastre uma chave traduzida sem alterar o código.</p><form onSubmit={saveContent} className="glass-panel mt-7 max-w-2xl rounded-2xl p-6"><label className="block text-xs text-white/50">Idioma<select name="locale" className="mt-2 w-full rounded-xl border border-white/10 bg-ink px-3 py-3 text-white"><option value="pt-BR">Português</option><option value="en-GB">Inglês</option><option value="es-ES">Espanhol</option><option value="fr-FR">Francês</option></select></label><label className="mt-4 block text-xs text-white/50">Chave (ex.: hero.title1)<input name="key" required className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-white" /></label><label className="mt-4 block text-xs text-white/50">Texto<textarea name="value" required rows={5} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-white" /></label><button className="mt-5 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-void"><Save size={16} /> Salvar conteúdo</button></form></div>}</main></div></div>
}
