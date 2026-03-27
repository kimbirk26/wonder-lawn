import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHarlequin } from '../useHarlequin'

const PLANTS = [
  {
    id: 'agapanthus',
    name: 'Agapanthus',
    image: '/garden/purple.jpg',
    desc: 'Standing tall and violet-blue against the Cape summer sky, agapanthus needs almost nothing and gives everything. A colony in full bloom is one of the most arresting sights in any South African garden.',
    note: 'Full sun · drought-tolerant · summer flowering',
  },
  {
    id: 'agapanthus',
    name: 'Agapanthus',
    image: '/garden/pot1.jpg',
    desc: 'Standing tall and violet-blue against the Cape summer sky, agapanthus needs almost nothing and gives everything. A colony in full bloom is one of the most arresting sights in any South African garden.',
    note: 'Full sun · drought-tolerant · summer flowering',
  },
  {
    id: 'jasmine',
    name: 'Jasmine',
    image: '/garden/pot2.jpg',
    desc: 'There is no more certain sign of summer than jasmine drifting through an open window at dusk. This Chinese variety climbs willingly, flowers abundantly, and asks only for warmth.',
    note: 'Full sun to semi-shade · fast-growing · attracts pollinators',
  },
  {
    id: 'frangipani',
    name: 'Frangipani',
    image: '/garden/plumeria.jpg',
    desc: 'The frangipani carries the memory of every tropical summer. Its waxy blooms open slowly, exhaling a perfume that is gardenia-sweet with a hint of citrus — unmistakeable, unhurried.',
    note: 'Full sun · frost-sensitive · summer through autumn',
  },
  {
    id: 'camelia',
    name: 'Camelia',
    image: '/garden/camelia.jpg',
    desc: 'Old roses hold secrets that modern varieties have forgotten — complex fragrance, softly imperfect petals, and a quiet dignity that rewards patience. They are not fussy; they simply have standards.',
    note: 'Full sun · rich well-drained soil · prune after flowering',
  },
  {
    id: 'strawberry-mint',
    name: 'Strawberry Mint',
    image: '/garden/strawberry_mint.jpeg',
    desc: 'Rub a leaf and you will understand immediately why this plant earns its name. A low, creeping herb that fills the gaps between paving stones and rewards every curious passerby.',
    note: 'Part shade · moist soil · edible leaves',
  },
  {
    id: 'cape-succulent',
    name: 'Cape Succulent',
    image: '/garden/pot1.jpg',
    desc: 'Born from rocky outcrops and winter rainfall, these are plants that have learned to endure. Their geometry is quiet and perfect; their requirements, almost nothing. They ask only to be left alone.',
    note: 'Full sun · well-drained soil · drought-tolerant',
  },
]

// ── Editorial plant panel ─────────────────────────────────────────────────────
function PlantEditorialCard({ plant, reverse }) {
  const ref = useHarlequin(0.12)

  return (
    <div ref={ref} className={`garden-editorial${reverse ? ' garden-editorial--reverse' : ''}`}>
      <div className="garden-editorial-image">
        <img src={plant.image} alt={plant.name} loading="lazy" />
      </div>
      <div className="garden-editorial-text">
        <h3 className="garden-editorial-name">{plant.name}</h3>
        <p className="garden-editorial-desc">{plant.desc}</p>
        {plant.note && <p className="garden-editorial-note">{plant.note}</p>}
        <Link to="/shop" className="garden-editorial-link">find it in the shop →</Link>
      </div>
    </div>
  )
}

// ── Arch scene card — one storybook tie-in ────────────────────────────────────
function ArchSceneCard({ image, alt }) {
  const wrapRef = useRef(null)
  const imgRef  = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      if (!wrapRef.current || !imgRef.current) return
      const rect   = wrapRef.current.getBoundingClientRect()
      const vh     = window.innerHeight
      const offset = ((rect.top + rect.height / 2) - vh / 2) * 0.15
      imgRef.current.style.transform = `translateY(${offset}px) scale(1.2)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="arch-scene arch-scene--solo" ref={wrapRef}>
      <div className="arch-scene-frame">
        <img ref={imgRef} src={image} alt={alt} className="arch-scene-img" loading="lazy" />
      </div>
    </div>
  )
}

// ── Garden act with animated curtain birds ────────────────────────────────────
function GardenAct({ children, leftSrc, rightSrc, title, hoverLeft }) {
  const ref         = useRef(null)
  const leftRef     = useRef(null)
  const rightRef    = useRef(null)
  const leftImgRef  = useRef(null)
  const rightImgRef = useRef(null)
  const titleRef    = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect       = el.getBoundingClientRect()
      const vh         = window.innerHeight
      const earlyStart = vh * 0.6
      const progress   = Math.max(0, Math.min(1, (earlyStart - rect.top) / rect.height))

      const enterFraction = Math.max(0, Math.min(1, (vh - rect.top) / vh))
      if (titleRef.current) titleRef.current.style.opacity = `${Math.max(0, 1 - enterFraction * 2)}`

      const x      = progress * 100
      const lift   = (1 - Math.cos(progress * Math.PI / 2)) * 40
      const wobble = Math.sin(progress * Math.PI * 3) * 2.5
      const tilt   = progress * 5 + wobble
      if (leftRef.current)  leftRef.current.style.transform  = `translateX(-${x}%) translateY(-${lift}%)`
      if (rightRef.current) rightRef.current.style.transform = `translateX(${x}%) translateY(-${lift}%)`
      if (leftImgRef.current)  leftImgRef.current.style.transform  = `scale(0.4) rotate(${-tilt}deg)`
      if (rightImgRef.current) rightImgRef.current.style.transform = `scale(0.4) rotate(${tilt}deg)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={ref} className="garden-act">
      <div ref={leftRef} className="garden-curtain garden-curtain--left">
        {hoverLeft
          ? <div className="garden-bird-hover"><img ref={leftImgRef} src={leftSrc} alt="" aria-hidden="true" /></div>
          : <img ref={leftImgRef} src={leftSrc} alt="" aria-hidden="true" />
        }
      </div>
      <div ref={rightRef} className="garden-curtain garden-curtain--right">
        <img ref={rightImgRef} src={rightSrc} alt="" aria-hidden="true" />
      </div>
      {title && <div ref={titleRef} className="garden-act-title"><em>{title}</em></div>}
      <div className="garden-path garden-path--editorial">
        {children}
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function GardenPage() {
  return (
    <div className="garden-page">

      <div className="garden-sky-base" aria-hidden="true" />

      <div className="garden-hero">
        <h1 className="garden-hero-title">The Garden</h1>
        <p className="garden-hero-sub">
         Explore the garden, there are signposts along the path to guide you.
        </p>
      </div>

      <ArchSceneCard image="/garden/path.jpg" alt="A garden archway" />

      <GardenAct
        leftSrc="/garden/bird4left.png"
        rightSrc="/garden/bird2.png"
        title="In the Garden"
        hoverLeft
      >
        <PlantEditorialCard plant={PLANTS[0]} />
        <PlantEditorialCard plant={PLANTS[1]} reverse />
        <PlantEditorialCard plant={PLANTS[2]} />
      </GardenAct>



      <ArchSceneCard image="/garden/path.jpg" alt="A garden archway" />



      <GardenAct
        leftSrc="/garden/blue3.png"
        rightSrc="/garden/bluebutterfly.png"
        title="Further In"
      >
        <PlantEditorialCard plant={PLANTS[3]} reverse />
        <PlantEditorialCard plant={PLANTS[4]} />
        <PlantEditorialCard plant={PLANTS[5]} reverse />
        <PlantEditorialCard plant={PLANTS[6]} />
      </GardenAct>

    </div>
  )
}
