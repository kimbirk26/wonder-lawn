import { useState } from "react";
import './wonder-lawn-v1.css';

// ── PALETTE — used for team card inline colours ───────────────────────────────
const C = {
  mint:        "#A8D8D4",   // soft teal-mint background
  mintLight:   "#C8EBE3",   // lightest mint
  mintDeep:    "#6BBFB8",   // deeper teal accent
  sage:        "#7AAE8E",   // sage green
  sageDark:    "#4A7A62",   // deep garden green
  sageLight:   "#B5D5C3",   // pale sage
  rose:        "#D4899A",   // dusty rose
  rosePale:    "#F2D0D8",   // blush
  roseDark:    "#B5637A",   // deep rose
  lavender:    "#B8A8C8",   // soft lavender
  cream:       "#FAF6F0",   // warm cream
  parchment:   "#EDE5D8",   // parchment
  dark:        "#2C3E35",   // deep garden dark
  darkMid:     "#3D5246",   // medium forest
  grey:        "#7A8C84",   // grey-green
  greyLight:   "#EEF2EE",   // very pale grey-green
  gold:        "#C9A96E",   // warm gold
  white:       "#FFFFFF",
};

const SERVICES = [
  {
    icon: "✦",
    name: "Lawn Artistry",
    tagline: "The Queen's croquet court, perfected",
    desc: "Precision mowing, edging and striping that turns your lawn into a living canvas. We don't just cut grass — we sculpt it.",
    price: "From R2 800",
    detail: "Weekly · Fortnightly · Monthly",
  },
  {
    icon: "❧",
    name: "Garden Design",
    tagline: "Curiouser and curiouser",
    desc: "Bespoke landscape design from concept to completion. Terraces, water features, cottage gardens — your wonder, made real.",
    price: "From R18 000",
    detail: "Full design package included",
  },
  {
    icon: "✿",
    name: "Planting & Borders",
    tagline: "Where the flowers have opinions",
    desc: "Seasonal planting schemes, perennial borders, and cutting gardens curated for year-round colour and drama.",
    price: "From R6 500",
    detail: "Plant sourcing & planting included",
  },
  {
    icon: "⟡",
    name: "Hedge Sculpture",
    tagline: "Topiaries that stay still",
    desc: "Formal topiary, cloud pruning, and architectural hedging. We shape your green walls with patience and precision.",
    price: "From R3 200",
    detail: "Quarterly maintenance plans available",
  },
  {
    icon: "⌘",
    name: "Irrigation & Water",
    tagline: "Drink me. Wisely",
    desc: "Smart irrigation systems designed for water efficiency. Drip lines, rain sensors, and automated scheduling.",
    price: "From R12 000",
    detail: "Installation + 1yr maintenance",
  },
  {
    icon: "✺",
    name: "Garden Restoration",
    tagline: "Through the looking glass — backwards",
    desc: "We untangle, revive and reimagine neglected gardens. From overgrown wilderness to curated calm.",
    price: "From R9 500",
    detail: "Assessment visit included",
  },
];

const TEAM = [
  {
    name: "Kim Birk",
    role: "Co-Founder",
    quote: "Every garden is a door to somewhere wonderful.",
    emoji: "🌿",
    initials: "AT",
    colour: C.sage,
  },
  {
    name: "Chester Wilde",
    role: "Senior Garden Designer",
    quote: "I plant things that make people stop and smile.",
    emoji: "🌸",
    initials: "CW",
    colour: C.rose,
  },
  {
    name: "Finn Carroll",
    role: "Irrigation Specialist",
    quote: "Water is the secret ingredient in every great garden.",
    emoji: "💧",
    initials: "FC",
    colour: C.mintDeep,
  },
  {
    name: "Rosa March",
    role: "Planting & Borders Lead",
    quote: "I know every flower by name, and they know me.",
    emoji: "🌺",
    initials: "RM",
    colour: C.roseDark,
  },
  {
    name: "Oliver Hare",
    role: "Topiary & Hedge Sculptor",
    quote: "A hedge is just a poem written in green.",
    emoji: "✂️",
    initials: "OH",
    colour: C.sageDark,
  },
  {
    name: "June Liddell",
    role: "Client Relations",
    quote: "Your garden story starts with a single conversation.",
    emoji: "☕",
    initials: "JL",
    colour: C.lavender,
  },
];

const TESTIMONIALS = [
  {
    text: "Wonder Lawn transformed our overgrown plot into something from a storybook. We genuinely didn't know our garden could look like this.",
    author: "Catherine Blythe",
    area: "Constantia, Cape Town",
    stars: 5,
  },
  {
    text: "Chester designed our entire back garden and the result is breathtaking — formal hedges, a rose walk, and a vegetable garden that looks like art.",
    author: "James & Priya Sinclair",
    area: "Bishopscourt",
    stars: 5,
  },
  {
    text: "The maintenance team is exceptional. Always on time, always thorough, always suggesting something clever. Our lawn has never looked better.",
    author: "Margaret du Toit",
    area: "Newlands",
    stars: 5,
  },
];

// ── COMPONENTS ──

function Nav({ scrollTo }) {
  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => scrollTo("hero")}>
        Wonder Lawn
        <span className="nav-logo-grin"> ꞉)</span>
      </div>
      <div className="nav-links">
        <button className="nav-link" onClick={() => scrollTo("services")}>Services</button>
        <button className="nav-link" onClick={() => scrollTo("team")}>Our Team</button>
        <button className="nav-link" onClick={() => scrollTo("testimonials")}>Stories</button>
        <button className="nav-link" onClick={() => scrollTo("contact")}>Contact</button>
        <button className="nav-cta" onClick={() => scrollTo("contact")}>Begin Your Garden</button>
      </div>
    </nav>
  );
}

function Hero({ scrollTo }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-pattern" />
      <div className="hero-inner">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-line" />
          Bespoke garden & landscaping · Cape Town
          <span className="hero-eyebrow-line" />
        </div>

        <h1 className="hero-title">
          Step into your<br />
          <em>own </em>
          <span className="hero-title-grin">wonder</span>
        </h1>

        <p className="hero-sub">
          "Would you tell me, please, which way I ought to go from here?"<br/>
          That depends on what kind of garden you want to end up in.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo("contact")}>
            Begin Your Garden
          </button>
          <button className="btn-outline" onClick={() => scrollTo("services")}>
            Explore Services
          </button>
        </div>
      </div>

      <div className="hero-scroll" onClick={() => scrollTo("trust")} role="button" aria-label="Scroll down">
        <span className="hero-scroll-line" aria-hidden="true" />
        scroll
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    "Established 2014",
    "150+ Curated Gardens",
    "Fully Insured & Licenced",
    "Cape Town & Peninsula",
    "No Garden Too Curious",
  ];
  return (
    <div className="trust-bar" id="trust">
      {items.map((item) => (
        <div className="trust-item" key={item}>
          <span className="trust-dot" aria-hidden="true" />
          {item}
        </div>
      ))}
    </div>
  );
}

function Services() {
  return (
    <section className="section services-bg" id="services">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-eyebrow">What we do</div>
          <h2 className="section-title">
            Gardens that make you <em>feel something</em>
          </h2>
          <p className="section-sub">
            Each service is designed for gardens — and clients — that deserve the extraordinary.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s) => (
            <div className="service-card" key={s.name}>
              <span className="service-icon" aria-hidden="true">{s.icon}</span>
              <div className="service-name">{s.name}</div>
              <div className="service-tagline">{s.tagline}</div>
              <p className="service-desc">{s.desc}</p>
              <div className="service-footer">
                <div className="service-price">{s.price}</div>
                <div className="service-detail">{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteBand() {
  return (
    <div className="quote-band">
      <p className="quote-band-text">
        "I knew who I was this morning, but I've changed a few times since then —
        and my garden changed with me. <em>That's the point.</em>"
      </p>
      <p className="quote-band-attr">— after Lewis Carroll, with a spade</p>
    </div>
  );
}

function Team() {
  return (
    <section className="section team-bg" id="team">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-eyebrow">The gardeners</div>
          <h2 className="section-title">
            Wonderfully <em>human</em> people
          </h2>
          <p className="section-sub">
            No call centres. No contractors you've never met. Just our small,
            dedicated team — who show up happy, and leave your garden happier.
          </p>
        </div>

        <div className="team-grid">
          {TEAM.map((member) => (
            <div className="team-card" key={member.name}>
              <div
                className="team-avatar"
                style={{ background: member.colour }}
              >
                {member.initials}
                <div
                  className="team-avatar-ring"
                  style={{ borderColor: member.colour }}
                />
              </div>
              <div className="team-name">{member.name}</div>
              <div className="team-role">{member.role}</div>
              <p className="team-quote">{member.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { num: "01", icon: "☕", title: "The Consultation", desc: "We meet in your garden, over tea if you like. We listen more than we talk." },
    { num: "02", icon: "✦", title: "The Vision", desc: "A bespoke plan that reflects your taste, your lifestyle, and your soil." },
    { num: "03", icon: "✿", title: "The Transformation", desc: "Our team arrives. Quietly, skilfully, cheerfully. The garden changes." },
    { num: "04", icon: "❧", title: "The Ongoing Story", desc: "We tend what we've built. Seasons change. Your garden keeps surprising you." },
  ];
  return (
    <section className="section process-bg" id="process">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-eyebrow">How it works</div>
          <h2 className="section-title">A <em>curious</em> process</h2>
          <p className="section-sub">Simple, transparent, and rather enjoyable.</p>
        </div>
        <div className="process-steps">
          {steps.map((step) => (
            <div className="process-step" key={step.num}>
              <div className="process-num">{step.num}</div>
              <div className="process-icon">{step.icon}</div>
              <div className="process-title">{step.title}</div>
              <p className="process-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section testi-bg" id="testimonials">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-eyebrow">Client stories</div>
          <h2 className="section-title">
            Gardens that <em>stayed with them</em>
          </h2>
        </div>
        <div className="testi-grid">
          {TESTIMONIALS.map((t) => (
            <div className="testi-card" key={t.author}>
              <span className="testi-glyph" aria-hidden="true">"</span>
              <p className="testi-text">{t.text}</p>
              <div className="testi-stars">{"★".repeat(t.stars)}</div>
              <div className="testi-author">{t.author}</div>
              <div className="testi-area">{t.area}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const u = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="section contact-bg" id="contact">
      <div className="section-inner">
        <div className="contact-grid">
          <div>
            <h2 className="contact-info-title">
              Let's make something<br /><em>wonderful</em>
            </h2>
            <p className="contact-info-sub">
              Every extraordinary garden begins with a single question. Tell us what you're
              dreaming of — we'll help you find the path through the looking glass.
            </p>

            {[
              { icon: "✉", label: "Email", value: "hello@wonderlawn.com" },
              { icon: "☎", label: "Phone", value: "+27 21 000 0000" },
              { icon: "⌂", label: "Studio", value: "Newlands, Cape Town" },
              { icon: "◷", label: "Hours", value: "Mon–Fri 8am–5pm · Sat 9am–1pm" },
            ].map((d) => (
              <div className="contact-detail" key={d.label}>
                <div className="contact-detail-icon">{d.icon}</div>
                <div className="contact-detail-text">
                  <strong>{d.label}</strong>
                  {d.value}
                </div>
              </div>
            ))}
          </div>

          <div>
            {sent ? (
              <div className="form-success">
                <div className="form-success-icon">✦</div>
                <div className="form-success-title">Wonderfully received.</div>
                <p className="form-success-sub">
                  We'll be in touch within one working day. Good things grow slowly.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input className="form-input" placeholder="Alice Thornton" value={form.name} onChange={(e) => u("name", e.target.value)} required />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" placeholder="alice@email.com" value={form.email} onChange={(e) => u("email", e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="form-input" placeholder="082 000 0000" value={form.phone} onChange={(e) => u("phone", e.target.value)} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">I'm interested in</label>
                  <select className="form-select" value={form.service} onChange={(e) => u("service", e.target.value)}>
                    <option value="">Select a service...</option>
                    {SERVICES.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                    <option value="full-design">Full garden design & build</option>
                    <option value="maintenance">Ongoing maintenance programme</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Tell us about your garden</label>
                  <textarea className="form-textarea" placeholder="A little about your space, your dreams, and perhaps what's currently growing (or not)..." value={form.message} onChange={(e) => u("message", e.target.value)} />
                </div>
                <button className="btn-primary" type="submit" style={{ marginTop: "0.5rem" }}>
                  Send My Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ scrollTo }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <span className="footer-logo">
            Wonder Lawn<span className="footer-logo-grin"> ꞉)</span>
          </span>
          <p className="footer-brand-text">
            Bespoke garden design and landscaping for discerning Cape Town homes.
            Every garden tells a story — we help you write yours.
          </p>
        </div>
        <div>
          <div className="footer-col-title">Services</div>
          {SERVICES.map((s) => (
            <button key={s.name} className="footer-link" onClick={() => scrollTo("services")}>{s.name}</button>
          ))}
        </div>
        <div>
          <div className="footer-col-title">Wonder Lawn</div>
          {["Our Team", "Client Stories", "Garden Journal", "Contact Us", "Privacy Policy"].map((l) => (
            <button key={l} className="footer-link">{l}</button>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Wonder Lawn. Cape Town, South Africa.</span>
        <span className="footer-bottom-quote">
          "Not all those who wander are lost — some are just planning a garden."
        </span>
      </div>
    </footer>
  );
}

// ── MAIN ──
export default function WonderLawn() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Nav scrollTo={scrollTo} />
      <Hero scrollTo={scrollTo} />
      <TrustBar />
      <Services />
      <QuoteBand />
      <Team />
      <Process />
      <Testimonials />
      <Contact />
      <Footer scrollTo={scrollTo} />
    </>
  );
}
