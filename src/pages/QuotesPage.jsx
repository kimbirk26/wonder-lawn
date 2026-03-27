import { usePageMeta } from '../usePageMeta'
import { SuitIcon } from '../components/SuitIcon'

const QUOTES = [
  {
    text: 'Curiouser and curiouser!',
    speaker: 'Alice',
    source: "Alice's Adventures in Wonderland",
  },
  {
    text: "We're all mad here.",
    speaker: 'The Cheshire Cat',
    source: "Alice's Adventures in Wonderland",
  },

  {
    text: "It's no use going back to yesterday, because I was a different person then.",
    speaker: 'Alice',
    source: "Alice's Adventures in Wonderland",
  },
  {
    text: "You're nothing but a pack of cards!",
    speaker: 'Alice',
    source: "Alice's Adventures in Wonderland",
  },

]

export default function QuotesPage() {
  usePageMeta(
    'Curious Quotes | Wonder Lawn Cape Town',
    "A curious collection of words from Lewis Carroll's Alice's Adventures in Wonderland."
  )

  return (
    <main className="quotes-page">

      <div className="quotes-hero">
        <div className="hero-eyebrow" style={{ justifyContent: 'center', marginBottom: '1.5rem' }}>
          <span className="hero-eyebrow-line" />
          Lewis Carroll · 1865
          <span className="hero-eyebrow-line" />
        </div>
        <h1 className="quotes-hero-title">A Curious<br /><em>Collection</em></h1>
        <p className="quotes-hero-sub">Words from Wonderland</p>
      </div>

      <div className="quotes-img-wrap">
        <img
          src="/teaparty.jpeg"
          alt="Tenniel illustration from Alice's Adventures in Wonderland"
          className="quotes-img"
          loading="eager"
        />
      </div>

      <div className="quotes-list">
        {QUOTES.slice(0, -1).map((q, i) => (
          <div key={i} className="quote-block">
            <SuitIcon suit="heart" size={13} className="quote-suit" />
            <blockquote className="quote-text">{q.text}</blockquote>
            <p className="quote-attribution">
              — {q.speaker} · <em>{q.source}</em>
            </p>
          </div>
        ))}
      </div>


      <div className="quotes-cards-wrap">
        <img
            src="/quotes/twins.jpeg"
            alt="Tweedledee and Tweedledum — Through the Looking-Glass"
            className="quotes-cards-img"
            loading="lazy"
        />
        <div className="quotes-cards-quote">
          <SuitIcon suit="heart" size={13} className="quote-suit" />
          <blockquote className="quote-text">Contrariwise, if it was so, it might be; and if it were so, it would be; but as it isn't, it ain't. That's logic.</blockquote>
          <p className="quote-attribution">— Tweedledee · <em>Through the Looking-Glass</em></p>
        </div>
      </div>


      <div className="quotes-cards-wrap">
        <img
          src="/cards.jpg"
          alt="A pack of cards — Alice's Adventures in Wonderland"
          className="quotes-cards-img"
          loading="lazy"
        />
        <div className="quotes-cards-quote">
          <SuitIcon suit="heart" size={13} className="quote-suit" />
          <blockquote className="quote-text">{QUOTES[QUOTES.length - 1].text}</blockquote>
          <p className="quote-attribution">
            — {QUOTES[QUOTES.length - 1].speaker} · <em>{QUOTES[QUOTES.length - 1].source}</em>
          </p>
        </div>
      </div>

    </main>
  )
}
