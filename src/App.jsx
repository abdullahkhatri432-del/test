import { useState } from 'react'
import About from './components/About'
import Appointment from './components/Appointment'
import Contact from './components/Contact'
import DemoBar from './components/DemoBar'
import Faq from './components/Faq'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import Footer from './components/Footer'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import MobileActionBar from './components/MobileActionBar'
import Navbar from './components/Navbar'
import Services from './components/Services'
import StructuredData from './components/StructuredData'
import Gallery from './components/Gallery'
import Team from './components/Team'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import WhyChooseUs from './components/WhyChooseUs'
import { useScrollReveal } from './hooks/useScrollReveal'

export function App() {
  useScrollReveal()

  /*
   * Clicking "Enquire about this service" pre-fills the enquiry message and
   * scrolls to the form. The token makes repeat clicks on the same card work.
   */
  const [prefill, setPrefill] = useState(null)

  const handleServiceEnquiry = (service) => {
    setPrefill({ service, token: Date.now() })
  }

  return (
    <>
      <StructuredData />
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <DemoBar />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Services onEnquire={handleServiceEnquiry} />
        <WhyChooseUs />
        <Pricing />
        <Team />
        <Gallery />
        <Testimonials />
        <HowItWorks />
        <Faq />
        <Appointment prefill={prefill} />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileActionBar />
    </>
  )
}

export default App
