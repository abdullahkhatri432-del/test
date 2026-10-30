import { ArrowRight, HelpCircle, Info, Plus } from 'lucide-react'
import { clinic } from '../config/clinic'
import { faqs } from '../data/faqs'
import './Faq.css'

export function Faq() {
  return (
    <section id="faq" className="section faq">
      <div className="container faq__grid">
        <div className="faq__head">
          <p className="eyebrow">Questions</p>
          <h2>
            Before your <em>first visit</em>
          </h2>
          <p className="faq__lead">
            Practical answers about referrals, first appointments and how enquiries work.
            {clinic.isDemo
              ? ' These are general notes for this preview — the clinic will confirm what applies to you.'
              : ' The clinic will confirm what applies to your situation.'}
          </p>

          <div className="faq__help">
            <span className="faq__help-icon" aria-hidden="true">
              <HelpCircle />
            </span>
            <div>
              <p className="faq__help-title">Still unsure?</p>
              <p className="faq__help-text">
                Send an appointment enquiry with your preferred date, or check the contact section
                for the clinic’s verified details once they are added.
              </p>
            </div>
            <a href="#appointment" className="text-link faq__help-link">
              Ask the clinic
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="faq__list">
          {faqs.map((faq, index) => (
            <details key={faq.id} className="faq__item">
              <summary className="faq__summary">
                <span className="faq__number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="faq__question">{faq.question}</h3>
                <span className="faq__icon" aria-hidden="true">
                  <Plus />
                </span>
              </summary>
              <div className="faq__answer">
                <p>
                  {faq.id === 'booking' && !clinic.isDemo
                    ? 'This website does not confirm appointments automatically. Submit an enquiry and the clinic will respond to confirm availability through its verified contact channel.'
                    : faq.answer}
                </p>
              </div>
            </details>
          ))}

          <p className="faq__note">
            <Info aria-hidden="true" />
            <span>
              General information only — not medical advice, diagnosis or treatment. Suitability and
              session plans are discussed individually with a qualified clinician.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Faq
