import { Check, Clock, ShieldCheck } from 'lucide-react'
import SectionHeader from './SectionHeader'
import './Pricing.css'

const packages = [
  {
    id: 'initial',
    title: 'Initial Assessment',
    price: '₹1,500',
    duration: '45 min',
    description: 'Comprehensive movement and posture assessment with a personalised treatment plan.',
    includes: ['Clinical assessment', 'Posture analysis', 'Exercise plan', 'First session guidance'],
    popular: false,
  },
  {
    id: 'standard',
    title: 'Standard Session',
    price: '₹1,200',
    duration: '60 min',
    description: 'Hands-on physiotherapy, guided exercise, and progress review for recovery.',
    includes: ['Hands-on therapy', 'Exercise progression', 'Pain management guidance', 'Home exercise sheet'],
    popular: true,
  },
  {
    id: 'package-6',
    title: '6-Session Package',
    price: '₹6,000',
    duration: 'Per session',
    description: 'Structured rehabilitation plan with consistent follow-up for best results.',
    includes: ['6 standard sessions', 'Progress tracking', 'Exercise updates', 'Priority booking'],
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="section pricing" aria-labelledby="pricing-title">
      <div className="container">
        <SectionHeader
          eyebrow="Pricing"
          title={
            <>
              Clear care, <em>no surprises</em>
            </>
          }
          lead="Transparent pricing for assessment, session and rehabilitation packages in Surat. No hidden fees — just focused recovery."
        />

        <div className="pricing__cards">
          {packages.map((p) => (
            <div
              key={p.id}
              className={`pricing__card ${p.popular ? 'pricing__card--popular' : ''}`}
              data-reveal
            >
              {p.popular ? (
                <span className="pricing__badge">Popular</span>
              ) : null}
              <h3 className="pricing__title">{p.title}</h3>
              <div className="pricing__price-row">
                <span className="pricing__price">{p.price}</span>
                <span className="pricing__duration">
                  <Clock size={14} aria-hidden="true" />
                  {p.duration}
                </span>
              </div>
              <p className="pricing__desc">{p.description}</p>
              <ul className="pricing__list" aria-label={`${p.title} includes`}>
                {p.includes.map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="pricing__disclaimer">
          <ShieldCheck size={16} aria-hidden="true" />
          <span>
            Pricing is indicative. Final cost depends on individual clinical needs. Insurance and cashless options available at select providers — ask the clinic for details.
          </span>
        </p>
      </div>
    </section>
  )
}

export default Pricing
