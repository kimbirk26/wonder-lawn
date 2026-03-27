import { useEffect } from 'react'
import { STORIES } from '../data'
import { usePageMeta } from '../usePageMeta'
import { Link } from 'react-router-dom'
import { SuitIcon, CheshireIcon } from '../components/SuitIcon'

const CARD_TYPES = ['neutral', 'botanical', 'neutral', 'accent']

const CATEGORY_COLORS = {
  'Garden Design': '#7AAE8E',
  'Craft':         '#D4899A',
  'Projects':      '#C9A96E',
  'Sustainability':'#6BBFB8',
  'Seasonal':      '#B5637A',
  'Process':       '#9B8DB8',
}

export default function StoriesPage() {
  usePageMeta(
    'Stories & Garden Wisdom | Wonder Lawn Cape Town',
    'Design ideas from the Wonder Lawn team — written by the people who tend, design and dream in gardens every day.'
  )
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const featured = STORIES.find(s => s.featured) ?? STORIES[0]
  const rest = STORIES.filter(s => s !== featured)

  return (
    <main className="stories-page">

      {/* Page hero */}
      <div className="stories-hero">
        <div className="stories-hero-card">
          <CheshireIcon size={16} className="card-corner-tl" />
          <CheshireIcon size={16} className="card-corner-br" />
          <div className="stories-hero-card-body">
            <div className="hero-eyebrow" style={{ justifyContent: 'flex-start', marginBottom: '1.25rem' }}>
              <span className="hero-eyebrow-line" style={{ maxWidth: '2rem' }} />
              From the Garden
            </div>
            <h1 className="stories-hero-title">
              Observations and Ideas
            </h1>
            <p className="stories-hero-sub">
              Observations from the ground up — written by the people who tend, design, and dream in gardens every day.
            </p>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-inner">

          {/* Featured post */}
          {featured && (
            <article className={`story-featured${!featured.image ? ' story-featured--no-img' : ''}`}>
              {featured.image && (
                <div className="story-featured-img-wrap">
                  <img src={featured.image} alt={featured.imageAlt || featured.title} className="story-featured-img" loading="lazy" />
                </div>
              )}
              <div className="story-featured-body">
                <span className="story-cat" style={{ '--cat-color': CATEGORY_COLORS[featured.category] }}>
                  {featured.category}
                </span>
                <h2 className="story-featured-title">{featured.title}</h2>
                <p className="story-featured-excerpt">{featured.excerpt}</p>
                <div className="story-meta">
                  <span className="story-author">by {featured.author}</span>
                  <span className="story-meta-dot">·</span>
                  <span>{featured.date}</span>
                  <span className="story-meta-dot">·</span>
                  <span>{featured.readTime}</span>
                </div>
                <Link to={`/stories/${featured.slug}`} className="btn-outline story-read-btn">Read the story</Link>
              </div>
            </article>
          )}

          {/* Divider */}
          <div className="stories-divider">
            <span className="stories-divider-line" />
            <SuitIcon suit="heart" size={14} className="stories-divider-heart" />
            <span className="stories-divider-line" />
          </div>

          {/* Grid */}
          <div className="stories-grid">
            {rest.map((story, i) => (
              <Link to={`/stories/${story.slug}`} key={story.slug} className="story-card-link">
                <article className={`story-card story-card--${CARD_TYPES[i % 4]}`}>
                  <div className="story-card-bar" />
                  <span className="story-cat" style={{ '--cat-color': CATEGORY_COLORS[story.category] }}>
                    {story.category}
                  </span>
                  <h3 className="story-card-title">{story.title}</h3>
                  <p className="story-card-excerpt">{story.excerpt}</p>
                  <div className="story-meta">
                    <span className="story-author">by {story.author}</span>
                    <span className="story-meta-dot">·</span>
                    <span>{story.date}</span>
                    <span className="story-meta-dot">·</span>
                    <span>{story.readTime}</span>
                  </div>
                  <span className="story-link">Read more →</span>
                </article>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </main>
  )
}
