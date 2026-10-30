import { CalendarCheck, ClipboardList, Info, MessageSquare } from 'lucide-react'
import { clinic } from '../config/clinic'
import SectionHeader from './SectionHeader'
import './HowItWorks.css'

const steps = [
  {
    icon: MessageSquare,
    title: 'Contact the clinic',
    text: 'Call, message on WhatsApp, or send an appointment enquiry from this page with your preferred day and time.',
  },
  {
    icon: ClipboardList,
    title: 'Discuss your requirements',
    text: 'The clinic team will talk with you about your concerns, your goals, and whether physiotherapy is appropriate for you.',
  },
  {
    icon: CalendarCheck,
    title: 'Confirm your appointment',
    text: 'Once the clinic checks availability and confirms with you, your appointment is set. Nothing is booked until they respond.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section how">
      <div className="container">
        <SectionHeader
          align="center"
          eyebrow="How it works"
          title={
            <>
              Three simple steps to <em>get started</em>
            </>
          }
          lead="No online booking engine, no automatic confirmations. This website keeps the process honest: you reach out, the clinic responds."
        />

        <ol className="how__steps">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li key={title} data-reveal style={{ '--reveal-delay': `${index * 90}ms` }}>
              <div className="how__step-top">
                <span className="how__number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="how__icon" aria-hidden="true">
                  <Icon />
                </span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>

        <p className="how__note">
          <Info aria-hidden="true" />
          <span>
            {clinic.isDemo
              ? 'This demo website does not book appointments automatically and does not store any information you type into the enquiry form.'
              : 'Enquiries are reviewed by the clinic team. An appointment is only confirmed after they respond.'}
          </span>
        </p>
      </div>
    </section>
  )
}

export default HowItWorks
