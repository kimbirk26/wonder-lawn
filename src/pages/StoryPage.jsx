import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { STORIES } from '../data'
import { usePageMeta } from '../usePageMeta'

const CATEGORY_COLORS = {
  'Garden Design': '#7AAE8E',
  'Craft':         '#D4899A',
  'Projects':      '#C9A96E',
  'Sustainability':'#6BBFB8',
  'Seasonal':      '#B5637A',
  'Process':       '#9B8DB8',
}

export default function StoryPage() {
  const { slug } = useParams()
  const story = STORIES.find(s => s.slug === slug)

  usePageMeta(
    story ? `${story.title} | Wonder Lawn` : 'Story | Wonder Lawn',
    story ? story.excerpt : 'Garden stories from the Wonder Lawn team.'
  )

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!story) return (
    <main className="story-not-found">
      <p>Story not found.</p>
      <Link to="/stories" className="btn-outline">← Back to Stories</Link>
    </main>
  )

  const [slideIdx, setSlideIdx] = useState(0)
  useEffect(() => {
    if (!story.gallery?.length) return
    const t = setInterval(() => setSlideIdx(i => (i + 1) % story.gallery.length), 4000)
    return () => clearInterval(t)
  }, [story.gallery])

  const paragraphs = story.content.split('\n\n').filter(p => p.trim())

  return (
    <main className="story-page">

      {/* Hero */}
      <div className="story-hero">
        <div className="hero-glow-1" style={{ opacity: 0.2 }} />
        <div className="hero-pattern" />
        <div className="story-hero-inner">
          <Link to="/stories" className="story-back-link">← Stories</Link>
          <div className="story-hero-card">
            <span className="story-cat" style={{ '--cat-color': CATEGORY_COLORS[story.category] }}>
              {story.category}
            </span>
            <h1 className="story-hero-title">{story.title}</h1>
            <div className="story-meta">
              <span className="story-author">by {story.author}</span>
              <span className="story-meta-dot">·</span>
              <span>{story.date}</span>
              <span className="story-meta-dot">·</span>
              <span>{story.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero image — slideshow if gallery, otherwise single image */}
      {story.gallery?.length > 0 ? (
        <div className="story-img-wrap story-img-slideshow">
          {story.gallery.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={story.galleryAlts?.[i] || story.title}
              className={`story-slide-img${i === slideIdx ? ' active' : ''}`}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>
      ) : story.image && story.imageStyle !== 'specimen' ? (
        <div className="story-img-wrap">
          <img src={story.image} alt={story.imageAlt || story.title} className="story-img" loading="lazy" />
        </div>
      ) : null}

      {/* Article body */}
      <div className="story-body">
        {story.image && story.imageStyle === 'specimen' && (
          <div className="story-specimen-wrap">
            <figure className="shop-specimen-card">
              <img src={story.image} alt={story.imageAlt || story.title} className="shop-specimen-img" loading="lazy" />
            </figure>
          </div>
        )}
        <div className="story-body-inner">
          <p className="story-lede">{story.excerpt}</p>
          <div className="story-divider-sm">
            <span />
            <span className="story-divider-glyph">❧</span>
            <span />
          </div>
          {paragraphs.map((p, i) => (
            <p key={i} className="story-paragraph">{p}</p>
          ))}
        </div>

        {story.gallery && story.gallery.length > 0 && (
          <div className="story-gallery">
            {story.gallery.map((src, i) => (
              <div key={i} className="story-gallery-item">
                <img src={src} alt={story.galleryAlts?.[i] || ''} aria-hidden={!story.galleryAlts?.[i]} className="story-gallery-img" loading="lazy" />
              </div>
            ))}
          </div>
        )}

        <div className="story-end">
          <span className="story-end-glyph">✦</span>
        </div>

        <div className="story-footer">
          <Link to="/stories" className="btn-outline">← Back to Stories</Link>
        </div>
      </div>

    </main>
  )
}
