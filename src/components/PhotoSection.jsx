const PHOTO = {
  src: '/teaparty.jpeg',
  alt: 'Tenniel illustration of Alice and the Cheshire Cat — Wonder Lawn Cape Town garden stories',
  caption: 'That depends on where you want to end up',
}

export default function PhotoSection() {
  return (
    <section className="photo-section">

      <div className="photo-bleed-wrap">
        <img
          src={PHOTO.src}
          alt={PHOTO.alt}
          className="photo-bleed-img"
          loading="lazy"
        />
        <div className="photo-bleed-overlay-caption">{PHOTO.caption}</div>
      </div>

      <div className="photo-text-band">
        <div className="section-inner">
          <div className="photo-section-header">
            <p className="photo-eyebrow">All that matters is what we do for each other. ~ Lewis Carroll</p>
            <h2 className="photo-title">
              Curious &amp; <em>wonderful</em>
            </h2>
          </div>
        </div>
      </div>

    </section>
  )
}
