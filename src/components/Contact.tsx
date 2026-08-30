import { AtSign, Mail, MessageCircle, MoveUpRight } from 'lucide-react'
import { contact } from '../data/contact'
import { useI18n } from '../i18n/I18nContext'

const channels = [
  { Icon: MessageCircle, label: 'WhatsApp', valueKey: 'contact.whatsapp', href: contact.whatsapp },
  { Icon: Mail, labelKey: 'contact.email', value: contact.email, href: `mailto:${contact.email}` },
  { Icon: AtSign, labelKey: 'contact.instagram', value: '@ainaka', href: contact.instagram },
]

export default function Contact() {
  const { t } = useI18n()
  return <section id="contato" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"><div className="glass-panel glow-border relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-12 sm:py-24">
    <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-neon-blue/20 blur-[80px]" /><div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-neon-pink/20 blur-[90px]" />
    <div className="relative"><span className="font-display text-xs font-semibold uppercase tracking-[.35em] text-neon-cyan">{t('contact.eyebrow')}</span><h2 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-bold leading-tight text-white sm:text-6xl">{t('contact.title1')} <span className="text-gradient">{t('contact.title2')}</span></h2><p className="mx-auto mt-6 max-w-xl leading-7 text-white/60">{t('contact.text')}</p>
    <div className="mx-auto mt-10 grid max-w-4xl gap-3 md:grid-cols-3">{channels.map(({ Icon, label, labelKey, value, valueKey, href }) => <a key={label ?? labelKey} href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-5 text-left transition hover:border-neon-purple/50 hover:bg-white/5"><Icon className="text-neon-cyan" size={21} /><span className="min-w-0 flex-1"><span className="block text-xs text-white/40">{label ?? t(labelKey!)}</span><span className="block truncate text-sm text-white/80">{value ?? t(valueKey!)}</span></span><MoveUpRight size={16} className="text-white/30 group-hover:text-white" /></a>)}</div></div>
  </div></section>
}
