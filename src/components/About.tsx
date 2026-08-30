import { motion } from 'framer-motion'
import { Braces, Lightbulb, Users } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'

export default function About() {
  const { t } = useI18n()
  return <section id="sobre" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
    <motion.div initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
      <span className="font-display text-xs font-semibold uppercase tracking-[.35em] text-neon-pink">{t('about.eyebrow')}</span>
      <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">{t('about.title1')} <span className="text-gradient">{t('about.title2')}</span></h2>
      <p className="mt-6 leading-8 text-white/60">{t('about.p1')}</p><p className="mt-4 leading-8 text-white/60">{t('about.p2')}</p>
    </motion.div>
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="glass-panel glow-border rounded-3xl p-7 sm:translate-y-8"><Lightbulb className="text-neon-cyan" /><div className="mt-10 font-display text-4xl font-bold text-white">01</div><p className="mt-2 text-sm text-white/55">{t('about.card1')}</p></div>
      <div className="glass-panel glow-border rounded-3xl p-7"><Braces className="text-neon-pink" /><div className="mt-10 font-display text-4xl font-bold text-white">02</div><p className="mt-2 text-sm text-white/55">{t('about.card2')}</p></div>
      <div className="glass-panel glow-border rounded-3xl p-7 sm:col-span-2 sm:mt-8"><Users className="text-neon-violet" /><div className="mt-8 font-display text-2xl font-bold text-white">{t('about.card3')}</div><p className="mt-2 text-sm text-white/55">{t('about.card3text')}</p></div>
    </div>
  </div></section>
}
