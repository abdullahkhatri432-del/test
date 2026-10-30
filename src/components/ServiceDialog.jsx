import { useEffect, useRef } from 'react'
import {
  Activity,
  ArrowRight,
  Bandage,
  Bone,
  Brain,
  Check,
  Dumbbell,
  House,
  Info,
  PersonStanding,
  Trophy,
  X,
} from 'lucide-react'
import { clinic } from '../config/clinic'
import './ServiceDialog.css'

const serviceIcons = {
  bone: Bone,
  activity: Activity,
  dumbbell: Dumbbell,
  trophy: Trophy,
  brain: Brain,
  bandage: Bandage,
  house: House,
  person: PersonStanding,
}

/**
 * Accessible service detail dialog built on the native <dialog> element:
 * focus trapping, Escape handling and backdrop semantics come from the browser.
 */
export function ServiceDialog({ service, onClose, onEnquire }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (service && !dialog.open) {
      dialog.showModal()
      document.body.classList.add('is-locked')
    }

    if (!service) {
      if (dialog.open) dialog.close()
      document.body.classList.remove('is-locked')
    }
  }, [service])

  useEffect(() => {
    return () => document.body.classList.remove('is-locked')
  }, [])

  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) dialogRef.current?.close()
  }

  const Icon = service ? (serviceIcons[service.icon] ?? Activity) : Activity

  return (
    <dialog
      ref={dialogRef}
      className="service-dialog"
      aria-labelledby="service-dialog-title"
      aria-describedby={service ? 'service-dialog-desc' : undefined}
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      {service ? (
        <div className="service-dialog__inner">
          <div className="service-dialog__scroll">
            <div className="service-dialog__top">
              <span className="service-dialog__icon" aria-hidden="true">
                <Icon />
              </span>
              <span className="chip chip--mint service-dialog__tag">{service.tag}</span>
              <button
                type="button"
                className="service-dialog__close"
                aria-label="Close service details"
                onClick={() => dialogRef.current?.close()}
                autoFocus
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <h2 id="service-dialog-title">{service.title}</h2>
            <p className="service-dialog__desc" id="service-dialog-desc">
              {service.description}
            </p>

            <div className="service-dialog__cols">
              <div className="service-dialog__block">
                <h3>Who it may suit</h3>
                <p>{service.suits}</p>
              </div>

              <div className="service-dialog__block">
                <h3>What it may include</h3>
                <ul>
                  {service.includes.map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="service-dialog__note">
              <Info aria-hidden="true" />
              <span>
                {service.note}
                {clinic.isDemo
                  ? ' This is demo content; the clinic must confirm the service scope before it is advertised.'
                  : ''}
              </span>
            </p>
          </div>

          <div className="service-dialog__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => {
                dialogRef.current?.close()
                onEnquire(service.title)
              }}
            >
              Enquire about this service
              <ArrowRight aria-hidden="true" />
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => dialogRef.current?.close()}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </dialog>
  )
}

export default ServiceDialog
