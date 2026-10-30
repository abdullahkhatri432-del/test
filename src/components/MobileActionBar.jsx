import { ArrowRight, Phone } from 'lucide-react'
import { clinic } from '../config/clinic'
import { telHref } from '../lib/contact'
import './MobileActionBar.css'

/**
 * Thumb-friendly quick actions on small screens. The call action only becomes
 * a real phone link once a verified number exists; until then it points to the
 * contact section so nothing is faked.
 */
export function MobileActionBar() {
  const canCall = clinic.phone.verified && Boolean(clinic.phone.value)

  return (
    <div className="mobile-bar" role="region" aria-label="Quick actions">
      <a
        className="mobile-bar__secondary"
        href={canCall ? telHref(clinic.phone.value) : '#contact'}
      >
        <Phone aria-hidden="true" />
        <span>{canCall ? 'Call clinic' : 'Contact'}</span>
      </a>

      <a className="btn btn--primary mobile-bar__cta" href="#appointment">
        Book appointment
        <ArrowRight aria-hidden="true" />
      </a>
    </div>
  )
}

export default MobileActionBar
