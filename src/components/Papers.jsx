function Papers() {
  return (
    <section className="section" id="papers">
      <hr className="section-divider" />
      <div className="section-header">
        <h2 className="section-title">Selected Papers</h2>
        <a href="#" className="section-link">View all →</a>
      </div>

      <div className="paper-list">
        <div className="paper-row">
          <span className="paper-marker">[+]</span>
          <div className="paper-info">
            <div className="paper-name">FlashWorld</div>
            <div className="paper-desc">High-quality 3D scene generation within seconds</div>
            <div className="paper-meta">
              <span className="paper-tag oral">Oral</span>
              <span>ICLR 2026</span>
              <span>★ 754</span>
            </div>
          </div>
        </div>

        <div className="paper-row">
          <span className="paper-marker">[+]</span>
          <div className="paper-info">
            <div className="paper-name">Director3D</div>
            <div className="paper-desc">Real-world camera trajectory and 3D scene generation from text</div>
            <div className="paper-meta">
              <span className="paper-tag">NeurIPS</span>
              <span>NeurIPS 2024</span>
              <span>★ 376</span>
            </div>
          </div>
        </div>

        <div className="paper-row">
          <span className="paper-marker">[+]</span>
          <div className="paper-info">
            <div className="paper-name">Dual3D</div>
            <div className="paper-desc">Efficient and consistent text-to-3D generation via dual-mode multi-view latent diffusion</div>
            <div className="paper-meta">
              <span className="paper-tag">arXiv</span>
              <span>arXiv 2024</span>
            </div>
          </div>
        </div>

        <div className="paper-row">
          <span className="paper-marker">[+]</span>
          <div className="paper-info">
            <div className="paper-name">HiSD</div>
            <div className="paper-desc">Image-to-image translation via hierarchical style disentanglement</div>
            <div className="paper-meta">
              <span className="paper-tag oral">Oral</span>
              <span>CVPR 2021</span>
              <span>★ 395</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Papers
