const PHOTOS = [


  {
    src: '/cheshire4.jpg',
    alt: 'Tenniel illustration of Alice and the Cheshire Cat — Wonder Lawn Cape Town garden stories',
    caption: 'That depends on where you want to end up',
    pos: 'center 20%',
    height: 560,
  },
]

export default function PhotoSection() {
  return (
    <section className="photo-section">
      <div className="photo-section-inner">

        <div className="photo-section-header">
          <p className="photo-eyebrow">All that matters is what we do for each other. ~ Lewis Carroll</p>
          <h2 className="photo-title">
            Curious &amp; <em>wonderful</em>
          </h2>
        </div>

        <div className="photo-row">
          {PHOTOS.map((p, i) => (
            <div key={i} className="photo-item">
              <div className="photo-img-wrap" style={{ height: p.height }}>
                <img
                  src={p.src}
                  alt={p.alt}
                  style={{ objectPosition: p.pos }}
                  loading="lazy"
                />
              </div>
              <p className="photo-caption">{p.caption}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
