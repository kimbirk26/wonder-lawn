const ROW = [
  { src: '/collage/peony.jpg',     alt: 'Garden roses'       },
  { src: '/collage/tall.png',  alt: 'Geranium in bloom'  },
  { src: '/topiary.jpg', alt: 'Garden butterfly'   },

]

export default function Gallery() {
  return (
    <section className="section gallery-section">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-eyebrow">A Glimpse Inside</p>
          <h2 className="section-title">
            Wonders seen through<br /><em>unusual windows</em>
          </h2>
        </div>

        <div className="gallery-row">
          {ROW.map(img => (
            <div key={img.src} className="gallery-row-tile">
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
