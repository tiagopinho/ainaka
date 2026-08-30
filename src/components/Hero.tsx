import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowRight, Code2, Sparkles } from 'lucide-react'
import { contact } from '../data/contact'
import { useI18n } from '../i18n/I18nContext'

export default function Hero() {
  const { t } = useI18n()
  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32 sm:px-8">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_.85fr]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-neon-purple/30 bg-neon-purple/10 px-4 py-2 text-xs text-white/75"><Sparkles size={14} className="text-neon-cyan" /> {t('hero.badge')}</div>
          <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-7xl xl:text-8xl">{t('hero.title1')} <span className="text-gradient">{t('hero.title2')}</span></h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">{t('hero.text')}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink px-7 py-4 text-sm font-semibold text-white shadow-[0_0_35px_rgba(178,59,255,.3)] transition hover:scale-[1.03]">{t('hero.cta')} <ArrowRight size={17} className="transition group-hover:translate-x-1" /></a>
            <a href="#portfolio" className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 text-sm font-semibold text-white/80 transition hover:bg-white/5">{t('hero.projects')} <ArrowDownRight size={17} /></a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .2, duration: .9 }} className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
          <div className="absolute inset-[8%] animate-spin-slower rounded-full border border-dashed border-neon-purple/30" />
          <div className="absolute inset-[20%] animate-spin-slow rounded-full border border-neon-cyan/25" />
          <div className="absolute inset-[12%] flex animate-float items-center justify-center"><img src="/ainaka-symbol.png" alt={t('hero.logo')} className="h-full w-full object-contain drop-shadow-[0_0_40px_rgba(53,230,255,.32)]" /></div>
          <div className="glass-panel absolute right-3 top-20 flex items-center gap-2 rounded-xl px-4 py-3 text-xs text-white/70"><Code2 size={17} className="text-neon-cyan" /> build / create</div>
          <div className="absolute bottom-12 left-2 h-3 w-3 rounded-full bg-neon-pink shadow-[0_0_22px_8px_rgba(255,59,214,.45)]" />
        </motion.div>
      </div>
    </section>
  )
}
