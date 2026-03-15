import Hero from '../components/Hero'
import TrustBar from '../components/TrustBar'
import Services from '../components/Services'
import QuoteBand from '../components/QuoteBand'
import Gallery from '../components/Gallery'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import PhotoSection from '../components/PhotoSection'
import Contact from '../components/Contact'
import { usePageMeta } from '../usePageMeta'

export default function HomePage() {
  usePageMeta(
    'Wonder Lawn — Bespoke Garden Design & Landscaping · Cape Town',
    'Wonder Lawn creates exceptional bespoke gardens for discerning Cape Town homes. Precision lawn care, landscape design, planting, hedge sculpture, irrigation and garden restoration across the Southern Suburbs.'
  )

  return (
    <main>
      <Hero />
      <TrustBar />
      <Services />
      <QuoteBand />
      <Gallery />
      <Process />
      <Testimonials />
      <PhotoSection />
      <Contact />
    </main>
  )
}
