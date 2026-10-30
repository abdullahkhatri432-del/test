import { Activity, Info, Move, Sparkles, Target } from 'lucide-react'
import { clinic } from '../config/clinic'
import SectionHeader from './SectionHeader'
import therapyImage from '../assets/images/manual-therapy.jpg'
import therapyImageSmall from '../assets/images/manual-therapy-640.jpg'
import './About.css'

const pillars = [
  {
    icon: Move,
    title: 'Mobility',
    text: 'Easing stiffness and restoring comfortable range of movement.',
  },
  {
    icon: Activity,
    title: 'Strength',
    text: 'Rebuilding control and capacity through progressive exercise.',
  },
  {
    icon: Target,
    title: 'Function',
    text: 'Practising the everyday movements that matter to you.',
  },
  {
    icon: Sparkles,
    title: 'Confidence',
    text: 'Supporting a steady, informed return to activity.',
  },
]

export function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <div className="about__media" data-reveal>
          <div className="about__frame">
            <img
              src={therapyImage}
              srcSet={`${therapyImageSmall} 640w, ${therapyImage} 1000w`}
              sizes="(max-width: 960px) 88vw, 40vw"
              alt="A physiotherapist guiding a patient's shoulder through a supported stretch during a one-to-one session"
              width="1000"
              height="1500"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about__focus">
            <p className="about__focus-label">Focus areas</p>
            <ul className="about__focus-chips">
              {['Movement', 'Strength', 'Daily function'].map((item) => (
                <li key={item} className="chip chip--mint">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="about__content" data-reveal style={{ '--reveal-delay': '120ms' }}>
          <SectionHeader
            eyebrow="About the clinic"
            title={
              <>
                Physiotherapy that starts with <em>how you move</em>
              </>
            }
          />

          <p className="lead">
            Physiotherapy looks at movement as a whole — helping people restore mobility, build
            strength and return to everyday activity after injury, surgery or a period of pain.
            Rehabilitation is the structure around it: assessment, guided exercise and regular
            review.
          </p>

          <p>
            {clinic.name} is a physiotherapy and rehabilitation practice in Surat, Gujarat. Care is
            planned around each person’s movement goals, and may combine hands-on techniques,
            exercise therapy and practical guidance for daily life — always following an assessment
            and the advice of your treating clinician.
          </p>

          <ul className="about__pillars">
            {pillars.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className="about__pillar-icon" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ul>

          {clinic.isDemo ? (
            <p className="about__note">
              <Info aria-hidden="true" />
              <span>
                Clinic history, team qualifications and facility details are not invented for this
                preview. They will be added once verified with the clinic.
              </span>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default About
