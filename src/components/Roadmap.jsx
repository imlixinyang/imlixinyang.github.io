function Roadmap() {
  const steps = [
    { icon: '◻', label: '3D Scene Generation' },
    { icon: '◎', label: 'Dynamic Scene Generation' },
    { icon: '▣', label: 'Interactive Scene Generation' },
    { icon: '⬡', label: 'Scalable Scene Generation' },
    { icon: '◉', label: 'Rendering-based World Model', final: true },
  ]

  return (
    <section className="section" id="research">
      <hr className="section-divider" />
      <div className="section-header">
        <h2 className="section-title">Research Roadmap</h2>
      </div>

      <div className="roadmap-wrapper">
        <div className="roadmap">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div className="roadmap-step">
                <div className={`roadmap-icon ${step.final ? 'final' : ''}`}>
                  {step.icon}
                </div>
                <div className="roadmap-label">{step.label}</div>
              </div>
              {i < steps.length - 1 && (
                <div className="roadmap-arrow">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

import React from 'react'

export default Roadmap
