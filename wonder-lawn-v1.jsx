import { useState } from "react";

// ── PALETTE 1: Mint & Rose Garden (from colortones1) ──────────────────────
const C = {
  mint:        "#A8D8D4",   // soft teal-mint background
  mintLight:   "#C8EBER",   // lightest mint
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
    name: "Kim Yu",
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

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --mint:       ${C.mint};
    --mintDeep:   ${C.mintDeep};
    --sage:       ${C.sage};
    --sageDark:   ${C.sageDark};
    --sageLight:  ${C.sageLight};
    --rose:       ${C.rose};
    --rosePale:   ${C.rosePale};
    --lavender:   ${C.lavender};
    --cream:      ${C.cream};
    --parchment:  ${C.parchment};
    --dark:       ${C.dark};
    --darkMid:    ${C.darkMid};
    --grey:       ${C.grey};
    --gold:       ${C.gold};
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Jost', sans-serif;
    background: ${C.cream};
    color: ${C.dark};
    -webkit-font-smoothing: antialiased;
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${C.parchment}; }
  ::-webkit-scrollbar-thumb { background: ${C.mintDeep}; border-radius: 3px; }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(250,246,240,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid ${C.sageLight};
    padding: 0 2.5rem;
    height: 72px;
    display: flex; align-items: center; justify-content: space-between;
    transition: box-shadow 0.3s;
  }
  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.45rem;
    font-weight: 600;
    color: ${C.sageDark};
    letter-spacing: 0.03em;
    cursor: pointer;
    display: flex; align-items: center; gap: 0.5rem;
    text-decoration: none;
  }
  .nav-logo-grin {
    color: ${C.rose};
    font-size: 1.1rem;
    letter-spacing: -0.05em;
    font-style: italic;
  }
  .nav-links {
    display: flex; align-items: center; gap: 2rem;
  }
  .nav-link {
    font-size: 0.82rem; font-weight: 500;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: ${C.grey};
    background: none; border: none; cursor: pointer;
    transition: color 0.2s; font-family: 'Jost', sans-serif;
    padding: 0.25rem 0;
    position: relative;
  }
  .nav-link::after {
    content: '';
    position: absolute; bottom: -2px; left: 0; right: 0;
    height: 1px; background: ${C.rose};
    transform: scaleX(0); transition: transform 0.2s;
  }
  .nav-link:hover { color: ${C.sageDark}; }
  .nav-link:hover::after { transform: scaleX(1); }
  .nav-cta {
    background: ${C.sageDark}; color: ${C.cream};
    border: none; padding: 0.6rem 1.5rem;
    font-family: 'Jost', sans-serif;
    font-size: 0.8rem; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    cursor: pointer; transition: all 0.25s;
    border-radius: 2px;
  }
  .nav-cta:hover { background: ${C.sage}; transform: translateY(-1px); }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    background:
      radial-gradient(ellipse at 80% 20%, ${C.rosePale}55 0%, transparent 50%),
      radial-gradient(ellipse at 10% 80%, ${C.sageLight}66 0%, transparent 45%),
      radial-gradient(ellipse at 50% 50%, ${C.mint}33 0%, transparent 60%),
      ${C.cream};
    display: flex; align-items: center; justify-content: center;
    text-align: center;
    padding: 8rem 2rem 6rem;
    position: relative; overflow: hidden;
  }
  .hero-pattern {
    position: absolute; inset: 0;
    background-image:
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 40px,
        ${C.sageLight}18 40px,
        ${C.sageLight}18 41px
      ),
      repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 40px,
        ${C.sageLight}18 40px,
        ${C.sageLight}18 41px
      );
    pointer-events: none;
  }
  .hero-inner { position: relative; z-index: 1; max-width: 820px; margin: 0 auto; }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 0.75rem;
    font-size: 0.75rem; font-weight: 500;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: ${C.grey};
    margin-bottom: 2rem;
  }
  .hero-eyebrow-line {
    width: 32px; height: 1px; background: ${C.rose};
  }
  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3.2rem, 8vw, 6.5rem);
    font-weight: 300;
    color: ${C.dark};
    line-height: 1.0;
    margin-bottom: 0.5rem;
    letter-spacing: -0.01em;
  }
  .hero-title em {
    font-style: italic;
    color: ${C.sageDark};
  }
  .hero-title-grin {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3.2rem, 8vw, 6.5rem);
    font-weight: 600;
    color: ${C.rose};
    font-style: italic;
    letter-spacing: -0.02em;
  }
  .hero-sub {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.15rem, 2.5vw, 1.45rem);
    font-weight: 300;
    font-style: italic;
    color: ${C.grey};
    margin: 1.75rem auto 3rem;
    max-width: 540px;
    line-height: 1.65;
  }
  .hero-actions {
    display: flex; gap: 1.25rem; justify-content: center; flex-wrap: wrap;
  }
  .btn-primary {
    background: ${C.sageDark}; color: ${C.cream};
    border: none; padding: 1rem 2.5rem;
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase;
    cursor: pointer; transition: all 0.25s;
    border-radius: 2px;
  }
  .btn-primary:hover { background: ${C.sage}; transform: translateY(-2px); box-shadow: 0 8px 24px ${C.sageDark}30; }
  .btn-outline {
    background: transparent; color: ${C.sageDark};
    border: 1.5px solid ${C.sageDark};
    padding: 1rem 2.5rem;
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem; font-weight: 500;
    letter-spacing: 0.14em; text-transform: uppercase;
    cursor: pointer; transition: all 0.25s;
    border-radius: 2px;
  }
  .btn-outline:hover { background: ${C.sageDark}; color: ${C.cream}; transform: translateY(-2px); }
  .hero-scroll {
    position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    color: ${C.grey}; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase;
    animation: float 3s ease-in-out infinite;
    cursor: pointer;
  }
  .hero-scroll-line {
    width: 1px; height: 40px; background: linear-gradient(${C.rose}, transparent);
  }
  @keyframes float {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(6px); }
  }

  /* ── TRUST BAR ── */
  .trust-bar {
    background: ${C.sageDark};
    padding: 1.4rem 2rem;
    display: flex; justify-content: center; gap: 4rem; flex-wrap: wrap;
  }
  .trust-item {
    display: flex; align-items: center; gap: 0.65rem;
    color: ${C.sageLight}; font-size: 0.82rem;
    font-weight: 400; letter-spacing: 0.06em;
  }
  .trust-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: ${C.rose}; flex-shrink: 0;
  }

  /* ── SECTION BASE ── */
  .section { padding: 7rem 2rem; }
  .section-inner { max-width: 1160px; margin: 0 auto; }
  .section-header { text-align: center; margin-bottom: 5rem; }
  .section-eyebrow {
    font-size: 0.72rem; font-weight: 500;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: ${C.rose}; margin-bottom: 1rem;
    display: flex; align-items: center; justify-content: center; gap: 1rem;
  }
  .section-eyebrow::before, .section-eyebrow::after {
    content: ''; display: block; width: 28px; height: 1px; background: ${C.rose};
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    font-weight: 300; color: ${C.dark};
    line-height: 1.1; letter-spacing: -0.01em;
  }
  .section-title em { font-style: italic; color: ${C.sageDark}; }
  .section-sub {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem; font-style: italic; font-weight: 300;
    color: ${C.grey}; margin-top: 1rem; line-height: 1.6;
  }

  /* ── SERVICES ── */
  .services-bg {
    background: ${C.cream};
  }
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5px;
    background: ${C.sageLight}55;
    border: 1.5px solid ${C.sageLight}55;
  }
  .service-card {
    background: ${C.white};
    padding: 2.75rem 2.5rem;
    transition: all 0.3s;
    cursor: default;
    position: relative; overflow: hidden;
  }
  .service-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 3px; height: 0;
    background: linear-gradient(${C.rose}, ${C.mintDeep});
    transition: height 0.4s ease;
  }
  .service-card:hover { background: ${C.cream}; }
  .service-card:hover::before { height: 100%; }
  .service-icon {
    font-size: 1.4rem; color: ${C.gold};
    margin-bottom: 1.25rem; display: block;
    font-family: 'Cormorant Garamond', serif;
  }
  .service-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.55rem; font-weight: 600;
    color: ${C.dark}; margin-bottom: 0.3rem; line-height: 1.2;
  }
  .service-tagline {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.95rem; font-style: italic;
    color: ${C.rose}; margin-bottom: 1rem;
  }
  .service-desc {
    font-size: 0.9rem; line-height: 1.7;
    color: ${C.grey}; margin-bottom: 1.75rem; font-weight: 300;
  }
  .service-footer {
    display: flex; align-items: flex-end; justify-content: space-between;
    border-top: 1px solid ${C.greyLight}; padding-top: 1.25rem;
    gap: 1rem;
  }
  .service-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem; font-weight: 600; color: ${C.sageDark};
  }
  .service-detail {
    font-size: 0.74rem; color: ${C.grey};
    letter-spacing: 0.05em; text-align: right; line-height: 1.4;
  }

  /* ── QUOTE BAND ── */
  .quote-band {
    background: linear-gradient(135deg, ${C.sageDark} 0%, ${C.darkMid} 100%);
    padding: 6rem 2rem;
    text-align: center; position: relative; overflow: hidden;
  }
  .quote-band::before {
    content: '❧';
    position: absolute; top: -1rem; left: 50%; transform: translateX(-50%);
    font-size: 8rem; color: ${C.sageLight}10;
    font-family: 'Cormorant Garamond', serif;
    pointer-events: none;
  }
  .quote-band-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.6rem, 4vw, 2.8rem);
    font-weight: 300; font-style: italic;
    color: ${C.cream}; max-width: 780px; margin: 0 auto;
    line-height: 1.4; position: relative; z-index: 1;
  }
  .quote-band-text em { color: ${C.rose}; font-style: normal; }
  .quote-band-attr {
    font-size: 0.78rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: ${C.sageLight}80; margin-top: 1.75rem;
  }

  /* ── TEAM ── */
  .team-bg { background: ${C.parchment}; }
  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
  }
  .team-card {
    background: ${C.white};
    border: 1px solid ${C.sageLight}66;
    border-radius: 2px;
    padding: 2.5rem 2rem;
    text-align: center;
    transition: all 0.3s;
    position: relative; overflow: hidden;
  }
  .team-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px ${C.sageDark}12;
    border-color: ${C.sageLight};
  }
  .team-avatar {
    width: 80px; height: 80px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem; font-weight: 600; color: ${C.white};
    margin: 0 auto 1.5rem;
    position: relative;
  }
  .team-avatar-ring {
    position: absolute; inset: -4px; border-radius: 50%;
    border: 1px solid; opacity: 0.3;
  }
  .team-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem; font-weight: 600; color: ${C.dark};
    margin-bottom: 0.2rem;
  }
  .team-role {
    font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: ${C.grey}; margin-bottom: 1.25rem;
  }
  .team-quote {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem; font-style: italic; font-weight: 300;
    color: ${C.grey}; line-height: 1.55;
  }
  .team-quote::before { content: '"'; color: ${C.rose}; }
  .team-quote::after  { content: '"'; color: ${C.rose}; }

  /* ── PROCESS ── */
  .process-bg { background: ${C.mint}22; }
  .process-steps {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 0; position: relative;
  }
  .process-step {
    padding: 3rem 2rem; text-align: center; position: relative;
  }
  .process-step:not(:last-child)::after {
    content: '→';
    position: absolute; right: -0.5rem; top: 50%;
    transform: translateY(-50%);
    color: ${C.sageLight}; font-size: 1.5rem;
    display: none;
  }
  .process-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3.5rem; font-weight: 300;
    color: ${C.sageLight}; line-height: 1;
    margin-bottom: 1rem;
  }
  .process-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem; font-weight: 600; color: ${C.dark};
    margin-bottom: 0.65rem;
  }
  .process-desc {
    font-size: 0.88rem; color: ${C.grey}; line-height: 1.65; font-weight: 300;
  }
  .process-icon {
    font-size: 2rem; margin-bottom: 1rem;
  }

  /* ── TESTIMONIALS ── */
  .testi-bg { background: ${C.cream}; }
  .testi-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  .testi-card {
    border: 1px solid ${C.sageLight}66;
    padding: 2.5rem;
    position: relative; background: ${C.white};
  }
  .testi-glyph {
    font-family: 'Cormorant Garamond', serif;
    font-size: 5rem; font-weight: 300;
    color: ${C.rosePale}; line-height: 0.8;
    margin-bottom: 0.5rem;
    display: block;
  }
  .testi-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem; font-weight: 300; font-style: italic;
    color: ${C.dark}; line-height: 1.65; margin-bottom: 1.75rem;
  }
  .testi-stars { color: ${C.gold}; letter-spacing: 0.1em; font-size: 0.85rem; margin-bottom: 1rem; }
  .testi-author { font-size: 0.88rem; font-weight: 500; color: ${C.sageDark}; }
  .testi-area  { font-size: 0.78rem; color: ${C.grey}; margin-top: 0.2rem; }

  /* ── CONTACT ── */
  .contact-bg {
    background: linear-gradient(170deg, ${C.parchment} 0%, ${C.rosePale}44 100%);
  }
  .contact-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 5rem;
    align-items: start;
  }
  .contact-info-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem; font-weight: 300; color: ${C.dark};
    line-height: 1.2; margin-bottom: 1.5rem;
  }
  .contact-info-title em { font-style: italic; color: ${C.sageDark}; }
  .contact-info-sub {
    font-size: 0.95rem; line-height: 1.75;
    color: ${C.grey}; margin-bottom: 2.5rem; font-weight: 300;
  }
  .contact-detail {
    display: flex; align-items: flex-start; gap: 1rem;
    margin-bottom: 1.25rem;
  }
  .contact-detail-icon {
    width: 36px; height: 36px; border-radius: 50%;
    background: ${C.sageLight};
    display: flex; align-items: center; justify-content: center;
    font-size: 0.9rem; flex-shrink: 0;
  }
  .contact-detail-text { font-size: 0.9rem; color: ${C.grey}; line-height: 1.5; }
  .contact-detail-text strong { color: ${C.dark}; font-weight: 500; display: block; }
  .contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
  .form-label {
    font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: ${C.grey}; font-weight: 500;
  }
  .form-input {
    border: 1px solid ${C.sageLight};
    background: ${C.white}; color: ${C.dark};
    padding: 0.85rem 1rem; font-family: 'Jost', sans-serif;
    font-size: 0.9rem; outline: none; transition: border-color 0.2s;
    border-radius: 2px;
  }
  .form-input:focus { border-color: ${C.mintDeep}; }
  .form-select {
    border: 1px solid ${C.sageLight};
    background: ${C.white}; color: ${C.dark};
    padding: 0.85rem 1rem; font-family: 'Jost', sans-serif;
    font-size: 0.9rem; outline: none; transition: border-color 0.2s;
    border-radius: 2px; appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237A8C84' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 1rem center;
  }
  .form-textarea {
    border: 1px solid ${C.sageLight};
    background: ${C.white}; color: ${C.dark};
    padding: 0.85rem 1rem; font-family: 'Jost', sans-serif;
    font-size: 0.9rem; outline: none; transition: border-color 0.2s;
    border-radius: 2px; resize: vertical; min-height: 120px; line-height: 1.6;
  }
  .form-textarea:focus { border-color: ${C.mintDeep}; }

  /* ── FOOTER ── */
  .footer {
    background: ${C.dark};
    padding: 5rem 2rem 2.5rem;
  }
  .footer-inner {
    max-width: 1160px; margin: 0 auto;
    display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 4rem;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    padding-bottom: 3.5rem; margin-bottom: 2.5rem;
  }
  .footer-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem; font-weight: 600; color: ${C.sageLight};
    margin-bottom: 1rem; display: block;
  }
  .footer-logo-grin { color: ${C.rose}; font-style: italic; }
  .footer-brand-text {
    font-size: 0.88rem; color: rgba(255,255,255,0.4);
    line-height: 1.75; font-weight: 300; max-width: 280px;
  }
  .footer-col-title {
    font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(255,255,255,0.3); margin-bottom: 1.5rem; font-weight: 500;
  }
  .footer-link {
    display: block; font-size: 0.88rem;
    color: rgba(255,255,255,0.5); margin-bottom: 0.75rem;
    cursor: pointer; transition: color 0.2s;
    background: none; border: none; text-align: left;
    font-family: 'Jost', sans-serif;
  }
  .footer-link:hover { color: ${C.sageLight}; }
  .footer-bottom {
    max-width: 1160px; margin: 0 auto;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 0.78rem; color: rgba(255,255,255,0.25);
  }
  .footer-bottom-quote {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic; font-size: 0.9rem; color: rgba(255,255,255,0.2);
  }

  /* ── CHESHIRE GRIN DECORATION ── */
  .grin-divider {
    text-align: center; padding: 1.5rem 0;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem; color: ${C.sageLight}66;
    letter-spacing: 0.5em;
  }

  /* ── CONTACT FORM SUCCESS ── */
  .form-success {
    text-align: center; padding: 3rem 2rem;
    background: ${C.sageLight}33; border: 1px solid ${C.sageLight};
    border-radius: 2px;
  }
  .form-success-icon { font-size: 2.5rem; margin-bottom: 1rem; }
  .form-success-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem; font-weight: 300; color: ${C.sageDark}; margin-bottom: 0.5rem;
  }
  .form-success-sub { font-size: 0.9rem; color: ${C.grey}; }

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

      <div className="hero-scroll" onClick={() => scrollTo("trust")}>
        <span className="hero-scroll-line" />
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
            Gardens that make you <em>feel something</em>
          </h2>
          <p className="section-sub">
            Each service is designed for gardens — and clients — that deserve the extraordinary.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s) => (
            <div className="service-card" key={s.name}>
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
          {TESTIMONIALS.map((t, i) => (
            <div className="testi-card" key={i}>
              <span className="testi-glyph">"</span>
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
              { icon: "✉", label: "Email", value: "hello@wonderlawn.co.za" },
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
