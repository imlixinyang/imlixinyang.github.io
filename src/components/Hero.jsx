import { useRef, useState, useEffect, useCallback } from 'react'
import config from '../data/config.json'
import './Hero.css'

function ComparisonFigure({ videoRef, renderRef }) {
  return (
    <div className="figure-wrapper">
      {/* Video World Model */}
      <div className="figure-box faded" ref={videoRef}>
        <svg viewBox="0 0 320 75" className="figure-svg">
          <text x="4" y="3" className="fig-sublabel">User Input</text>
          <rect x="4" y="6" width="100" height="24" className="fig-box" />
          <text x="10" y="14" className="fig-sublabel">High-level</text>
          <text x="10" y="24" className="fig-text">Scene / Story Description</text>

          <rect x="4" y="35" width="100" height="24" className="fig-box" />
          <text x="10" y="43" className="fig-sublabel">Low-level</text>
          <text x="10" y="53" className="fig-text">Camera / Action Control</text>

          <path d="M108 18 L118 18 L118 33 L128 33" className="fig-arrow" />
          <path d="M108 47 L118 47 L118 33 L128 33" className="fig-arrow" markerEnd="url(#arr1)" />

          <rect x="132" y="20" width="60" height="26" className="fig-box" rx="3" />
          <text x="162" y="37" className="fig-text" textAnchor="middle">Video Gen</text>

          <path d="M196 33 L216 33" className="fig-arrow" markerEnd="url(#arr1)" />

          <text x="260" y="18" className="fig-tiny" textAnchor="middle">video</text>

          <rect x="228" y="22" width="18" height="14" className="fig-frame" />
          <rect x="237" y="25" width="18" height="14" className="fig-frame" />
          <rect x="246" y="28" width="18" height="14" className="fig-frame" />
          <rect x="255" y="31" width="18" height="14" className="fig-frame" />
          <text x="280" y="42" className="fig-dots">...</text>

          <defs>
            <marker id="arr1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="var(--ash)" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* Rendering-based World Model */}
      <div className="figure-box active" ref={renderRef}>
        <svg viewBox="0 0 320 135" className="figure-svg">
          <text x="4" y="3" className="fig-sublabel">User Input</text>
          <rect x="4" y="6" width="100" height="24" className="fig-box" />
          <text x="10" y="14" className="fig-sublabel">High-level</text>
          <text x="10" y="24" className="fig-text">Scene / Story Description</text>

          <path d="M108 18 L128 18" className="fig-arrow-active" markerEnd="url(#arr2)" />

          <rect x="132" y="5" width="60" height="26" className="fig-box-active" rx="3" />
          <text x="162" y="22" className="fig-text-active" textAnchor="middle">World Gen</text>

          <path d="M196 18 L238 18" className="fig-arrow-active" markerEnd="url(#arr2)" />

          <text x="250" y="5" className="fig-text-active" textAnchor="middle">Persistent World</text>

          <g className="fig-globe">
            <circle cx="250" cy="18" r="10" fill="none" stroke="var(--fg)" strokeWidth="1.2" />
            {/* Equator - front, flows left to right */}
            <path d="M240,18 A10,3 0 0,1 260,18" fill="none" stroke="var(--fg)" strokeWidth="0.4" strokeDasharray="3 2" className="fig-globe-flow-r" />
            {/* Equator - back, flows right to left */}
            <path d="M240,18 A10,3 0 0,0 260,18" fill="none" stroke="var(--fg)" strokeWidth="0.6" strokeDasharray="3 2" className="fig-globe-flow-l" />
          </g>

          <path d="M250 30 L250 58 L196 58" className="fig-arrow-active" markerEnd="url(#arr2)" />

          <rect x="4" y="46" width="100" height="24" className="fig-box" />
          <text x="10" y="54" className="fig-sublabel">Low-level</text>
          <text x="10" y="64" className="fig-text">Camera / Action Control</text>

          <path d="M108 58 L128 58" className="fig-arrow-active" markerEnd="url(#arr2)" />

          <text x="162" y="43" className="fig-sublabel" textAnchor="middle">Edge Device</text>
          <rect x="132" y="45" width="60" height="26" className="fig-box-active" rx="3" />
          <text x="162" y="57" className="fig-text-active" textAnchor="middle">Simulate</text>
          <text x="162" y="66" className="fig-text-active" textAnchor="middle">&amp; Render</text>

          <path d="M162 75 L162 90" className="fig-arrow-active" markerEnd="url(#arr2)" />

          <rect x="122" y="95" width="18" height="14" className="fig-frame-active" />
          <rect x="131" y="98" width="18" height="14" className="fig-frame-active" />
          <rect x="140" y="101" width="18" height="14" className="fig-frame-active" />
          <rect x="149" y="104" width="18" height="14" className="fig-frame-active" />
          <text x="176" y="115" className="fig-dots">...</text>

          <text x="205" y="100" className="fig-benefit">[+] 3D consistent</text>
          <text x="205" y="112" className="fig-benefit">[+] Real-time</text>
          <text x="205" y="124" className="fig-benefit">[+] Efficient</text>

          <defs>
            <marker id="arr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="var(--fg)" />
            </marker>
          </defs>
        </svg>
      </div>
    </div>
  )
}

function NewsTicker({ news }) {
  const items = news.slice(0, 3)
  return (
    <div className="news-ticker">
      <div className="news-ticker-label">Latest News</div>
      <div className="news-ticker-window">
        {items.map((item, i) => (
          <div key={i} className={`news-ticker-item ${item.highlight ? 'news-ticker-hl' : ''}`}>
            <span className="news-ticker-date">{item.date}</span>
            <span className="news-ticker-text">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Hero() {
  const heroRef = useRef(null)
  const refVideoText = useRef(null)
  const refRenderText = useRef(null)
  const refVideoBox = useRef(null)
  const refRenderBox = useRef(null)
  const [lines, setLines] = useState([])

  const computeLines = useCallback(() => {
    const hero = heroRef.current
    if (!hero || !refVideoText.current || !refRenderText.current || !refVideoBox.current || !refRenderBox.current) return

    const heroRect = hero.getBoundingClientRect()
    const getPos = (el) => {
      const r = el.getBoundingClientRect()
      return {
        right: r.right - heroRect.left,
        left: r.left - heroRect.left,
        bottom: r.bottom - heroRect.top,
        cy: (r.top + r.bottom) / 2 - heroRect.top,
      }
    }

    const vt = getPos(refVideoText.current)
    const rt = getPos(refRenderText.current)
    const vb = getPos(refVideoBox.current)
    const rb = getPos(refRenderBox.current)

    setLines([
      { x1: vt.right + 4, y1: vt.cy, x2: vb.left - 4, y2: vb.cy, active: false },
      { x1: rt.right + 4, y1: rt.cy, x2: rb.left - 4, y2: rb.cy, active: true },
    ])
  }, [])

  useEffect(() => {
    computeLines()
    window.addEventListener('resize', computeLines)
    const t1 = setTimeout(computeLines, 100)
    const t2 = setTimeout(computeLines, 600)
    const t3 = setTimeout(computeLines, 1200)
    return () => {
      window.removeEventListener('resize', computeLines)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [computeLines])

  return (
    <section className="hero" id="home" ref={heroRef}>
      <svg className="hero-lines-overlay">
        {lines.map((l, i) => {
          const midX = l.x1 + (l.x2 - l.x1) * 0.4
          const path = `M${l.x1},${l.y1} C${midX},${l.y1} ${midX},${l.y2} ${l.x2},${l.y2}`
          return (
            <path
              key={i}
              d={path}
              fill="none"
              stroke={l.active ? 'var(--fg)' : 'var(--ash)'}
              strokeWidth={l.active ? 1.5 : 1}
              strokeDasharray="6 4"
              opacity={l.active ? 0.6 : 0.35}
            />
          )
        })}
      </svg>

      <div className="container">
        <div className="hero-split">
          <div className="hero-left">
            <h1>Hi I'm Xinyang Li</h1>
            <p className="hero-body">
              <span className="hero-line hero-line-1">I build <strong>World Models</strong></span>
              <br />
              <span className="hero-line hero-line-2">not by <span className="ref-underline" ref={refVideoText}>directly generating videos</span></span>
              <br />
              <span className="hero-line hero-line-3"><span className="em">but by</span> <span className="ref-underline active" ref={refRenderText}>generating persistent worlds</span></span>
            </p>

            <div className="stats-row">
              <a href="https://scholar.google.com/citations?user=YOUR_ID" target="_blank" rel="noopener noreferrer" className="stat-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14v7" />
                  <path d="M5 9.5v5.5a7 7 0 0 0 14 0V9.5" />
                </svg>
                <span className="num">603</span> Citations
              </a>
              <a href="https://github.com/imlixinyang" target="_blank" rel="noopener noreferrer" className="stat-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className="num">1.5K</span> Stars
              </a>
            </div>

            <div className="hire-note">
              <span className="hire-date">2026.05</span>
              Currently seeking 2027 new-grad positions in World Models — feel free to reach out if my work interests you
            </div>

            <NewsTicker news={config.news} />
          </div>

          <div className="hero-right">
            <ComparisonFigure videoRef={refVideoBox} renderRef={refRenderBox} />
          </div>
        </div>
      </div>
      <a href="#skill-tree" className="hero-scroll-hint" onClick={(e) => { e.preventDefault(); document.querySelector('#skill-tree')?.scrollIntoView({ behavior: 'smooth' }) }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 7 L10 13 L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  )
}

export default Hero
