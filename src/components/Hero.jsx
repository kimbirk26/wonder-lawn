import { useHarlequin } from '../useHarlequin'

export default function Hero() {
  const sectionRef = useHarlequin(0)
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }
  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="hero pattern-section" id="hero">
      <div className="hero-glow-1" />
      <div className="hero-glow-2" />
      <div className="hero-pattern" />

      <div className="hero-split">
        {/* Text side */}
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            Bespoke Garden Design · Cape Town
            <span className="hero-eyebrow-line" />
          </div>

          <h1 className="hero-title">
            Every garden hides<br />
            <em>a door to somewhere</em>
          </h1>
          <div className="hero-title-grin">wonderful :)</div>

          <div className="hero-divider">
            <span className="hero-divider-line" />
            <span className="hero-divider-glyph">❧</span>
            <span className="hero-divider-line" />
          </div>

          <p className="hero-sub">
            We design, plant, and tend exceptional gardens for discerning Cape Town homes.
            Quietly expert. Endlessly curious.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={scrollToContact}>
              Book a Consultation
            </button>
            <button className="btn-outline" onClick={scrollToServices}>
              Explore Services
            </button>
          </div>
          <a
            href="https://wa.me/27637931439?text=Hello!%20I'd%20love%20to%20find%20out%20more%20about%20Wonder%20Lawn."
            target="_blank"
            rel="noopener noreferrer"
            className="hero-wa-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.122 1.523 5.855L.057 23.882a.75.75 0 00.92.92l6.101-1.474A11.932 11.932 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.717 9.717 0 01-4.976-1.366l-.356-.213-3.695.892.908-3.603-.233-.371A9.718 9.718 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
            </svg>
            or reach us on WhatsApp
          </a>
        </div>

        {/* Tea image — green theme only */}
        <div className="hero-tea-wrap">
          <div className="hero-tea-frame">
            <img src="/tea.webp" alt="Afternoon tea in a bespoke Cape Town garden — Wonder Lawn garden design" className="hero-tea-img" fetchpriority="high" />
            <div className="hero-tea-caption">:) A garden afternoon</div>
          </div>
        </div>
      </div>

    </section>
  )
}
