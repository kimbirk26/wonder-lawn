import { PROCESS } from '../data'
import { TeacupPackIcon } from './SuitIcon'
import { useEffect, useRef, useState } from 'react'
import { useHarlequin } from '../useHarlequin'

export default function Process() {
  const [activeStep, setActiveStep] = useState(0)
  const outerRef = useRef(null)
  const sectionRef = useHarlequin()

  useEffect(() => {
    const handleScroll = () => {
      if (!outerRef.current) return
      const rect = outerRef.current.getBoundingClientRect()
      const totalScroll = outerRef.current.offsetHeight - window.innerHeight
      if (totalScroll <= 0) return
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(1, scrolled / totalScroll)
      const newStep = Math.min(PROCESS.length - 1, Math.floor(progress * PROCESS.length))
      setActiveStep(newStep)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToStep = (i) => {
    if (!outerRef.current) return
    const totalScroll = outerRef.current.offsetHeight - window.innerHeight
    const outerTop = outerRef.current.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: outerTop + (i / PROCESS.length) * totalScroll, behavior: 'smooth' })
  }

  const step = PROCESS[activeStep]
  const stepIcon = step.icon === 'teacup'
    ? <TeacupPackIcon size={48} />
    : <span style={{ fontSize: '3rem' }}>{step.icon}</span>

  return (
    <div id="process">

      {/* Desktop: sticky scroll — hidden on mobile via CSS */}
      <div className="process-desktop" ref={outerRef}>
        <div className="process-sticky-panel">

          <p className="section-eyebrow" style={{ marginBottom: '2.5rem' }}>How It Works</p>

          <div className="process-sticky-body">
            <div className="process-sticky-left">
              <div className="process-sticky-num" key={`n${activeStep}`}>
                {step.num}
              </div>
              <h2 className="process-sticky-title" key={`t${activeStep}`}>
                {step.title}
              </h2>
            </div>

            <div className="process-sticky-right">
              <div className="process-sticky-icon" key={`i${activeStep}`}>
                {stepIcon}
              </div>
              <p className="process-sticky-desc" key={`d${activeStep}`}>
                {step.desc}
              </p>
            </div>
          </div>

          <div className="process-dots">
            {PROCESS.map((_, i) => (
              <button
                key={i}
                className={`process-dot${i === activeStep ? ' active' : ''}`}
                onClick={() => scrollToStep(i)}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Mobile: card grid — hidden on desktop via CSS */}
      <section ref={sectionRef} className="section section-alt section-diamond process-mobile">
        <div className="section-diamond-bg" />
        <div className="section-inner">
          <div className="section-header">
            <p className="section-eyebrow">How It Works</p>
            <h2 className="section-title">
              A journey, not just<br /><em>a job</em>
            </h2>
            <p className="section-sub">
              We work with you — not just for you. Every step is unhurried, thoughtful, and yours.
            </p>
          </div>

          <div className="process-grid">
            {PROCESS.map((s) => (
              <div key={s.num} className="process-step">
                <div className="process-num">{s.num}</div>
                <div className="process-icon">
                  {s.icon === 'teacup'
                    ? <TeacupPackIcon size={34} />
                    : s.icon
                  }
                </div>
                <div className="process-title">{s.title}</div>
                <p className="process-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
