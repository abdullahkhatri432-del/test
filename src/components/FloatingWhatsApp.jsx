import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Info, X } from 'lucide-react'
import { clinic } from '../config/clinic'
import { whatsappHref } from '../lib/contact'
import WhatsAppIcon from './icons/WhatsAppIcon'
import './FloatingWhatsApp.css'

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef(null)

  const number = clinic.whatsapp.value
  const isConfigured = Boolean(number) && clinic.whatsapp.verified

  useEffect(() => {
    if (!isOpen) return

    const onPointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) setIsOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  if (isConfigured) {
    return (
      <a
        className="wa"
        href={whatsappHref(number)}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Chat with ${clinic.shortName} on WhatsApp`}
      >
        <span className="wa__caption">Chat on WhatsApp</span>
        <span className="wa__fab">
          <WhatsAppIcon />
        </span>
      </a>
    )
  }

  return (
    <div className="wa wa--pending" ref={wrapperRef}>
      <div id="whatsapp-note" className="wa__popover" data-open={isOpen ? 'true' : 'false'}>
        <button
          type="button"
          className="wa__close"
          aria-label="Close WhatsApp message"
          onClick={() => setIsOpen(false)}
        >
          <X aria-hidden="true" />
        </button>
        <span className="wa__popover-icon" aria-hidden="true">
          <WhatsAppIcon />
        </span>
        <p className="wa__popover-title">WhatsApp number pending</p>
        <p className="wa__popover-text">
          A verified WhatsApp number has not been provided for this demo, so no chat link is
          active. Please use the appointment enquiry form instead.
        </p>
        <a className="btn btn--primary btn--sm" href="#appointment" onClick={() => setIsOpen(false)}>
          Appointment enquiry
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>

      <span className="wa__caption" aria-hidden="true">
        <Info className="wa__caption-icon" />
        Number pending
      </span>

      <button
        type="button"
        className="wa__fab"
        title="WhatsApp number pending — click for details"
        aria-expanded={isOpen}
        aria-controls="whatsapp-note"
        aria-label={`WhatsApp — number pending. ${isOpen ? 'Close details.' : 'Show details.'}`}
        onClick={() => setIsOpen((open) => !open)}
      >
        <WhatsAppIcon />
        <span className="wa__badge" aria-hidden="true">
          !
        </span>
      </button>
    </div>
  )
}

export default FloatingWhatsApp
