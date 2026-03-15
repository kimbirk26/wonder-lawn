import { useEffect } from 'react'
import Team from '../components/Team'
import { usePageMeta } from '../usePageMeta'

export default function TeamPage() {
  usePageMeta(
    'The Gardeners | Wonder Lawn Cape Town',
    'Meet the Wonder Lawn team — the curious minds behind every garden we design, plant and tend.'
  )
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <main style={{ paddingTop: '72px' }}>
      <Team />
    </main>
  )
}
