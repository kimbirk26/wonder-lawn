import { useState } from "react";

// ── PALETTE 2: Cornflower Blue & Parchment (from colortones2) ─────────────
const C = {
  blue:        "#5B8DB8",   // cornflower blue
  blueLight:   "#8BB3D4",   // soft mid blue
  bluePale:    "#D6E8F5",   // palest blue tint
  blueDeep:    "#2C5282",   // deep navy
  blueMid:     "#3A6D9E",   // medium blue
  parchment:   "#F5E6C8",   // warm parchment
  parchmentDark: "#E8D5A8", // darker parchment
  ivory:       "#FAF8F2",   // near white ivory
  gold:        "#B8913A",   // warm aged gold
  goldLight:   "#D4AB5C",   // lighter gold
  cream:       "#FDFAF4",   // soft cream
  dark:        "#1A2744",   // deep navy dark
  darkMid:     "#243558",   // medium navy
  grey:        "#6B7A8D",   // blue-grey
  greyLight:   "#EDF2F7",   // very pale blue-grey
  rose:        "#C4849A",   // muted dusty rose (accent)
  white:       "#FFFFFF",
};

const SERVICES = [
  {
    icon: "✦",
    name: "Lawn Artistry",
    tagline: "Fit for the Queen of Hearts",
    desc: "Precision mowing, edging and striping that turns your lawn into a living canvas. We don't just cut grass — we sculpt it.",
    price: "From R2 800",
    detail: "Weekly · Fortnightly · Monthly",
  },
  {
    icon: "❧",
    name: "Garden Design",
    tagline: "Down the rabbit hole of possibility",
    desc: "Bespoke landscape design from concept to completion. Terraces, water features, cottage gardens — your wonder, made real.",
    price: "From R18 000",
    detail: "Full design package included",
  },
  {
    icon: "✿",
    name: "Planting & Borders",
    tagline: "Where flowers have names and opinions",
    desc: "Seasonal planting schemes, perennial borders, and cutting gardens curated for year-round colour and drama.",
    price: "From R6 500",
    detail: "Plant sourcing & planting included",
  },
  {
    icon: "⟡",
    name: "Hedge Sculpture",
    tagline: "Topiaries that stay perfectly still",
    desc: "Formal topiary, cloud pruning, and architectural hedging. We shape your green walls with patience and precision.",
    price: "From R3 200",
    detail: "Quarterly maintenance plans available",
  },
  {
    icon: "⌘",
    name: "Irrigation & Water",
    tagline: "Drink me, but wisely",
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
    name: "Alice Thornton",
    role: "Head Landscaper & Founder",
    quote: "Every garden is a door to somewhere wonderful.",
    initials: "AT",
    colour: C.blue,
  },
  {
    name: "Chester Wilde",
    role: "Senior Garden Designer",
    quote: "I plant things that make people stop and smile.",
    initials: "CW",
    colour: C.blueMid,
  },
  {
    name: "Finn Carroll",
    role: "Irrigation Specialist",
    quote: "Water is the secret ingredient in every great garden.",
    initials: "FC",
    colour: C.blueDeep,
  },
  {
    name: "Rosa March",
    role: "Planting & Borders Lead",
    quote: "I know every flower by name, and they know me.",
    initials: "RM",
    colour: C.rose,
  },
  {
    name: "Oliver Hare",
    role: "Topiary & Hedge Sculptor",
    quote: "A hedge is just a poem written in green.",
    initials: "OH",
    colour: C.gold,
  },
  {
    name: "June Liddell",
    role: "Client Relations",
    quote: "Your garden story starts with a single conversation.",
    initials: "JL",
    colour: C.blueLight,
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

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Inter:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Inter', sans-serif;
    background: ${C.ivory};
    color: ${C.dark};
    -webkit-font-smoothing: antialiased;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${C.parchment}; }
  ::-webkit-scrollbar-thumb { background: ${C.blue}; border-radius: 3px; }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(253,250,244,0.94);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid ${C.bluePale};
    padding: 0 2.5rem;
    height: 72px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem; font-weight: 500;
    color: ${C.blueDeep}; letter-spacing: 0.02em;
    cursor: pointer; display: flex; align-items: baseline; gap: 0.15rem;
  }
  .nav-logo-grin {
    color: ${C.gold}; font-size: 1.25rem;
    font-style: italic; font-weight: 700;
  }
  .nav-links { display: flex; align-items: center; gap: 2.25rem; }
  .nav-link {
    font-size: 0.8rem; font-weight: 400;
    letter-spacing: 0.09em; text-transform: uppercase;
    color: ${C.grey}; background: none; border: none;
    cursor: pointer; transition: color 0.2s;
    font-family: 'Inter', sans-serif;
  }
  .nav-link:hover { color: ${C.blueDeep}; }
  .nav-cta {
    background: transparent; color: ${C.blueDeep};
    border: 1.5px solid ${C.blue};
    padding: 0.55rem 1.4rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.78rem; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    cursor: pointer; transition: all 0.25s;
  }
  .nav-cta:hover {
    background: ${C.blueDeep}; color: ${C.parchment};
    border-color: ${C.blueDeep};
  }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    background:
      radial-gradient(ellipse at 20% 30%, ${C.bluePale}88 0%, transparent 50%),
      radial-gradient(ellipse at 85% 70%, ${C.parchment}99 0%, transparent 45%),
      radial-gradient(ellipse at 60% 10%, ${C.bluePale}44 0%, transparent 40%),
      ${C.ivory};
    display: flex; align-items: center; justify-content: center;
    text-align: center; padding: 8rem 2rem 6rem;
    position: relative; overflow: hidden;
  }
  .hero-diamond-pattern {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(45deg, ${C.bluePale}30 25%, transparent 25%),
      linear-gradient(-45deg, ${C.bluePale}30 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, ${C.bluePale}30 75%),
      linear-gradient(-45deg, transparent 75%, ${C.bluePale}30 75%);
    background-size: 60px 60px;
    background-position: 0 0, 0 30px, 30px -30px, -30px 0px;
    opacity: 0.4;
    pointer-events: none;
  }
  .hero-inner { position: relative; z-index: 1; max-width: 860px; margin: 0 auto; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.75rem;
    background: ${C.bluePale}; border: 1px solid ${C.blueLight}66;
    color: ${C.blueMid}; padding: 0.45rem 1.25rem;
    font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase;
    font-weight: 500; margin-bottom: 2.25rem;
  }
  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3rem, 7.5vw, 6rem);
    font-weight: 400; color: ${C.dark};
    line-height: 1.05; letter-spacing: -0.01em; margin-bottom: 0.35rem;
  }
  .hero-title-accent {
    font-style: italic; color: ${C.blue};
  }
  .hero-title-grin {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3rem, 7.5vw, 6rem);
    font-weight: 700; color: ${C.gold};
    font-style: italic;
  }
  .hero-divider {
    display: flex; align-items: center; justify-content: center;
    gap: 1rem; margin: 1.5rem auto;
  }
  .hero-divider-line { width: 60px; height: 1px; background: ${C.blueLight}; }
  .hero-divider-glyph {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem; color: ${C.gold}; font-style: italic;
  }
  .hero-sub {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.05rem, 2.2vw, 1.35rem);
    font-weight: 400; font-style: italic;
    color: ${C.grey}; max-width: 580px; margin: 0 auto 3rem;
    line-height: 1.7;
  }
  
  
  .hero-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  .btn-primary {
    background: ${C.blueDeep}; color: ${C.parchment};
    border: none; padding: 1rem 2.75rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem; font-weight: 500;
    letter-spacing: 0.06em;
    cursor: pointer; transition: all 0.25s;
     text-transform: none;   /* important */
  }
  .btn-primary:hover { background: ${C.blueMid}; transform: translateY(-2px); box-shadow: 0 10px 28px ${C.blueDeep}30; }
  .btn-outline {
    background: transparent; color: ${C.blueDeep};
    border: 1.5px solid ${C.blue};
    padding: 1rem 2.75rem;
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase;
    cursor: pointer; transition: all 0.25s;
  }
  .btn-outline:hover { background: ${C.blueDeep}; color: ${C.parchment}; border-color: ${C.blueDeep}; }
  .hero-scroll {
    position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    color: ${C.grey}; font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase;
    animation: float 3s ease-in-out infinite; cursor: pointer;
  }
  .hero-scroll-line { width: 1px; height: 36px; background: linear-gradient(${C.gold}, transparent); }
  @keyframes float {
    0%,100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(7px); }
  }

  /* ── TRUST BAR ── */
  .trust-bar {
    background: ${C.blueDeep};
    padding: 1.4rem 2rem;
    display: flex; justify-content: center; gap: 4rem; flex-wrap: wrap;
  }
  .trust-item {
    display: flex; align-items: center; gap: 0.6rem;
    color: ${C.bluePale}; font-size: 0.8rem;
    letter-spacing: 0.06em; font-weight: 400;
  }
  .trust-dot { width: 4px; height: 4px; border-radius: 50%; background: ${C.goldLight}; flex-shrink: 0; }

  /* ── SECTION ── */
  .section { padding: 7rem 2rem; }
  .section-inner { max-width: 1180px; margin: 0 auto; }
  .section-header { text-align: center; margin-bottom: 5rem; }
  .section-eyebrow {
    font-size: 0.7rem; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: ${C.gold}; margin-bottom: 1.2rem;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5vw, 3.6rem);
    font-weight: 400; color: ${C.dark}; line-height: 1.1;
  }
  .section-title em { font-style: italic; color: ${C.blue}; }
  .section-sub {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem; font-style: italic;
    color: ${C.grey}; margin-top: 1rem; line-height: 1.65;
  }

  /* ── SERVICES ── */
  .services-bg { background: ${C.ivory}; }
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
    gap: 2px;
    background: ${C.bluePale};
  }
  .service-card {
    background: ${C.white};
    padding: 2.75rem 2.5rem;
    transition: all 0.3s;
    position: relative;
  }
  .service-card-accent {
    position: absolute; top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${C.blue}, ${C.gold});
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s ease;
  }
  .service-card:hover .service-card-accent { transform: scaleX(1); }
  .service-card:hover { background: ${C.ivory}; }
  .service-icon {
    font-family: 'Playfair Display', serif;
    font-size: 1.35rem; color: ${C.gold};
    margin-bottom: 1.25rem; display: block;
  }
  .service-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem; font-weight: 500;
    color: ${C.dark}; margin-bottom: 0.3rem; line-height: 1.2;
  }
  .service-tagline {
    font-family: 'Playfair Display', serif;
    font-size: 0.95rem; font-style: italic;
    color: ${C.blueLight}; margin-bottom: 1rem;
  }
  .service-desc {
    font-size: 0.88rem; line-height: 1.75;
    color: ${C.grey}; margin-bottom: 1.75rem; font-weight: 300;
  }
  .service-footer {
    display: flex; align-items: flex-end; justify-content: space-between;
    border-top: 1px solid ${C.greyLight}; padding-top: 1.25rem; gap: 1rem;
  }
  .service-price {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem; font-weight: 500; color: ${C.blueDeep};
  }
  .service-detail { font-size: 0.73rem; color: ${C.grey}; letter-spacing: 0.05em; text-align: right; line-height: 1.4; }

  /* ── QUOTE BAND ── */
  .quote-band {
    background: ${C.parchment};
    border-top: 1px solid ${C.parchmentDark};
    border-bottom: 1px solid ${C.parchmentDark};
    padding: 6rem 2rem;
    text-align: center; position: relative; overflow: hidden;
  }
  .quote-band-deco {
    position: absolute;
    font-family: 'Playfair Display', serif;
    font-size: 20rem; font-weight: 700; font-style: italic;
    color: ${C.blueLight}08; line-height: 1;
    top: -3rem; left: 50%; transform: translateX(-50%);
    pointer-events: none; white-space: nowrap;
  }
  .quote-band-text {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.5rem, 3.5vw, 2.5rem);
    font-weight: 400; font-style: italic;
    color: ${C.dark}; max-width: 760px; margin: 0 auto;
    line-height: 1.45; position: relative; z-index: 1;
  }
  .quote-band-text em { color: ${C.blue}; font-style: normal; font-weight: 500; }
  .quote-band-attr {
    font-size: 0.76rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: ${C.grey}; margin-top: 2rem;
  }
  .quote-band-rule {
    width: 40px; height: 1px; background: ${C.gold};
    margin: 1.5rem auto 0;
  }

  /* ── TEAM ── */
  .team-bg { background: ${C.bluePale}44; }
  .team-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
    gap: 1.75rem;
  }
  .team-card {
    background: ${C.white};
    border: 1px solid ${C.bluePale};
    padding: 2.5rem 2rem; text-align: center;
    transition: all 0.3s; position: relative; overflow: hidden;
  }
  .team-card::after {
    content: '';
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${C.blue}00, ${C.blue}, ${C.blue}00);
    transform: scaleX(0); transition: transform 0.4s;
  }
  .team-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px ${C.blueDeep}10; }
  .team-card:hover::after { transform: scaleX(1); }
  .team-avatar {
    width: 82px; height: 82px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 1.55rem; font-weight: 500; color: ${C.white};
    margin: 0 auto 1.5rem;
    box-shadow: 0 6px 20px rgba(0,0,0,0.12);
    position: relative;
  }
  .team-avatar-dot {
    position: absolute; bottom: 4px; right: 4px;
    width: 12px; height: 12px; border-radius: 50%;
    background: ${C.goldLight}; border: 2px solid ${C.white};
  }
  .team-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem; font-weight: 500; color: ${C.dark}; margin-bottom: 0.2rem;
  }
  .team-role {
    font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: ${C.blueLight}; margin-bottom: 1.25rem;
  }
  .team-quote {
    font-family: 'Playfair Display', serif;
    font-size: 0.97rem; font-style: italic;
    color: ${C.grey}; line-height: 1.6;
  }
  .team-quote::before { content: '"'; color: ${C.gold}; }
  .team-quote::after  { content: '"'; color: ${C.gold}; }

  /* ── PROCESS ── */
  .process-bg { background: ${C.ivory}; }
  .process-steps {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 3rem;
  }
  .process-step { text-align: center; padding: 2rem 1.5rem; }
  .process-num {
    font-family: 'Playfair Display', serif;
    font-size: 4rem; font-weight: 700; font-style: italic;
    color: ${C.bluePale}; line-height: 1; margin-bottom: 0.75rem;
  }
  .process-icon { font-size: 2rem; margin-bottom: 0.75rem; }
  .process-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem; font-weight: 500; color: ${C.dark}; margin-bottom: 0.6rem;
  }
  .process-desc { font-size: 0.87rem; color: ${C.grey}; line-height: 1.7; font-weight: 300; }

  /* ── TESTIMONIALS ── */
  .testi-bg { background: ${C.parchment}22; }
  .testi-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  .testi-card {
    border: 1px solid ${C.bluePale};
    background: ${C.white};
    padding: 2.5rem; position: relative;
    transition: box-shadow 0.3s;
  }
  .testi-card:hover { box-shadow: 0 8px 32px ${C.blueDeep}08; }
  .testi-top {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 1.25rem;
  }
  .testi-glyph {
    font-family: 'Playfair Display', serif;
    font-size: 4rem; font-weight: 700; font-style: italic;
    color: ${C.bluePale}; line-height: 0.8;
  }
  .testi-stars { color: ${C.gold}; font-size: 0.9rem; letter-spacing: 0.08em; }
  .testi-text {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem; font-weight: 400; font-style: italic;
    color: ${C.dark}; line-height: 1.65; margin-bottom: 1.75rem;
  }
  .testi-divider { width: 32px; height: 1px; background: ${C.gold}; margin-bottom: 1rem; }
  .testi-author { font-size: 0.88rem; font-weight: 500; color: ${C.blueDeep}; }
  .testi-area { font-size: 0.78rem; color: ${C.grey}; margin-top: 0.25rem; }

  /* ── CONTACT ── */
  .contact-bg { background: ${C.ivory}; }
  .contact-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: start;
  }
  .contact-info-badge {
    display: inline-block;
    background: ${C.bluePale}; color: ${C.blueDeep};
    font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
    padding: 0.4rem 1rem; margin-bottom: 1.5rem;
  }
  .contact-info-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.4rem; font-weight: 400; color: ${C.dark};
    line-height: 1.2; margin-bottom: 1.5rem;
  }
  .contact-info-title em { font-style: italic; color: ${C.blue}; }
  .contact-info-sub {
    font-size: 0.92rem; line-height: 1.8;
    color: ${C.grey}; margin-bottom: 2.5rem; font-weight: 300;
  }
  .contact-detail {
    display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.25rem;
  }
  .contact-detail-icon {
    width: 36px; height: 36px;
    border: 1px solid ${C.bluePale};
    display: flex; align-items: center; justify-content: center;
    font-size: 0.85rem; flex-shrink: 0; color: ${C.blue};
  }
  .contact-detail-text { font-size: 0.88rem; color: ${C.grey}; line-height: 1.5; }
  .contact-detail-text strong { color: ${C.dark}; font-weight: 500; display: block; }
  .contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
  .form-label {
    font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase;
    color: ${C.grey}; font-weight: 500;
  }
  .form-input {
    border: 1px solid ${C.bluePale};
    background: ${C.white}; color: ${C.dark};
    padding: 0.85rem 1rem; font-family: 'Inter', sans-serif;
    font-size: 0.9rem; outline: none; transition: border-color 0.2s;
  }
  .form-input:focus { border-color: ${C.blue}; }
  .form-select {
    border: 1px solid ${C.bluePale};
    background: ${C.white}; color: ${C.dark};
    padding: 0.85rem 1rem; font-family: 'Inter', sans-serif;
    font-size: 0.9rem; outline: none; transition: border-color 0.2s;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B7A8D' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 1rem center;
  }
  .form-textarea {
    border: 1px solid ${C.bluePale};
    background: ${C.white}; color: ${C.dark};
    padding: 0.85rem 1rem; font-family: 'Inter', sans-serif;
    font-size: 0.9rem; outline: none; transition: border-color 0.2s;
    resize: vertical; min-height: 120px; line-height: 1.65;
  }
  .form-textarea:focus { border-color: ${C.blue}; }

  /* ── FOOTER ── */
  .footer { background: ${C.dark}; padding: 5rem 2rem 2.5rem; }
  .footer-inner {
    max-width: 1180px; margin: 0 auto;
    display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 4rem;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    padding-bottom: 3.5rem; margin-bottom: 2.5rem;
  }
  .footer-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.55rem; font-weight: 500;
    color: ${C.bluePale}; margin-bottom: 1.25rem; display: block;
  }
  .footer-logo-grin { color: ${C.goldLight}; font-style: italic; font-weight: 700; }
  .footer-brand-text {
    font-size: 0.86rem; color: rgba(255,255,255,0.35);
    line-height: 1.8; font-weight: 300; max-width: 280px;
  }
  .footer-col-title {
    font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(255,255,255,0.25); margin-bottom: 1.5rem; font-weight: 500;
  }
  .footer-link {
    display: block; font-size: 0.86rem;
    color: rgba(255,255,255,0.45); margin-bottom: 0.75rem;
    cursor: pointer; transition: color 0.2s;
    background: none; border: none; text-align: left;
    font-family: 'Inter', sans-serif;
  }
  .footer-link:hover { color: ${C.bluePale}; }
  .footer-bottom {
    max-width: 1180px; margin: 0 auto;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 0.76rem; color: rgba(255,255,255,0.2);
  }
  .footer-bottom-quote {
    font-family: 'Playfair Display', serif;
    font-style: italic; font-size: 0.88rem; color: rgba(255,255,255,0.18);
  }

  /* ── FORM SUCCESS ── */
  .form-success {
    text-align: center; padding: 3rem 2rem;
    border: 1px solid ${C.bluePale}; background: ${C.bluePale}33;
  }
  .form-success-icon { font-size: 2.5rem; margin-bottom: 1rem; }
  .form-success-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem; font-weight: 400; font-style: italic;
    color: ${C.blueDeep}; margin-bottom: 0.5rem;
  }
  .form-success-sub { font-size: 0.88rem; color: ${C.grey}; }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .nav { padding: 0 1.25rem; }
    .nav-links { display: none; }
    .hero { padding: 6rem 1.5rem 4rem; }
    .trust-bar { gap: 1.5rem; }
    .section { padding: 5rem 1.25rem; }
    .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
    .footer-inner { grid-template-columns: 1fr; gap: 2.5rem; }
    .footer-bottom { flex-direction: column; gap: 0.75rem; text-align: center; }
    .process-steps { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 480px) {
    .process-steps { grid-template-columns: 1fr; }
  }
`;

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
      <div className="hero-diamond-pattern" />
      <div className="hero-inner">
        <div className="hero-badge">
          ✦ Bespoke garden & landscaping · Cape Town
        </div>

        <h1 className="hero-title">
          Your garden's<br />
          <span className="hero-title-accent">curiouser</span> chapter
        </h1>

        <div className="hero-divider">
          <span className="hero-divider-line" />
          <span className="hero-divider-glyph">꞉)</span>
          <span className="hero-divider-line" />
        </div>

        <p className="hero-sub">
          "She generally gave herself very good advice — and occasionally followed it."
          <br />We help you follow through. In the garden.
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

      <div className="hero-scroll" onClick={() => scrollTo("trust")}>
        <span className="hero-scroll-line" />
        discover
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    "Est. 2014",
    "150+ Curated Gardens",
    "Fully Insured & Licenced",
    "Cape Town & Peninsula",
    "No Garden Too Curious",
  ];
  return (
    <div className="trust-bar" id="trust">
      {items.map((item) => (
        <div className="trust-item" key={item}>
          <span className="trust-dot" />
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
            Gardens designed to <em>astonish</em>
          </h2>
          <p className="section-sub">
            Each service is crafted for properties — and owners — who want more than ordinary.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s) => (
            <div className="service-card" key={s.name}>
              <div className="service-card-accent" />
              <span className="service-icon">{s.icon}</span>
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
      <div className="quote-band-deco">"</div>
      <p className="quote-band-text">
        "It would be so nice if something made sense for a change."
        <br />
        We make gardens that <em>make sense</em> — beautifully.
      </p>
      <div className="quote-band-rule" />
      <p className="quote-band-attr">— after Lewis Carroll, with a trowel</p>
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
            People who genuinely <em>love</em> this
          </h2>
          <p className="section-sub">
            A small, expert team. Every person you meet has been with us for years —
            because good gardens take time, and so does trust.
          </p>
        </div>

        <div className="team-grid">
          {TEAM.map((member) => (
            <div className="team-card" key={member.name}>
              <div className="team-avatar" style={{ background: member.colour }}>
                {member.initials}
                <div className="team-avatar-dot" />
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
    { num: "01", icon: "☕", title: "The Consultation", desc: "We visit your garden. We listen. We ask the right questions." },
    { num: "02", icon: "✦", title: "The Vision", desc: "A bespoke plan — drawn around your taste, your property, and your soil." },
    { num: "03", icon: "✿", title: "The Work", desc: "Our team arrives, quietly and expertly. The garden begins its transformation." },
    { num: "04", icon: "❧", title: "The Ongoing Care", desc: "We maintain what we've made. Seasons change. Your garden keeps surprising you." },
  ];
  return (
    <section className="section process-bg" id="process">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-eyebrow">How it works</div>
          <h2 className="section-title">Four steps to <em>extraordinary</em></h2>
          <p className="section-sub">Simple, transparent, and rather pleasant.</p>
        </div>
        <div className="process-steps">
          {steps.map((s) => (
            <div className="process-step" key={s.num}>
              <div className="process-num">{s.num}</div>
              <div className="process-icon">{s.icon}</div>
              <div className="process-title">{s.title}</div>
              <p className="process-desc">{s.desc}</p>
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
            What they <em>said</em> afterwards
          </h2>
        </div>
        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="testi-card" key={i}>
              <div className="testi-top">
                <span className="testi-glyph">"</span>
                <div className="testi-stars">{"★".repeat(t.stars)}</div>
              </div>
              <p className="testi-text">{t.text}</p>
              <div className="testi-divider" />
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
            <span className="contact-info-badge">Get in touch</span>
            <h2 className="contact-info-title">
              Let's design something<br /><em>worth talking about</em>
            </h2>
            <p className="contact-info-sub">
              Every wonderful garden begins with a conversation. Tell us what you're imagining —
              we'll help you find the way through.
            </p>
            {[
              { icon: "✉", label: "Email", value: "kimbirkdev@gmail.com" },
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
                  <input className="form-input" placeholder="Your full name" value={form.name} onChange={(e) => u("name", e.target.value)} required />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => u("email", e.target.value)} required />
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
                  <textarea className="form-textarea" placeholder="A little about your space, what you love, what needs work, and what you're dreaming of..." value={form.message} onChange={(e) => u("message", e.target.value)} />
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
            We turn gardens into stories worth telling.
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
          "Curiouser and curiouser — and all the better for it."
        </span>
      </div>
    </footer>
  );
}

// ── MAIN ──
export default function WonderLawnV2() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{CSS}</style>
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
