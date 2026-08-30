import Logo from './Logo'
import { useI18n } from '../i18n/I18nContext'

export default function Footer() {
  const { t } = useI18n()
  return <footer className="border-t border-white/10 px-5 py-10 sm:px-8"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left"><a href="#inicio"><Logo /></a><p className="text-xs text-white/40">{t('footer.text')}</p><div className="flex gap-5 text-xs text-white/50"><a href="#servicos" className="hover:text-white">{t('nav.services')}</a><a href="#sobre" className="hover:text-white">{t('nav.about')}</a><a href="#contato" className="hover:text-white">{t('nav.contact')}</a></div></div></footer>
}
