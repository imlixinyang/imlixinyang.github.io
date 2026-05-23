import { useState, useEffect, useContext } from 'react'
import { LangContext } from '../App'
import i18n from '../data/i18n.json'
import './Navbar.css'

function Navbar() {
  const { lang, setLang } = useContext(LangContext)
  const t = i18n[lang].nav
  const [active, setActive] = useState(t.home)

  const navLinks = [
    { label: t.home, href: '#home' },
    { label: t.research, href: '#skill-tree' },
    { label: 'GitHub', href: 'https://github.com/imlixinyang', external: true },
  ]

  useEffect(() => {
    const sections = navLinks
      .filter(l => !l.external)
      .map(l => ({ label: l.label, el: document.querySelector(l.href) }))
      .filter(s => s.el)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const match = sections.find(s => s.el === entry.target)
            if (match) setActive(match.label)
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach(s => observer.observe(s.el))
    return () => observer.disconnect()
  }, [lang])

  const handleClick = (e, link) => {
    if (link.external) return
    e.preventDefault()
    const el = document.querySelector(link.href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="nav">
      <div className="nav-inner">
        <span className="nav-brand">
          <span className={`nav-lang ${lang === 'en' ? 'nav-lang-active' : ''}`} onClick={() => setLang('en')}>Xinyang Li</span>
          {' / '}
          <span className={`nav-lang ${lang === 'zh' ? 'nav-lang-active' : ''}`} onClick={() => setLang('zh')}>李新阳</span>
        </span>
        <div className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={active === link.label ? 'active' : ''}
              onClick={(e) => handleClick(e, link)}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
