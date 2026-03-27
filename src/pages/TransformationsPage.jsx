import BeforeAfter from '../components/BeforeAfter'
import { usePageMeta } from '../usePageMeta'

export default function TransformationsPage() {
  usePageMeta(
    'Transformations | Wonder Lawn Cape Town',
    'Before and after garden transformations by Wonder Lawn — bespoke landscaping for Cape Town homes.'
  )

  return (
    <main className="transformations-page">

      <div className="section-header transformations-hero">
        <p className="section-eyebrow">Our Work</p>
        <h1 className="section-title">Garden <em>Transformations</em></h1>
        <p className="section-sub">
          Drag to see what becomes possible. Each garden begins as something ordinary
          and ends as somewhere you want to stay.
        </p>
      </div>

      <BeforeAfter />

    </main>
  )
}
