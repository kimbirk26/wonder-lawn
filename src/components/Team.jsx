import { TEAM } from '../data'

export default function Team() {
  return (
    <section className="section section-parchment" id="team">

      {/* Hero: image + heading card side by side */}
      <div className="team-hero-split">
        <figure className="team-hero-figure">
          <img
            src="/MacDonaldWithFlowers.webp"
            alt="Mcdonard Kamwendo with flowers in the garden"
            className="team-hero-img"
            loading="lazy"
          />
          <figcaption className="team-hero-caption">
            Mcdonard with flowers — "I plant things that make people stop and smile."
          </figcaption>
        </figure>

        <div className="team-hero-heading">
          <div className="shop-heading-card">
            <p className="section-eyebrow" style={{ marginBottom: '1rem' }}>The Gardeners</p>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              The curious minds<br /><em>behind every garden</em>
            </h2>
            <p className="section-sub" style={{ textAlign: 'left', marginTop: '1.25rem' }}>
              A small, exceptional team — each person a specialist, all of them passionate.
            </p>
          </div>
        </div>
      </div>

      <div className="section-inner">
        <div className="team-grid">
          {TEAM.map((m) => (
            <div key={m.name} className="team-card">
              <div className="team-avatar" style={m.photo ? {} : { background: m.bg }}>
                {m.photo
                  ? <img src={m.photo} alt={`${m.name}, ${m.role} at Wonder Lawn`} className="team-avatar-photo" loading="lazy" style={m.photoPosition ? { objectPosition: m.photoPosition } : {}} />
                  : m.initials
                }
                <div className="team-avatar-dot" />
              </div>
              <div className="team-name">{m.name}</div>
              <div className="team-role">{m.role}</div>
              <p className="team-quote">{m.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
