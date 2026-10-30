/** Primary in-page navigation, shared by the navbar and footer. */
export const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'why-us', label: 'Why choose us', href: '#why-us' },
  { id: 'how-it-works', label: 'How it works', href: '#how-it-works' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
  { id: 'appointment', label: 'Appointment', href: '#appointment' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

/** Shorter list for the main navbar (the appointment CTA is separate). */
export const primaryNavLinks = navLinks.filter((link) =>
  ['home', 'about', 'services', 'faq', 'contact'].includes(link.id),
)

export const footerLinks = navLinks.filter((link) => link.id !== 'home')
