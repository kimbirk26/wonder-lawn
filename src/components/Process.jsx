import { PROCESS } from '../data'
import { TeacupIcon } from './SuitIcon'

export default function Process() {
  return (
    <section className="section section-alt section-diamond" id="process">
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
          {PROCESS.map((step) => (
            <div key={step.num} className="process-step">
              <div className="process-num">{step.num}</div>
              <div className="process-icon">
                {step.icon === 'teacup'
                  ? <TeacupIcon size={34} />
                  : step.icon
                }
              </div>
              <div className="process-title">{step.title}</div>
              <p className="process-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
