import { SERVICES } from '../data'
import { SuitIcon, suitAt } from './SuitIcon'
import { useHarlequin } from '../useHarlequin'

const CARD_TYPES = ['neutral', 'botanical', 'accent']

export default function Services() {
  const sectionRef = useHarlequin()
  return (
    <section ref={sectionRef} className="section section-alt pattern-section" id="services" style={{ position: 'relative' }}>

      <div className="section-inner">
        <div className="section-header">
          <p className="section-eyebrow">What We Do</p>
          <h2 className="section-title">
            Services worthy of a<br /><em>remarkable garden</em>
          </h2>
          <p className="section-sub">
            Each offering is tailored to your property, your vision, and the story you want your garden to tell.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div key={s.name} className={`service-card service-card--${CARD_TYPES[i % 3]}`}>
              <div className="service-card-bar" />
              <span className="service-icon">
                <SuitIcon suit={suitAt(i)} size={26} />
              </span>
              <div className="service-name">{s.name}</div>
              <div className="service-tagline">{s.tagline}</div>
              <p className="service-desc">{s.desc}</p>
              <div className="service-footer">
                <div className="service-price">{s.price}</div>
                <div className="service-detail">{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
