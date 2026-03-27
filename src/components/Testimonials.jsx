import { TESTIMONIALS } from '../data'
import { useHarlequin } from '../useHarlequin'

export default function Testimonials() {
  const stars = (n) => '★'.repeat(n)
  const sectionRef = useHarlequin()

  return (
    <section ref={sectionRef} className="section" id="testimonials">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-eyebrow">Client Stories</p>
          <h2 className="section-title">
            Gardens that left them<br /><em>wonderstruck</em>
          </h2>
        </div>

        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testi-card">
              <div className="testi-top">
                <span className="testi-glyph">"</span>
                <span className="testi-stars">{stars(t.stars)}</span>
              </div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-rule" />
              <div className="testi-author">{t.author}</div>
              <div className="testi-area">{t.area}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
