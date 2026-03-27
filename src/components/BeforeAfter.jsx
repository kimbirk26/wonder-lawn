import { useState, useRef, useCallback, useEffect } from 'react'
import { useHarlequin } from '../useHarlequin'

export default function BeforeAfter() {
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)
  const containerRef = useRef(null)
  const sectionRef = useHarlequin(0.1)

  const getPct = useCallback((clientX) => {
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    return Math.round((x / rect.width) * 100)
  }, [])

  useEffect(() => {
    if (!dragging) return
    const onMove = (e) => setPos(getPct(e.clientX))
    const onUp = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [dragging, getPct])

  return (
    <section ref={sectionRef} className="section before-after-section">
      <div className="section-inner">
        <div className="section-header">
          <p className="section-eyebrow">Transformations</p>
          <h2 className="section-title">Before &amp; <em>After</em></h2>
          <p className="section-sub">Drag to reveal the transformation.</p>
        </div>

        <div
          className="ba-slider"
          ref={containerRef}
          onMouseDown={(e) => { setDragging(true); setPos(getPct(e.clientX)) }}
          onTouchStart={(e) => setPos(getPct(e.touches[0].clientX))}
          onTouchMove={(e) => setPos(getPct(e.touches[0].clientX))}
        >
          <img src="/BeforeAndAfter/before.jpg" alt="Garden before transformation" className="ba-img" draggable={false} />
          <img
            src="/BeforeAndAfter/after.jpg"
            alt="Garden after transformation"
            className="ba-img ba-after"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            draggable={false}
          />

          <div className="ba-divider" style={{ left: `${pos}%` }}>
            <div className="ba-handle" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="18" height="18">
                <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" />
              </svg>
            </div>
          </div>

          <span className="ba-label ba-label--before">Before</span>
          <span className="ba-label ba-label--after">After</span>
        </div>
      </div>
    </section>
  )
}
