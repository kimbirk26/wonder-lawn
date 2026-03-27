import { usePageMeta } from '../usePageMeta'
import { Link } from 'react-router-dom'

export default function PrivacyPage() {
  usePageMeta(
    'Privacy Policy | Wonder Lawn Cape Town',
    'How Wonder Lawn collects, uses, and protects your personal information — in line with POPIA and South African law.'
  )

  return (
    <main className="legal-page">
      <div className="legal-inner">

        <div className="hero-eyebrow" style={{ justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
          <span className="hero-eyebrow-line" style={{ maxWidth: '2rem' }} />
          Legal · Privacy
        </div>

        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-meta">Last updated: March 2026</p>

        <p className="legal-intro">
          Wonder Lawn ("we", "us", "our") is committed to protecting your personal information.
          This policy explains what we collect, why, and how we keep it safe — in plain English,
          and in compliance with the <strong>Protection of Personal Information Act, 4 of 2013 (POPIA)</strong>.
        </p>

        <section className="legal-section">
          <h2>1. Who we are</h2>
          <p>
            Wonder Lawn is a bespoke garden design and landscaping business based in Cape Town,
            South Africa. We operate this website and an online plant shop.
          </p>
          <p>
            Contact us at any time: <a href="mailto:kimbirkdev@gmail.com">kimbirkdev@gmail.com</a>
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Information we collect</h2>
          <p>We collect only what we need to serve you well:</p>
          <ul>
            <li><strong>Account information</strong> — your email address and password when you register.</li>
            <li><strong>Profile details</strong> — your name, phone number, and delivery address when you add them to your account.</li>
            <li><strong>Order information</strong> — the plants you purchase, quantities, total amounts, and delivery address.</li>
            <li><strong>Wishlist</strong> — plants you save to your wishlist.</li>
            <li><strong>Contact form messages</strong> — your name, email, and enquiry when you reach out via our contact form.</li>
            <li><strong>Payment information</strong> — payments are processed by PayFast. We do not store your card details. PayFast's privacy policy applies to payment processing.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. Why we collect your information</h2>
          <ul>
            <li>To process and fulfil your plant orders</li>
            <li>To arrange delivery to your address</li>
            <li>To keep a record of your order history</li>
            <li>To respond to your enquiries</li>
            <li>To save your wishlist between sessions</li>
            <li>To comply with our legal obligations</li>
          </ul>
          <p>We do not sell your personal information to third parties. We do not use it for advertising.</p>
        </section>

        <section className="legal-section">
          <h2>4. How we store your information</h2>
          <p>
            Your data is stored securely using <strong>Supabase</strong>, a cloud database provider
            with servers in the European Union. Supabase is compliant with GDPR and implements
            industry-standard encryption at rest and in transit.
          </p>
          <p>
            We retain your account and order data for as long as your account is active, or as
            required by South African tax and commercial law (generally 5 years).
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Who we share your information with</h2>
          <p>We share your information only as necessary:</p>
          <ul>
            <li><strong>PayFast</strong> — to process your payment (your name, email, and order total).</li>
            <li><strong>Our team</strong> — to prepare and deliver your order.</li>
            <li><strong>Legal authorities</strong> — if required by South African law.</li>
          </ul>
          <p>No other third parties receive your personal information.</p>
        </section>

        <section className="legal-section">
          <h2>6. Your rights under POPIA</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Know what personal information we hold about you</li>
            <li>Request a correction of inaccurate information</li>
            <li>Request deletion of your information (subject to legal retention requirements)</li>
            <li>Object to the processing of your information</li>
            <li>Lodge a complaint with the <strong>Information Regulator of South Africa</strong> at{' '}
              <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer">inforegulator.org.za</a>
            </li>
          </ul>
          <p>
            To exercise any of these rights, email us at{' '}
            <a href="mailto:kimbirkdev@gmail.com">kimbirkdev@gmail.com</a>.
            We will respond within 30 days.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Cookies</h2>
          <p>
            This website uses minimal cookies — only those required for authentication (to keep you
            logged in) and for the shopping cart to function. We do not use advertising or tracking cookies.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Children</h2>
          <p>
            Our website is not directed at children under 18. We do not knowingly collect personal
            information from minors.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. When we do, we will update the date at the
            top. Continued use of the site after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <div className="legal-back">
          <Link to="/" className="btn-outline" style={{ display: 'inline-block' }}>← Back to home</Link>
          <Link to="/terms" className="footer-link" style={{ marginLeft: '2rem' }}>Terms &amp; Conditions →</Link>
        </div>

      </div>
    </main>
  )
}
