import { useEffect, useRef } from 'react'

const FRAMES = [
  {
    id: 'sign',
    src: '/dodo.jpeg',
    alt: 'Alice in Wonderland signpost — every garden path leads somewhere, Wonder Lawn Cape Town',
    caption: 'Every path leads somewhere',
    pos: 'center 40%',
  },
  {
    id: 'roses',
    src: '/roses.webp',
    alt: 'Red roses in full bloom in a garden - Wonder Lawn bespoke planting and borders',
    caption: 'The roses needed tending',
    pos: 'center 20%',
  }
]

export default function Gallery() {
  const frameRefs = useRef([])

  useEffect(() => {
    const onScroll = () => {
      frameRefs.current.forEach((el, i) => {
        if (!el) return
        if (FRAMES[i].contain) return  // skip parallax for contained images
        const rect = el.getBoundingClientRect()
        const fromCenter = (rect.top + rect.height / 2) - window.innerHeight / 2
        const offset = fromCenter * 0.06
        const img = el.querySelector('img')
        if (img) img.style.transform = `translateY(${offset}px)`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
          {FRAMES.map((f, i) => (
            <div key={f.id} className="gallery-item">
              <div
                className={`gallery-frame${f.contain ? ' gallery-frame--contain' : ''}`}
                ref={(el) => (frameRefs.current[i] = el)}
              >
                <img src={f.src} alt={f.alt} style={{ objectPosition: f.pos }} loading="lazy" />
              </div>
              <p className="gallery-caption">{f.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
