import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { clinic } from '../config/clinic'
import { navLinks, primaryNavLinks } from '../data/navigation'
import Brand from './Brand'
import './Navbar.css'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeId, setActiveId] = useState('home')
  const toggleRef = useRef(null)

  /* Subtle elevation once the page is scrolled. */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Lock page scroll + allow Escape to close the mobile menu. */
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.classList.add('is-locked')

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('is-locked')
    }
  }, [isOpen])

  /* Close the drawer when the viewport becomes desktop-sized. */
  useEffect(() => {
    const query = window.matchMedia('(min-width: 921px)')
    const onChange = (event) => {
      if (event.matches) setIsOpen(false)
    }

    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  /* Highlight the section currently in view. */
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((section) => Boolean(section))

    if (sections.length === 0 || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setIsOpen(false)

  return (
    <header className={`site-header${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="container site-header__inner">
        <div className="site-header__brand">
          <a
            href="#home"
            className="brand-link"
            onClick={closeMenu}
          >
            <Brand />
          </a>
          {clinic.isDemo ? (
            <span className="nav-badge" title="Demo preview, not an official clinic website">
              Demo
            </span>
          ) : null}
        </div>

        <nav className="primary-nav" aria-label="Primary">
          <ul>
            {primaryNavLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={activeId === link.id ? 'is-active' : undefined}
                  aria-current={activeId === link.id ? 'location' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <a href="#appointment" className="btn btn--primary btn--sm header-cta">
            Book an appointment
            <ArrowUpRight aria-hidden="true" />
          </a>
          <button
            type="button"
            ref={toggleRef}
            className="nav-toggle"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className="mobile-nav"
        data-open={isOpen ? 'true' : 'false'}
        inert={!isOpen}
      >
        <nav aria-label="Mobile" className="mobile-nav__links">
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={activeId === link.id ? 'is-active' : undefined}
                  aria-current={activeId === link.id ? 'location' : undefined}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#appointment" className="btn btn--primary btn--block" onClick={closeMenu}>
          Book an appointment
          <ArrowUpRight aria-hidden="true" />
        </a>
        <p className="mobile-nav__note">
          {clinic.locality}
          {clinic.isDemo ? ' · Demo preview' : ''}
        </p>
      </div>
    </header>
  )
}

export default Navbar
