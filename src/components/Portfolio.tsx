import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { useI18n } from '../i18n/I18nContext'

// Cases conceituais temporários — substituir pelos projetos reais da AINAKA.
const projects = [
  { name: 'NOVA / Future Finance', typeKey: 'project.1.type', gradient: 'from-neon-blue/70 via-neon-violet/30 to-transparent', code: '01' },
  { name: 'Orbit / Urban Living', typeKey: 'project.2.type', gradient: 'from-neon-pink/60 via-neon-purple/25 to-transparent', code: '02' },
  { name: 'Pulse / Creative Lab', typeKey: 'project.3.type', gradient: 'from-neon-cyan/60 via-neon-blue/20 to-transparent', code: '03' },
]

export default function Portfolio() {
  const { t } = useI18n()
  return <section id="portfolio" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"><div className="mx-auto max-w-7xl">
    <SectionHeading eyebrow={t('portfolio.eyebrow')} title={t('portfolio.title')} description={t('portfolio.description')} />
    <div className="grid gap-5 lg:grid-cols-3">{projects.map((project) => <article key={project.name} className="glass-panel group overflow-hidden rounded-3xl border border-white/10">
      <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${project.gradient}`}><div className="grid-overlay absolute inset-0 opacity-70" /><span className="absolute bottom-2 right-5 font-display text-8xl font-bold text-white/[.07]">{project.code}</span><div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-3xl border border-white/20 bg-white/5 transition duration-500 group-hover:rotate-90 group-hover:scale-110" /></div>
      <div className="flex items-center justify-between p-6"><div><span className="text-xs uppercase tracking-widest text-neon-cyan">{t(project.typeKey)}</span><h3 className="mt-2 font-display text-lg font-semibold text-white">{project.name}</h3></div><ArrowUpRight className="text-white/50 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" /></div>
    </article>)}</div>
  </div></section>
}
