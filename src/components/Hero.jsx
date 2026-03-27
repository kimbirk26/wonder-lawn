import { useHarlequin } from '../useHarlequin'

export default function Hero() {
  const sectionRef = useHarlequin(0)

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView()
  }

  return (
    <section ref={sectionRef} className="hero" id="hero">
      <div className="hero-half">

        <div className="hero-half-text">

          <p className="hero-eyebrow-editorial">Cape Town</p>
          <h1 className="hero-half-title">
            Every garden hides a door<br />
           to somewhere  <em>wonderful.</em>
          </h1>
          <p className="hero-half-sub">
            Bespoke garden design.
          </p>
          <button className="btn-primary" onClick={scrollToContact}>
            Book Services
          </button>
        </div>

        <div className="hero-half-img-wrap">
          <img
            src="/hero/tea.webp"
            alt="A winding garden path — Wonder Lawn bespoke garden design Cape Town"
            className="hero-half-img"
            fetchPriority="high"
          />
        </div>

      </div>
    </section>
  )
}
