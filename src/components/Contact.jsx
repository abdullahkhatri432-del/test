import { ArrowUpRight, Clock, Info, MapPin, MessageCircle, Phone } from 'lucide-react'
import { clinic } from '../config/clinic'
import { telHref, whatsappHref } from '../lib/contact'
import SectionHeader from './SectionHeader'
import './Contact.css'

function ContactItem({ icon: Icon, label, pending = false, children }) {
  return (
    <li className="contact__item">
      <span className="contact__icon" aria-hidden="true">
        <Icon />
      </span>
      <div className="contact__body">
        <p className="contact__label">{label}</p>
        <div className="contact__value">{children}</div>
      </div>
      {pending ? (
        <span className="chip chip--warn contact__pending">Pending</span>
      ) : (
        <span className="sr-only">Verified</span>
      )}
    </li>
  )
}

function MapArtwork() {
  return (
    <svg
      className="contact__map-art"
      viewBox="0 0 600 520"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="600" height="520" fill="#eef8f3" />
      <g stroke="#d3e9e0" strokeWidth="10" fill="none">
        <path d="M-20 120h640M-20 300h640M-20 430h640" />
        <path d="M120 -20v560M340 -20v560M500 -20v560" />
      </g>
      <g fill="#e0f1ea">
        <rect x="140" y="140" width="180" height="140" rx="8" />
        <rect x="360" y="140" width="120" height="140" rx="8" />
        <rect x="140" y="320" width="180" height="95" rx="8" />
        <rect x="360" y="320" width="120" height="95" rx="8" />
        <rect x="30" y="30" width="70" height="70" rx="8" />
        <rect x="520" y="30" width="60" height="70" rx="8" />
      </g>
      <g stroke="#c6e2d8" strokeWidth="4" strokeLinecap="round">
        <path d="M30 200c50 0 50 40 100 40s50-40 100-40" fill="none" />
      </g>
      <circle cx="300" cy="255" r="46" fill="#0c7268" opacity="0.12" />
      <circle cx="300" cy="255" r="22" fill="#0c7268" opacity="0.18" />
      <circle cx="300" cy="255" r="7" fill="#0c7268" />
    </svg>
  )
}

export function Contact() {
  const { phone, whatsapp, address, hours, mapsUrl } = clinic

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact__head">
          <SectionHeader
            eyebrow="Contact"
            title={
              <>
                Visiting the clinic in <em>Surat</em>
              </>
            }
            lead={
              clinic.isDemo
                ? 'Call, message or send an appointment enquiry. The details below are placeholders until the clinic confirms them for publication.'
                : 'Call, message or send an appointment enquiry. The clinic will confirm availability with you directly.'
            }
          />
        </div>

        <div className="contact__grid">
          <div className="contact__details" data-reveal>
            <ul className="contact__list">
              <ContactItem icon={Phone} label={phone.label} pending={!phone.verified}>
                {phone.value ? (
                  <a href={telHref(phone.value)}>{phone.value}</a>
                ) : (
                  <span className="contact__placeholder">{phone.placeholder}</span>
                )}
              </ContactItem>

              <ContactItem icon={MessageCircle} label={whatsapp.label} pending={!whatsapp.verified}>
                {whatsapp.value ? (
                  <a href={whatsappHref(whatsapp.value)} target="_blank" rel="noreferrer noopener">
                    {whatsapp.value}
                  </a>
                ) : (
                  <span className="contact__placeholder">{whatsapp.placeholder}</span>
                )}
              </ContactItem>

              <ContactItem icon={MapPin} label={address.label} pending={address.lines.length === 0}>
                {address.lines.length > 0 ? (
                  <span>
                    {address.lines.map((line) => (
                      <span key={line} className="contact__line">
                        {line}
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className="contact__placeholder">
                    {address.placeholderLines.map((line) => (
                      <span key={line} className="contact__line">
                        {line}
                      </span>
                    ))}
                  </span>
                )}
              </ContactItem>

              <ContactItem icon={Clock} label={hours.label} pending={!hours.verified}>
                {hours.rows.length > 0 ? (
                  <span className="contact__hours">
                    {hours.rows.map((row) => (
                      <span key={row.days} className="contact__hours-row">
                        <span>{row.days}</span>
                        <span>{row.time}</span>
                      </span>
                    ))}
                  </span>
                ) : (
                  <span className="contact__placeholder">{hours.placeholder}</span>
                )}
              </ContactItem>

              <ContactItem icon={MapPin} label="Google Maps" pending={!mapsUrl}>
                {mapsUrl ? (
                  <a href={mapsUrl} target="_blank" rel="noreferrer noopener">
                    Open clinic location
                  </a>
                ) : (
                  <span className="contact__placeholder">Map link not added yet</span>
                )}
              </ContactItem>
            </ul>

            {clinic.isDemo ? (
              <p className="contact__disclaimer">
                <Info aria-hidden="true" />
                <span>{clinic.contactNote}</span>
              </p>
            ) : null}
          </div>

          <div className="contact__map" data-reveal style={{ '--reveal-delay': '120ms' }}>
            <iframe
              title="Clinic location on Google Maps"
              src="https://maps.google.com/maps?q=Ring+Road,+Surat,+Gujarat&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
