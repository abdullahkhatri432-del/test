import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AlertCircle,
  Check,
  Copy,
  Info,
  Send,
  SendHorizontal,
} from 'lucide-react'
import { clinic } from '../config/clinic'
import { buildEnquiryMessage, whatsappHref } from '../lib/contact'
import { copyText } from '../lib/clipboard'
import {
  formatLongDate,
  getDateBounds,
  MESSAGE_LIMIT,
  validateAppointment,
} from '../lib/validation'
import WhatsAppIcon from './icons/WhatsAppIcon'
import './Appointment.css'

const emptyValues = { name: '', phone: '', date: '', message: '' }

function EnquirySummary({ values }) {
  return (
    <dl className="appointment__summary">
      <div>
        <dt>Name</dt>
        <dd>{values.name.trim()}</dd>
      </div>
      <div>
        <dt>Phone</dt>
        <dd>{values.phone.trim()}</dd>
      </div>
      <div>
        <dt>Preferred date</dt>
        <dd>{formatLongDate(values.date)}</dd>
      </div>
      {values.message.trim() ? (
        <div>
          <dt>Message</dt>
          <dd>{values.message.trim()}</dd>
        </div>
      ) : null}
    </dl>
  )
}

export function Appointment({ prefill }) {
  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [copyState, setCopyState] = useState('idle')
  const headingRef = useRef(null)
  const formRef = useRef(null)
  const resultHeadingRef = useRef(null)
  const copyTimer = useRef(null)

  const bounds = useMemo(
    () => getDateBounds(clinic.appointment.maxDaysAhead),
    [],
  )

  const enquiryText = useMemo(
    () => buildEnquiryMessage(values, clinic.shortName),
    [values],
  )

  const whatsappLink = useMemo(
    () => whatsappHref(clinic.whatsapp.value, enquiryText),
    [enquiryText],
  )

  /* A service card asked to enquire about that service. */
  useEffect(() => {
    if (!prefill?.service) return

    /*
     * The enquiry is triggered by a click in another section, so this effect is
     * the synchronisation point for the pre-filled message and focus.
     */
    // oxlint-disable-next-line react/set-state-in-effect
    setValues((previous) => {
      const message = `Enquiry about: ${prefill.service}.`
      const isUntouched = !previous.message.trim() || previous.message.startsWith('Enquiry about: ')
      return isUntouched ? { ...previous, message } : previous
    })
    setStatus('idle')
    setCopyState('idle')

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('appointment')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })

    const timer = window.setTimeout(() => headingRef.current?.focus({ preventScroll: true }), 120)
    return () => window.clearTimeout(timer)
  }, [prefill])

  useEffect(() => {
    return () => window.clearTimeout(copyTimer.current)
  }, [])

  /* Move focus to the outcome so keyboard and screen-reader users land there. */
  useEffect(() => {
    const resultStates = ['demo', 'whatsapp', 'sent', 'error', 'unavailable']
    if (!resultStates.includes(status)) return

    const timer = window.setTimeout(
      () => resultHeadingRef.current?.focus({ preventScroll: true }),
      60,
    )
    return () => window.clearTimeout(timer)
  }, [status])

  const handleEdit = () => {
    setStatus('idle')
    window.setTimeout(() => formRef.current?.querySelector('[name="name"]')?.focus(), 0)
  }

  const handleNewEnquiry = () => {
    setValues(emptyValues)
    setErrors({})
    setStatus('idle')
    window.setTimeout(() => formRef.current?.querySelector('[name="name"]')?.focus(), 0)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
    setCopyState('idle')
    setErrors((previous) => {
      if (!previous[name]) return previous
      const next = { ...previous }
      delete next[name]
      return next
    })
  }

  const handleBlur = (event) => {
    const { name } = event.target
    const nextErrors = validateAppointment(values, clinic.appointment.maxDaysAhead)
    setErrors((previous) => ({ ...previous, [name]: nextErrors[name] }))
  }

  const handleCopy = async () => {
    const copied = await copyText(enquiryText)
    setCopyState(copied ? 'copied' : 'failed')
    window.clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopyState('idle'), 3000)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validateAppointment(values, clinic.appointment.maxDaysAhead)
    setErrors(nextErrors)

    const firstError = Object.keys(nextErrors)[0]
    if (firstError) {
      formRef.current?.querySelector(`[name="${firstError}"]`)?.focus()
      return
    }

    const mode = clinic.appointment.mode

    /*
     * Demo mode is the default: validate locally, show exactly what would be
     * shared, and never send or store anything.
     */
    if (mode === 'demo') {
      setStatus('demo')
      return
    }

    if (mode === 'whatsapp') {
      if (!clinic.whatsapp.verified || !whatsappLink) {
        setStatus('unavailable')
        return
      }

      setStatus('whatsapp')
      window.open(whatsappLink, '_blank', 'noopener,noreferrer')
      return
    }

    if (mode === 'endpoint') {
      if (!clinic.appointment.endpoint) {
        setStatus('unavailable')
        return
      }

      try {
        setStatus('sending')
        const response = await fetch(clinic.appointment.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: values.name.trim(),
            phone: values.phone.trim(),
            preferredDate: values.date,
            message: values.message.trim(),
            source: 'website-enquiry',
          }),
        })

        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
        setStatus('sent')
      } catch {
        setStatus('error')
      }
      return
    }

    /* Unknown configuration falls back to the honest demo behaviour. */
    setStatus('demo')
  }

  const isDemoMode = clinic.appointment.mode === 'demo'

  return (
    <section id="appointment" className="section appointment" aria-labelledby="appointment-title">
      <div className="container">
        <div className="appointment__card" data-reveal>
          <div className="appointment__aside">
            <p className="eyebrow">Appointment enquiry</p>
            <h2 id="appointment-title" ref={headingRef} tabIndex={-1}>
              Let’s find a time that works for you
            </h2>
            <p>
              Share your contact details and preferred date. The clinic team will respond to
              confirm availability — please don’t include medical reports or health details.
            </p>

            <ul className="appointment__points">
              <li>
                <Check aria-hidden="true" />
                Contact details and a preferred date only
              </li>
              <li>
                <Check aria-hidden="true" />
                No appointment is booked automatically
              </li>
              <li>
                <Check aria-hidden="true" />
                The clinic confirms availability with you directly
              </li>
            </ul>

            {isDemoMode ? (
              <div className="appointment__demo">
                <span className="chip chip--mint">
                  <Info aria-hidden="true" />
                  Demo form
                </span>
                <p>
                  Clinic phone and WhatsApp details are pending, so this form is a visual preview.
                  Nothing is sent, stored or booked.
                </p>
              </div>
            ) : (
              <div className="appointment__demo">
                <span className="chip chip--mint">
                  <WhatsAppIcon />
                  WhatsApp enquiry
                </span>
                <p>
                  Submitting opens WhatsApp with your enquiry pre-filled. Nothing is stored on this
                  website — you choose whether to send the message.
                </p>
              </div>
            )}
          </div>

          <div className="appointment__panel">
            {status === 'demo' ? (
              <div className="appointment__result" role="status">
                <span className="appointment__result-icon" aria-hidden="true">
                  <Info />
                </span>
                <h3 ref={resultHeadingRef} tabIndex={-1}>
                  Enquiry ready — but not sent
                </h3>
                <p>
                  {clinic.appointment.message} Your details stayed in this browser tab and were
                  not saved anywhere.
                </p>

                <EnquirySummary values={values} />

                <div className="appointment__preview">
                  <div className="appointment__preview-head">
                    <span className="appointment__preview-title">
                      <WhatsAppIcon aria-hidden="true" />
                      WhatsApp message preview
                    </span>
                    <button type="button" className="appointment__copy" onClick={handleCopy}>
                      {copyState === 'copied' ? (
                        <>
                          <Check aria-hidden="true" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy aria-hidden="true" />
                          Copy
                        </>
                      )}
                    </button>
                    <span className="sr-only" role="status">
                      {copyState === 'copied'
                        ? 'Enquiry text copied to clipboard.'
                        : copyState === 'failed'
                          ? 'Copy failed. Select the preview text manually.'
                          : ''}
                    </span>
                  </div>
                  <pre className="appointment__preview-body">{enquiryText}</pre>
                  <p className="appointment__preview-note">
                    {copyState === 'failed'
                      ? 'Copying was blocked by the browser. You can select the text above manually.'
                      : 'A verified WhatsApp number is pending, so this cannot be sent yet. Once configured, this preview becomes a one-tap WhatsApp handoff.'}
                  </p>
                </div>

                <div className="appointment__result-actions">
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={handleEdit}
                  >
                    Edit details
                  </button>
                </div>

                <p className="appointment__result-help">
                  To take real enquiries, the clinic needs to provide a verified WhatsApp number or
                  a booking endpoint. Both are configured in <code>src/config/clinic.js</code>.
                </p>
              </div>
            ) : null}

            {status === 'whatsapp' ? (
              <div className="appointment__result" role="status">
                <span className="appointment__result-icon appointment__result-icon--wa" aria-hidden="true">
                  <WhatsAppIcon />
                </span>
                <h3 ref={resultHeadingRef} tabIndex={-1}>
                  WhatsApp is opening
                </h3>
                <p>
                  Your enquiry has been pre-filled in WhatsApp. Review the message and press send
                  there — nothing is submitted until you do.
                </p>

                <EnquirySummary values={values} />

                <div className="appointment__result-actions">
                  {whatsappLink ? (
                    <a
                      className="btn btn--primary btn--sm"
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Open WhatsApp again
                      <SendHorizontal aria-hidden="true" />
                    </a>
                  ) : null}
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={handleEdit}
                  >
                    Edit details
                  </button>
                </div>

                <p className="appointment__result-help">
                  If WhatsApp did not open, check that pop-ups are allowed for this site, or call
                  the clinic once its verified number is published.
                </p>
              </div>
            ) : null}

            {status === 'sent' ? (
              <div className="appointment__result" role="status">
                <span className="appointment__result-icon" aria-hidden="true">
                  <Check />
                </span>
                <h3 ref={resultHeadingRef} tabIndex={-1}>
                  Enquiry received
                </h3>
                <p>
                  The clinic will contact you to confirm availability. This is an enquiry, not a
                  confirmed appointment.
                </p>
                <EnquirySummary values={values} />
                <div className="appointment__result-actions">
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={handleNewEnquiry}
                  >
                    Send another enquiry
                  </button>
                </div>
              </div>
            ) : null}

            {status === 'error' ? (
              <div className="appointment__result" role="alert">
                <span className="appointment__result-icon appointment__result-icon--warn" aria-hidden="true">
                  <AlertCircle />
                </span>
                <h3 ref={resultHeadingRef} tabIndex={-1}>
                  Enquiry could not be sent
                </h3>
                <p>
                  Something went wrong while sending. Please try again, or contact the clinic
                  directly once its verified details are published.
                </p>
                <div className="appointment__result-actions">
                  <button
                    type="button"
                    className="btn btn--primary btn--sm"
                    onClick={handleEdit}
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : null}

            {status === 'unavailable' ? (
              <div className="appointment__result" role="alert">
                <span className="appointment__result-icon appointment__result-icon--warn" aria-hidden="true">
                  <AlertCircle />
                </span>
                <h3 ref={resultHeadingRef} tabIndex={-1}>
                  Enquiry channel not configured
                </h3>
                <p>
                  No verified WhatsApp number or form endpoint has been provided yet, so this
                  enquiry cannot be sent. Please contact the clinic directly.
                </p>
                <div className="appointment__result-actions">
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={handleEdit}
                  >
                    Edit details
                  </button>
                </div>
              </div>
            ) : null}

            {status === 'idle' || status === 'sending' ? (
              <form
                className="appointment__form"
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                aria-busy={status === 'sending'}
              >
                <h3 className="appointment__form-title">Request an appointment</h3>

                <div className="field">
                  <label htmlFor="name">
                    Full name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name ? (
                    <p className="field__error" id="name-error" role="alert">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div className="field">
                  <label htmlFor="phone">
                    Phone number <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="Your mobile number"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
                  />
                  {errors.phone ? (
                    <p className="field__error" id="phone-error" role="alert">
                      {errors.phone}
                    </p>
                  ) : (
                    <p className="field__hint" id="phone-hint">
                      10-digit mobile number. Include +91 if you prefer.
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="date">
                    Preferred appointment date <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={bounds.min}
                    max={bounds.max}
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={errors.date ? 'date-error' : 'date-hint'}
                  />
                  {errors.date ? (
                    <p className="field__error" id="date-error" role="alert">
                      {errors.date}
                    </p>
                  ) : (
                    <p className="field__hint" id="date-hint">
                      Choose any date within the next {clinic.appointment.maxDaysAhead} days. The
                      clinic will confirm the actual time.
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="message">
                    Short message <span className="field__optional">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    maxLength={MESSAGE_LIMIT}
                    placeholder="Anything the clinic should know before calling you — no medical details needed."
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? 'message-error message-hint' : 'message-hint'
                    }
                  />
                  <div className="field__meta">
                    <p className="field__hint" id="message-hint">
                      Please don’t share reports or health information.
                    </p>
                    <span className="field__counter" aria-hidden="true">
                      {values.message.length}/{MESSAGE_LIMIT}
                    </span>
                  </div>
                  {errors.message ? (
                    <p className="field__error" id="message-error" role="alert">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="btn btn--primary btn--block"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending enquiry…' : 'Send appointment enquiry'}
                  <Send aria-hidden="true" />
                </button>

                <p className="appointment__form-note">
                  <Info aria-hidden="true" />
                  <span>
                    {isDemoMode
                      ? 'Demo only: submitting this form does not send your details or book an appointment.'
                      : 'Only your name, phone, preferred date and optional note are shared. No medical records are collected.'}
                  </span>
                </p>
              </form>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Appointment
