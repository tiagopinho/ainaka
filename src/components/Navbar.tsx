import { useEffect, useState } from 'react'
import { Check, ChevronDown, Menu, MessageCircle, X } from 'lucide-react'
import Logo from './Logo'
import { contact } from '../data/contact'
import { localeOptions, useI18n } from '../i18n/I18nContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { locale, setLocale, t, settings } = useI18n()
  const links = [['nav.services', '#servicos'], ['nav.about', '#sobre'], ['nav.portfolio', '#portfolio'], ['nav.contact', '#contato']]
  const activeLocale = localeOptions.find((option) => option.code === locale)!
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll(); window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? 'glass-panel shadow-2xl shadow-neon-purple/10' : ''}`}>
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Navegação principal">
        <a href="#inicio" aria-label="AINAKA — início"><Logo /></a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map(([key, href]) => <a key={href} href={href} className="text-sm text-white/65 transition hover:text-white">{t(key)}</a>)}
          <div className="relative">
            <button onClick={() => setLanguageOpen(!languageOpen)} className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-white/75 transition hover:border-neon-purple/50" aria-label={t('nav.language')} aria-expanded={languageOpen}><span className="text-base">{activeLocale.flag}</span>{activeLocale.short}<ChevronDown size={13} /></button>
            {languageOpen && <div className="glass-panel absolute right-0 top-12 w-64 rounded-2xl p-2 shadow-2xl">{localeOptions.map((option) => <button key={option.code} onClick={() => { setLocale(option.code); setLanguageOpen(false) }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-white/75 hover:bg-white/10"><span className="text-xl">{option.flag}</span><span className="flex-1">{option.label}</span>{locale === option.code && <Check size={15} className="text-neon-cyan" />}</button>)}</div>}
          </div>
          <a href={settings.whatsappUrl || contact.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-void transition hover:scale-105">
            <MessageCircle size={16} /> {t('nav.cta')}
          </a>
        </div>
        <div className="flex items-center gap-2 md:hidden"><button onClick={() => setLanguageOpen(!languageOpen)} className="flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-2 text-xs text-white" aria-label={t('nav.language')}><span>{activeLocale.flag}</span>{activeLocale.short}</button><button className="rounded-lg p-2 text-white" onClick={() => setOpen(!open)} aria-label={t('nav.open')} aria-expanded={open}>{open ? <X /> : <Menu />}</button></div>
      </nav>
      {languageOpen && <div className="glass-panel absolute right-5 top-[4.5rem] w-64 rounded-2xl p-2 shadow-2xl md:hidden">{localeOptions.map((option) => <button key={option.code} onClick={() => { setLocale(option.code); setLanguageOpen(false) }} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-white/75 hover:bg-white/10"><span className="text-xl">{option.flag}</span><span className="flex-1">{option.label}</span>{locale === option.code && <Check size={15} className="text-neon-cyan" />}</button>)}</div>}
      {open && <div className="glass-panel mx-4 mb-4 flex flex-col gap-1 rounded-2xl p-3 md:hidden">
        {links.map(([key, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm text-white/75 hover:bg-white/5">{t(key)}</a>)}
      </div>}
    </header>
  )
}
