import { motion } from 'framer-motion'
import { AppWindow, Blocks, Bot, Globe2, LifeBuoy, Rocket } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { useI18n } from '../i18n/I18nContext'

const services = [
  { Icon: Globe2, key: '1' }, { Icon: Rocket, key: '2' }, { Icon: AppWindow, key: '3' },
  { Icon: Blocks, key: '4' }, { Icon: Bot, key: '5' }, { Icon: LifeBuoy, key: '6' },
]

export default function Services() {
  const { t } = useI18n()
  return <section id="servicos" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"><div className="mx-auto max-w-7xl">
    <SectionHeading eyebrow={t('services.eyebrow')} title={t('services.title')} description={t('services.description')} />
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map(({ Icon, key }, i) => <motion.article key={key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }} className="glass-panel glow-border group rounded-3xl p-7">
      <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-blue/20 to-neon-pink/20 text-neon-cyan transition group-hover:scale-110"><Icon size={23} /></div>
      <h3 className="font-display text-xl font-semibold text-white">{t(`service.${key}.title`)}</h3><p className="mt-3 text-sm leading-7 text-white/55">{t(`service.${key}.text`)}</p>
    </motion.article>)}</div>
  </div></section>
}
