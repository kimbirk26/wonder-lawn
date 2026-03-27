import { usePageMeta } from '../usePageMeta'
import { Link } from 'react-router-dom'

export default function TermsPage() {
  usePageMeta(
    'Terms & Conditions | Wonder Lawn Cape Town',
    'Terms and conditions for Wonder Lawn garden design services and online plant shop — Cape Town, South Africa.'
  )

  return (
    <main className="legal-page">
      <div className="legal-inner">

        <div className="hero-eyebrow" style={{ justifyContent: 'flex-start', marginBottom: '1.5rem' }}>
          <span className="hero-eyebrow-line" style={{ maxWidth: '2rem' }} />
          Legal · Terms
        </div>

        <h1 className="legal-title">Terms &amp; Conditions</h1>
        <p className="legal-meta">Last updated: March 2026</p>

        <p className="legal-intro">
          These terms govern your use of the Wonder Lawn website and your purchase of plants and
          garden services from us. By placing an order or making an enquiry, you agree to these terms.
        </p>

        <section className="legal-section">
          <h2>1. About us</h2>
          <p>
            Wonder Lawn is a bespoke garden design and landscaping business operating in Cape Town,
            South Africa. Contact us at <a href="mailto:kimbirkdev@gmail.com">kimbirkdev@gmail.com</a>{' '}
            or via WhatsApp at +27 63 793 1439.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Online plant shop — orders</h2>
          <ul>
            <li>All prices are listed in South African Rand (ZAR) and include VAT where applicable.</li>
            <li>Placing an order constitutes an offer to purchase. Your order is confirmed once payment is successful.</li>
            <li>We reserve the right to cancel an order if a plant is unexpectedly out of stock, in which case you will receive a full refund.</li>
            <li>Stock availability is updated regularly but may not be real-time. If an item you ordered is unavailable, we will contact you promptly.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. Payment</h2>
          <ul>
            <li>Payments are processed securely by <strong>PayFast</strong>. We accept all major credit and debit cards, instant EFT, and other methods supported by PayFast.</li>
            <li>Wonder Lawn does not store your card or banking details.</li>
            <li>Your order will only be processed once payment has been confirmed.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Delivery</h2>
          <ul>
            <li>We deliver within the Cape Town metropolitan area. If you are outside this area, please contact us before ordering.</li>
            <li>We will contact you within 1–2 business days of your order to arrange a delivery time that suits you.</li>
            <li>Delivery fees, if applicable, will be communicated before confirmation.</li>
            <li>We take care to pack plants well, but if your plant arrives damaged, please photograph it immediately and contact us within 24 hours — we will make it right.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. Returns and refunds</h2>
          <ul>
            <li>Plants are living things and are inspected before dispatch. If your plant arrives in poor condition, contact us within 24 hours with photos and we will offer a replacement or refund.</li>
            <li>We cannot accept returns of healthy plants that have been delivered as described — please choose carefully or contact us before ordering if you have questions about suitability.</li>
            <li>Refunds for cancelled orders are processed within 5–7 business days via the original payment method.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>6. Garden design and landscaping services</h2>
          <ul>
            <li>Garden design and landscaping services are governed by a separate written agreement provided before work begins.</li>
            <li>Consultation bookings made via this website or WhatsApp are subject to availability. We will confirm your booking by return.</li>
            <li>Cancellations with less than 24 hours' notice may be charged a consultation fee.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>7. Intellectual property</h2>
          <p>
            All content on this website — including text, photographs, garden designs, and illustrations —
            belongs to Wonder Lawn or is used with permission. You may not reproduce or use our content
            without written consent.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Limitation of liability</h2>
          <p>
            Wonder Lawn's liability for any claim arising from a purchase is limited to the value of
            the order in question. We are not liable for indirect or consequential losses.
          </p>
          <p>
            Plants are living organisms. While we select healthy stock, we cannot guarantee outcomes
            once plants leave our care. We are happy to give planting and care advice to give your
            plants the best chance.
          </p>
        </section>

        <section className="legal-section">
          <h2>9. Governing law</h2>
          <p>
            These terms are governed by the laws of the Republic of South Africa. Any disputes will
            be resolved in the courts of South Africa, and we will always try to resolve issues
            amicably first.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Changes to these terms</h2>
          <p>
            We may update these terms from time to time. Changes take effect when posted. Your
            continued use of the website constitutes acceptance of the updated terms.
          </p>
        </section>

        <div className="legal-back">
          <Link to="/" className="btn-outline" style={{ display: 'inline-block' }}>← Back to home</Link>
          <Link to="/privacy" className="footer-link" style={{ marginLeft: '2rem' }}>Privacy Policy →</Link>
        </div>

      </div>
    </main>
  )
}
