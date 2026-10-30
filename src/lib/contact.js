import { formatLongDate } from './validation'

/** Builds a `tel:` link from a display phone number. */
export function telHref(value = '') {
  const digits = String(value).replace(/[^\d+]/g, '')
  return digits ? `tel:${digits}` : ''
}

/**
 * Converts Indian display formats into the digits wa.me expects:
 * "98765 43210" → "919876543210", "+91 98765 43210" → "919876543210".
 */
export function toWhatsAppNumber(value = '') {
  const digits = String(value).replace(/\D/g, '')

  if (digits.length === 10) return `91${digits}`
  if (digits.length === 11 && digits.startsWith('0')) return `91${digits.slice(1)}`
  if (digits.length === 12 && digits.startsWith('91')) return digits
  return digits
}

/** `wa.me` link with an optional pre-filled message. Empty string when unusable. */
export function whatsappHref(value = '', text = '') {
  const number = toWhatsAppNumber(value)
  if (!number) return ''

  const query = text ? `?text=${encodeURIComponent(text)}` : ''
  return `https://wa.me/${number}${query}`
}

/** Plain-text enquiry used for the WhatsApp handoff and the copy button. */
export function buildEnquiryMessage(values, clinicName = 'the clinic') {
  const lines = [
    `Hello ${clinicName}, I would like to enquire about an appointment.`,
    '',
    `Name: ${values.name.trim()}`,
    `Phone: ${values.phone.trim()}`,
    `Preferred date: ${formatLongDate(values.date)}`,
  ]

  const note = values.message.trim()
  if (note) lines.push('', `Note: ${note}`)

  return lines.join('\n')
}
