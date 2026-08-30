import BackgroundFX from './components/BackgroundFX'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useI18n } from './i18n/I18nContext'
import AdminApp from './admin/AdminApp'

export default function App() {
  const { t } = useI18n()
  if (window.location.pathname.startsWith('/admin')) return <AdminApp />
  return <div className="relative"><BackgroundFX /><Navbar /><main><Hero /><div className="marquee-shell" aria-hidden="true"><div className="marquee-track">{t('marquee').repeat(2)}</div></div><Services /><About /><Portfolio /><Contact /></main><Footer /></div>
}
