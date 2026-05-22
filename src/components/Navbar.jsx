import { useState, useEffect } from 'react'
import './Navbar.css'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Research', href: '#skill-tree' },
  { label: 'GitHub', href: 'https://github.com/imlixinyang', external: true },
]

function Navbar() {
  const [active, setActive] = useState('Home')

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
  }, [])

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
          Xinyang Li <span className="cn">/ 李新阳</span>
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
