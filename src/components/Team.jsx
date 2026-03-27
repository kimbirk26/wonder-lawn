import { TEAM } from '../data'

const GALLERY = [
  { src: '/team/yellow.webp',           alt: 'Botanical drawing — yellow orchids' },
  { src: '/team/botanical-garden.webp', alt: 'Botanical drawing — garden in bloom' },
  { src: '/team/mango.webp',            alt: 'Mango' },
  { src: '/team/botanical-ct.webp',     alt: 'Botanical drawing' },
]

export default function Team() {
  return (
    <section className="section section-parchment" id="team">

      {/* Header: Absolem image + title + sub + stats */}
      <div className="team-absolem">
        <figure className="team-absolem-figure">
          <img
            src="/team/absolem.webp"
            alt="Absolem the caterpillar — a symbol of transformation and the garden's quiet wisdom"
            className="team-absolem-img"
            loading="lazy"
          />
        </figure>
        <div className="team-absolem-text">
          <div className="hero-eyebrow" style={{ justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
            <span className="hero-eyebrow-line" style={{ maxWidth: '2rem' }} />
            The Gardeners
          </div>
          <h2 className="team-hero-title">
            The curious minds<br /><em>behind every garden</em>
          </h2>
          <p className="team-hero-sub">
            A small, exceptional team — each person a specialist,
            all of them passionate about the living world.
          </p>
        </div>
      </div>

      {/* Team list */}
      <div className="team-list">
        <div className="hero-eyebrow" style={{ justifyContent: 'center', margin: '5rem 0 0' }}>
          <span className="hero-eyebrow-line" />
          Meet the team
          <span className="hero-eyebrow-line" />
        </div>
        {TEAM.map((m) => (
          <div key={m.name} className="team-row">
            <div className="team-row-photo">
              {m.photo
                ? <img src={m.photo} alt={`${m.name}, ${m.role} at Wonder Lawn`} loading="lazy" style={m.photoPosition ? { objectPosition: m.photoPosition } : {}} />
                : <div className="team-row-initials" style={{ background: m.bg }}>{m.initials}</div>
              }
            </div>
            <div className="team-row-text">
              <div className="team-name">{m.name}</div>
              <div className="team-role">{m.role}</div>
              <p className="team-quote">{m.quote}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}
