import { clinic } from '../config/clinic'

/**
 * JSON-LD for the clinic, generated from the same config as the visible page.
 * Unverified contact fields are omitted rather than filled with placeholders, so
 * the markup can never advertise a fake phone number or address.
 */
export function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Physiotherapy',
    name: clinic.name,
    description: `${clinic.specialty} clinic in ${clinic.locality}.`,
    areaServed: {
      '@type': 'City',
      name: clinic.city,
    },
  }

  if (clinic.phone.verified && clinic.phone.value) {
    data.telephone = clinic.phone.value
  }

  if (clinic.address.lines.length > 0) {
    data.address = {
      '@type': 'PostalAddress',
      streetAddress: clinic.address.lines.slice(0, -1).join(', ') || clinic.address.lines[0],
      addressLocality: clinic.city,
      addressRegion: clinic.state,
      addressCountry: 'IN',
    }
  }

  if (clinic.mapsUrl) data.hasMap = clinic.mapsUrl

  data.availableService = clinic.enabledServices.map((service) => ({
    '@type': 'MedicalTherapy',
    name: service.title,
    description: service.description,
  }))

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}

export default StructuredData
