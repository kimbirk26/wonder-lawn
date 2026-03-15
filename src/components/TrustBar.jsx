const ITEMS = [
  'Proudly Cape Town based',
  'Fully insured & certified',
  'Exclusive client roster',
  'Award-winning design team',
]

export default function TrustBar() {
  return (
    <div className="trust-bar">
      {ITEMS.map((item, i) => (
        <div key={i} className="trust-item">
          <span className="trust-dot" />
          {item}
        </div>
      ))}
    </div>
  )
}
