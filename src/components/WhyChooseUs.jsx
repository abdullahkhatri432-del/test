import { Footprints, HeartHandshake, Info, ClipboardList, Target } from 'lucide-react'
import exerciseImage from '../assets/images/exercise-therapy.jpg'
import exerciseImageSmall from '../assets/images/exercise-therapy-640.jpg'
import './WhyChooseUs.css'

const reasons = [
  {
    icon: Target,
    title: 'Personalised assessment',
    text: 'Every plan starts with understanding how you move, what you want to get back to, and what your day-to-day demands look like.',
  },
  {
    icon: ClipboardList,
    title: 'Guided exercise',
    text: 'Exercises are taught, checked and progressed with you — not simply handed over on a sheet of paper.',
  },
  {
    icon: Footprints,
    title: 'Functional mobility',
    text: 'Sessions stay connected to real life: walking, climbing stairs, lifting, sitting comfortably and returning to work or sport.',
  },
  {
    icon: HeartHandshake,
    title: 'Patient-centred support',
    text: 'Clear explanations, realistic pacing and room for your questions — so you understand each step of the plan.',
  },
]

export function WhyChooseUs() {
  return (
    <section id="why-us" className="section why">
      <div className="container why__inner">
        <div className="why__head">
          <p className="eyebrow">Why choose us</p>
          <h2>
            Care built around <em>your movement goals</em>
          </h2>
          <p className="why__lead">
            Rehabilitation works best when it is consistent, understood and adjusted as you
            progress. This is the approach this website describes — the clinic will confirm how it
            applies to you in person.
          </p>
        </div>

        <div className="why__grid">
          <ul className="why__list">
            {reasons.map(({ icon: Icon, title, text }, index) => (
              <li key={title} data-reveal style={{ '--reveal-delay': `${index * 70}ms` }}>
                <span className="why__icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>

          <figure className="why__media" data-reveal style={{ '--reveal-delay': '160ms' }}>
            <img
              src={exerciseImage}
              srcSet={`${exerciseImageSmall} 640w, ${exerciseImage} 1200w`}
              sizes="(max-width: 900px) 100vw, 42vw"
              alt="A patient using a resistance band with a physiotherapist guiding the movement"
              width="1200"
              height="800"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span className="why__media-tag">Guided exercise therapy</span>
              <span className="why__media-note">Demo imagery</span>
            </figcaption>
          </figure>
        </div>

        <p className="why__disclaimer">
          <Info aria-hidden="true" />
          <span>
            No recovery timeline, outcome or success rate is promised here. Progress varies from
            person to person, and suitability for any treatment is always discussed with the clinic.
          </span>
        </p>
      </div>
    </section>
  )
}

export default WhyChooseUs
