import { ArrowDown, ArrowRight, ClipboardList, CheckCircle2 } from 'lucide-react'
import { clinic } from '../config/clinic'
import heroImage from '../assets/images/hero-rehabilitation.jpg'
import heroImageSmall from '../assets/images/hero-rehabilitation-800.jpg'
import './Hero.css'

const highlights = [
  'Personalised assessment',
  'Guided exercise therapy',
  'Functional mobility focus',
]

export function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__blob hero__blob--one" />
        <span className="hero__blob hero__blob--two" />
        <span className="hero__dots" />
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">
            {clinic.specialty} · {clinic.locality}
          </p>

          <h1 className="hero__title">
            Move Better.
            <br />
            Recover Stronger.
            <br />
            <span className="hero__accent">
              Live Healthier.
              <svg
                className="hero__underline"
                viewBox="0 0 300 16"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M3 11.5c58-7 128-9 294-5.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="hero__lede">
            A calm, structured approach to physiotherapy and rehabilitation — built around how you
            want to move again, and reviewed with you at every step.
          </p>

          <div className="hero__actions">
            <a href="#appointment" className="btn btn--primary btn--lg">
              Book an Appointment
              <ArrowRight aria-hidden="true" />
            </a>
            <a href="#services" className="btn btn--ghost btn--lg">
              Explore Our Services
              <ArrowDown aria-hidden="true" />
            </a>
          </div>

          <ul className="hero__highlights">
            {highlights.map((item) => (
              <li key={item}>
                <CheckCircle2 aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero__media">
          <span className="hero__arch" aria-hidden="true" />

          <figure className="hero__figure">
            <img
              src={heroImage}
              srcSet={`${heroImageSmall} 800w, ${heroImage} 1600w`}
              sizes="(max-width: 920px) 92vw, 46vw"
              alt="A physiotherapist supporting a patient's leg during a rehabilitation exercise in a bright clinic room"
              width="1600"
              height="1067"
              fetchPriority="high"
              decoding="async"
            />
          </figure>

          <div className="hero__card">
            <div className="hero__card-head">
              <span className="icon-tile hero__card-icon" aria-hidden="true">
                <ClipboardList />
              </span>
              <div>
                <p className="hero__card-title">Your care pathway</p>
                <p className="hero__card-sub">Clear steps, reviewed with you</p>
              </div>
            </div>
            <ol className="hero__steps">
              <li>
                <span aria-hidden="true">01</span> Assess how you move
              </li>
              <li>
                <span aria-hidden="true">02</span> Guide your exercise
              </li>
              <li>
                <span aria-hidden="true">03</span> Review your progress
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
