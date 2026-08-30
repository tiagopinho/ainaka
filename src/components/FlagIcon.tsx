import type { Locale } from '../i18n/I18nContext'

export default function FlagIcon({ locale, className = 'h-4 w-6' }: { locale: Locale; className?: string }) {
  if (locale === 'pt-BR') return <svg viewBox="0 0 60 40" className={className} role="img" aria-label="Brasil"><rect width="60" height="40" rx="3" fill="#169b62"/><path d="M30 5 54 20 30 35 6 20Z" fill="#ffdf00"/><circle cx="30" cy="20" r="9" fill="#002776"/><path d="M22 18c6-2 12-1 17 3" fill="none" stroke="#fff" strokeWidth="1.5"/></svg>
  if (locale === 'en-GB') return <svg viewBox="0 0 60 40" className={className} role="img" aria-label="Reino Unido"><rect width="60" height="40" rx="3" fill="#012169"/><path d="M0 0 60 40M60 0 0 40" stroke="#fff" strokeWidth="8"/><path d="M0 0 60 40M60 0 0 40" stroke="#c8102e" strokeWidth="4"/><path d="M30 0v40M0 20h60" stroke="#fff" strokeWidth="12"/><path d="M30 0v40M0 20h60" stroke="#c8102e" strokeWidth="7"/></svg>
  if (locale === 'es-ES') return <svg viewBox="0 0 60 40" className={className} role="img" aria-label="Espanha"><rect width="60" height="40" rx="3" fill="#aa151b"/><rect y="10" width="60" height="20" fill="#f1bf00"/><circle cx="18" cy="20" r="3" fill="#aa151b"/></svg>
  return <svg viewBox="0 0 60 40" className={className} role="img" aria-label="França"><path d="M0 0h20v40H0Z" fill="#0055a4"/><path d="M20 0h20v40H20Z" fill="#fff"/><path d="M40 0h20v40H40Z" fill="#ef4135"/></svg>
}

