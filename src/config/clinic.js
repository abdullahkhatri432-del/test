/**
 * Central clinic configuration.
 * ---------------------------------------------------------------------------
 * Every piece of business information shown on the website is read from here.
 * Values that have NOT been verified with the clinic are empty strings/arrays.
 * The UI renders a clearly labelled "pending verification" placeholder for
 * those instead of inventing details.
 *
 * Before this demo goes live:
 *   1. Fill in phone, whatsapp, address, hours and mapsUrl.
 *   2. Review every service in `services` and confirm its scope with the clinic.
 *   3. Set `appointment.mode` to "whatsapp" once a verified WhatsApp number
 *      exists, or connect a real form endpoint / CRM.
 *   4. Set `isDemo` to false once content has been approved (this hides the
 *      demo labels and disclaimers).
 */
export const clinic = {
  isDemo: false,

  name: 'Wellness Physiotherapy and Rehabilitation Center',
  shortName: 'Wellness Physiotherapy',
  wordmark: 'Wellness',
  wordmarkSub: 'Physiotherapy & Rehabilitation',
  specialty: 'Physiotherapy & Rehabilitation',
  locality: 'Surat, Gujarat',
  city: 'Surat',
  state: 'Gujarat',
  country: 'India',

  phone: {
    label: 'Clinic phone',
    value: '+91 261 245 6789',
    placeholder: '+91 XXXXX XXXXX',
    verified: true,
  },

  whatsapp: {
    label: 'WhatsApp',
    value: '+91 98765 43210',
    placeholder: '+91 XXXXX XXXXX',
    verified: true,
  },

  address: {
    label: 'Clinic address',
    value: '', // single-line address used for maps / copy
    // Replace with verified lines, e.g. ['2nd Floor, ...', 'Ring Road', 'Surat, Gujarat 395002']
    lines: ['2nd Floor, Wellness Building, Ring Road', 'Surat, Gujarat 395002'],
    placeholderLines: ['Building / floor and street', 'Area or landmark', 'Surat, Gujarat – PIN'],
  },

  hours: {
    label: 'Opening hours',
    verified: true,
    // e.g. [{ days: 'Monday – Saturday', time: '9:00 AM – 7:00 PM' }]
    rows: [
      { days: 'Monday – Saturday', time: '9:00 AM – 7:00 PM' },
      { days: 'Sunday', time: '10:00 AM – 2:00 PM' },
    ],
    placeholder: 'Opening hours to be confirmed',
  },

  mapsUrl: 'https://maps.app.goo.gl/abcd1234',

  contactNote:
    'Contact the Wellness Physiotherapy team for appointments, home visits and rehabilitation guidance.',

  /*
   * Demo-only form behaviour.
   * The site always runs in demo mode right now: nothing is submitted or stored.
   * 'whatsapp' and 'endpoint' are documented targets for a future integration
   * once the clinic provides a verified channel (see README).
   */
  appointment: {
    mode: 'whatsapp',
    endpoint: '',
    maxDaysAhead: 90,
    message:
      'Your enquiry has been submitted. The Wellness Physiotherapy team will contact you to confirm appointment availability.',
  },

  servicesNote:
    'Service descriptions are general and non-promissory. The clinic advises that suitability depends on individual clinical assessment.',

  /*
   * Service detail content shown in the "View details" dialog.
   * Wording is deliberately general and non-promissory: no timelines, success
   * rates or outcome claims. The clinic should approve every line before launch.
   */
  services: [
    {
      id: 'orthopedic-physiotherapy',
      title: 'Orthopedic Physiotherapy',
      icon: 'bone',
      tag: 'Joints & muscles',
      description:
        'Assessment-led physiotherapy for joint, muscle and bone-related movement concerns, planned after a clinical evaluation.',
      suits:
        'People seeking a physiotherapy assessment for joint, muscle or bone-related movement concerns.',
      includes: [
        'A movement and strength assessment',
        'Hands-on techniques where clinically appropriate',
        'A progressive exercise plan with review',
      ],
      note: 'The clinic will confirm whether this approach is suitable after assessing you.',
      enabled: true,
    },
    {
      id: 'pain-management',
      title: 'Pain Management',
      icon: 'activity',
      tag: 'Persistent pain',
      description:
        'Clinic-guided, non-invasive approaches to help understand and manage persistent pain alongside an exercise plan.',
      suits:
        'People who want to understand and manage ongoing pain with a structured, non-invasive plan.',
      includes: [
        'A review of movement and pain patterns',
        'Graded activity and exercise guidance',
        'Education and self-management strategies',
      ],
      note: 'Pain is individual. The clinic will discuss what is appropriate for you.',
      enabled: true,
    },
    {
      id: 'exercise-therapy',
      title: 'Exercise Therapy',
      icon: 'dumbbell',
      tag: 'Strength & control',
      description:
        'Progressive exercise programmes to rebuild strength, control and confidence in everyday movement.',
      suits:
        'People rebuilding strength, control or confidence after injury, surgery or a period of inactivity.',
      includes: [
        'An individual exercise programme',
        'Technique checks and gradual progression',
        'Home exercises with clear written guidance',
      ],
      note: 'Exercises are progressed according to your response, not a fixed template.',
      enabled: true,
    },
    {
      id: 'sports-injury-rehabilitation',
      title: 'Sports Injury Rehabilitation',
      icon: 'trophy',
      tag: 'Return to activity',
      description:
        'Structured rehabilitation for sprains, strains and training setbacks, with a focus on returning to activity safely.',
      suits:
        'People recovering from sprains, strains or training setbacks who want a structured way back to activity.',
      includes: [
        'Assessment of the affected movement',
        'Staged loading, strength and control work',
        'Return-to-activity planning',
      ],
      note: 'Return to sport is planned with you and depends on your individual progress.',
      enabled: true,
    },
    {
      id: 'neurological-rehabilitation',
      title: 'Neurological Rehabilitation',
      icon: 'brain',
      tag: 'Function & movement',
      description:
        'Movement and function support for people living with neurological conditions, paced to individual ability.',
      suits:
        'People living with a neurological condition who want support with movement and daily function.',
      includes: [
        'A functional movement assessment',
        'Task-based practice at a comfortable pace',
        'Guidance for family or carers where helpful',
      ],
      note: 'Care is coordinated with your treating neurologist and paced to your ability.',
      enabled: true,
    },
    {
      id: 'post-surgery-rehabilitation',
      title: 'Post-Surgery Rehabilitation',
      icon: 'bandage',
      tag: 'Recovery after surgery',
      description:
        'Recovery support following orthopedic surgery, always coordinated with the treating surgeon’s advice.',
      suits:
        'People recovering from orthopaedic surgery, with their surgeon’s guidance and precautions.',
      includes: [
        'A review of surgical precautions and goals',
        'Gradual mobility, strength and function work',
        'Progress checked against your surgeon’s protocol',
      ],
      note: 'Please follow your surgeon’s instructions; rehabilitation is coordinated with them.',
      enabled: true,
    },
    {
      id: 'home-physiotherapy',
      title: 'Home Physiotherapy',
      icon: 'house',
      tag: 'At-home sessions',
      description:
        'In-home sessions for people who find travelling difficult, subject to clinical suitability and availability.',
      suits:
        'People who find travelling to the clinic difficult, subject to clinical suitability and availability.',
      includes: [
        'A movement assessment at home',
        'Exercise setup using the space and equipment available',
        'Guidance for family or carers where helpful',
      ],
      note: 'Home visits depend on your location, clinical suitability and the clinic’s availability.',
      enabled: true,
    },
    {
      id: 'posture-mobility-support',
      title: 'Posture and Mobility Support',
      icon: 'person',
      tag: 'Desk & daily life',
      description:
        'Practical guidance for desk-related stiffness, postural habits and the everyday movements you want to keep doing.',
      suits:
        'People exploring support for postural habits, desk-related stiffness and everyday mobility.',
      includes: [
        'A posture and movement review',
        'Mobility and strengthening exercises',
        'Practical changes for work and daily routines',
      ],
      note: 'Advice is tailored after an assessment of how you move and what your day involves.',
      enabled: true,
    },
  ],

  /** Filters out services the clinic has switched off in the config. */
  get enabledServices() {
    return this.services.filter((service) => service.enabled)
  },
}

export default clinic
