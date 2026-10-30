import { ArrowUp, Mail } from 'lucide-react'
import { clinic } from '../config/clinic'
import { footerLinks } from '../data/navigation'
import Brand from './Brand'
import './Footer.css'

const year = new Date().getFullYear()

export function Footer() {
  const careAreas = clinic.enabledServices.slice(0, 5)

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#home" className="footer__brand-link">
              <Brand variant="dark" />
            </a>
            <p>
              {clinic.isDemo
                ? 'Physiotherapy and rehabilitation in Surat. This is a demonstration website: content, services and contact details must be verified with the clinic before publication.'
                : `${clinic.specialty} in ${clinic.locality}. Contact the clinic to discuss assessment, rehabilitation and appointment availability.`}
            </p>
            {clinic.isDemo ? <span className="footer__demo">Demo website</span> : null}
          </div>

          <nav className="footer__col" aria-label="Footer">
            <h3>Explore</h3>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h3>Care areas</h3>
            <ul>
              {careAreas.map((service) => (
                <li key={service.id}>
                  <a href="#services">{service.title}</a>
                </li>
              ))}
              <li>
                <a href="#services">View all services</a>
              </li>
            </ul>
          </div>

          <div className="footer__col footer__col--contact">
            <h3>Contact</h3>
            <ul>
              <li>
                <span className="footer__label">Phone</span>
                <span className="footer__placeholder">
                  {clinic.phone.value || clinic.phone.placeholder}
                </span>
              </li>
              <li>
                <span className="footer__label">WhatsApp</span>
                <span className="footer__placeholder">
                  {clinic.whatsapp.value || clinic.whatsapp.placeholder}
                </span>
              </li>
              <li>
                <span className="footer__label">Address</span>
                <span className="footer__placeholder">
                  {clinic.address.lines.length > 0
                    ? clinic.address.lines.join(', ')
                    : 'Clinic address to be confirmed'}
                </span>
              </li>
              <li>
                <a href="#appointment" className="footer__cta">
                  <Mail aria-hidden="true" />
                  Send an enquiry
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {clinic.name}.
            {clinic.isDemo ? ' Demo preview only.' : ' All rights reserved.'}
          </p>
          <ul className="footer__legal">
            {clinic.isDemo ? <li>Placeholder imagery via Pexels</li> : null}
            <li>
              <a href="#home" className="footer__top-link">
                Back to top
                <ArrowUp aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <p className="footer__disclaimer">
          <strong>Medical disclaimer:</strong>{' '}
          {clinic.isDemo
            ? 'This website is a design preview and does not provide medical advice, diagnosis or treatment. Physiotherapy suitability, session plans and outcomes are individual and must be discussed with a qualified clinician. No appointment is booked through this demo, and no recovery or result is guaranteed.'
            : 'This website provides general information about physiotherapy and rehabilitation services. It does not replace an individual assessment, diagnosis or treatment. Suitability for any treatment is discussed with a qualified clinician, and no recovery or result is guaranteed.'}
        </p>
      </div>
    </footer>
  )
}

export default Footer
