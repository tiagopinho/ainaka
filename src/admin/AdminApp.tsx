import { useEffect, useState, type FormEvent } from 'react'
import { LayoutDashboard, LogOut, Palette, Settings2, Users } from 'lucide-react'
import Logo from '../components/Logo'
import BrandEditor from './BrandEditor'
import ContentEditor from './ContentEditor'
import UsersEditor from './UsersEditor'
import ProjectsEditor, { type Project } from './ProjectsEditor'

type Tab = 'projects' | 'content' | 'brand' | 'users'

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { credentials: 'include', ...init, headers: { 'Content-Type': 'application/json', ...init?.headers } })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error ?? 'Erro inesperado')
  return data
}

function Login({ onSuccess }: { onSuccess: () => void }) {
  const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setLoading(true); setError(''); const form = new FormData(event.currentTarget); try { await api('/api/auth', { method: 'POST', body: JSON.stringify({ email: form.get('email'), password: form.get('password') }) }); onSuccess() } catch (reason) { setError(reason instanceof Error ? reason.message : 'Falha no acesso') } finally { setLoading(false) } }
  return <main className="flex min-h-screen items-center justify-center px-5"><form onSubmit={submit} className="glass-panel glow-border w-full max-w-md rounded-3xl p-8"><Logo /><h1 className="mt-10 font-display text-3xl font-bold">Painel administrativo</h1><p className="mt-2 text-sm text-white/50">Entre com suas credenciais de administrador.</p><label className="mt-8 block text-xs text-white/50">E-mail<input name="email" type="email" required className="admin-input" /></label><label className="mt-4 block text-xs text-white/50">Senha<input name="password" type="password" required className="admin-input" /></label>{error && <p className="mt-4 text-sm text-red-300">{error}</p>}<button disabled={loading} className="mt-6 w-full rounded-xl bg-gradient-to-r from-neon-blue to-neon-pink px-5 py-3 font-semibold disabled:opacity-50">{loading ? 'Entrando…' : 'Entrar'}</button></form></main>
}

export default function AdminApp() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null); const [projects, setProjects] = useState<Project[]>([]); const [tab, setTab] = useState<Tab>('projects'); const [notice, setNotice] = useState('')
  const reload = async () => setProjects(await api<Project[]>('/api/projects'))
  useEffect(() => { api<{ authenticated: boolean }>(`/api/auth?t=${Date.now()}`, { cache: 'no-store' }).then(async (data) => { setAuthenticated(data.authenticated); if (data.authenticated) await reload() }).catch(() => setAuthenticated(false)) }, [])
  if (authenticated === null) return <div className="flex min-h-screen items-center justify-center text-white/50">Carregando…</div>
  if (!authenticated) return <Login onSuccess={() => setAuthenticated(true)} />
  const nav = [{ id: 'projects' as const, label: 'Projetos', Icon: LayoutDashboard }, { id: 'content' as const, label: 'Conteúdo', Icon: Settings2 }, { id: 'brand' as const, label: 'Marca e contatos', Icon: Palette }, { id: 'users' as const, label: 'Usuários', Icon: Users }]
  return <div className="min-h-screen bg-void"><header className="glass-panel sticky top-0 z-20"><div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5"><Logo /><div className="flex items-center gap-3"><a href="/" target="_blank" className="text-sm text-white/60 hover:text-white">Ver site</a><button onClick={async () => { await api('/api/auth', { method: 'DELETE' }); setAuthenticated(false) }} className="rounded-xl border border-white/10 p-2 text-white/60" title="Sair"><LogOut size={18} /></button></div></div></header><div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[220px_1fr]"><aside className="flex gap-2 overflow-auto lg:block lg:space-y-2">{nav.map(({ id, label, Icon }) => <button key={id} onClick={() => { setTab(id); setNotice('') }} className={`flex min-w-fit items-center gap-3 rounded-xl px-4 py-3 text-sm lg:w-full ${tab === id ? 'bg-neon-purple/20 text-white' : 'text-white/50'}`}><Icon size={18} /> {label}</button>)}</aside><main className="min-w-0">{notice && <div className="mb-5 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 px-4 py-3 text-sm text-neon-cyan">{notice}</div>}{tab === 'projects' && <ProjectsEditor projects={projects} reload={reload} setNotice={setNotice} />}{tab === 'content' && <ContentEditor setNotice={setNotice} />}{tab === 'brand' && <BrandEditor setNotice={setNotice} />}{tab === 'users' && <UsersEditor setNotice={setNotice} />}</main></div></div>
}
