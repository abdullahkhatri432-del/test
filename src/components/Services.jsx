import { useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  Bandage,
  Bone,
  Brain,
  Dumbbell,
  House,
  Info,
  MessageSquare,
  PersonStanding,
  Trophy,
} from 'lucide-react'
import { clinic } from '../config/clinic'
import SectionHeader from './SectionHeader'
import ServiceDialog from './ServiceDialog'
import './Services.css'

const serviceIcons = {
  bone: Bone,
  activity: Activity,
  dumbbell: Dumbbell,
  trophy: Trophy,
  brain: Brain,
  bandage: Bandage,
  house: House,
  person: PersonStanding,
}

export function Services({ onEnquire }) {
  const services = clinic.enabledServices
  const [activeService, setActiveService] = useState(null)

  return (
    <section id="services" className="section section--tint services">
      <div className="container">
        <div className="services__head">
          <SectionHeader
            eyebrow="Services"
            title={
              <>
                Areas of care, <em>clearly explained</em>
              </>
            }
            lead={
              clinic.isDemo
                ? 'Physiotherapy and rehabilitation cover a wide range of movement concerns. Open any care area to see what an approach may involve — every service and its scope must be confirmed with the clinic before it is advertised.'
                : 'Physiotherapy and rehabilitation cover a wide range of movement concerns. Open any care area to see what an approach may involve, then contact the clinic to discuss whether it is right for you.'
            }
          />
          <p className="services__count" aria-hidden="true">
            {String(services.length).padStart(2, '0')} care areas
          </p>
        </div>

        <ul className="services__grid">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon] ?? Activity

            return (
              <li
                key={service.id}
                className="service-card"
                data-reveal
                style={{ '--reveal-delay': `${Math.min(index, 5) * 60}ms` }}
              >
                <span className="service-card__icon" aria-hidden="true">
                  <Icon />
                </span>
                <p className="service-card__tag">{service.tag}</p>
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__text">{service.description}</p>
                <div className="service-card__actions">
                  <button
                    type="button"
                    className="service-card__details"
                    onClick={() => setActiveService(service)}
                  >
                    View details
                    <ArrowUpRight aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="service-card__enquire"
                    aria-label={`Enquire about ${service.title}`}
                    onClick={() => onEnquire(service.title)}
                  >
                    <MessageSquare aria-hidden="true" />
                    <span>Enquire</span>
                  </button>
                </div>
              </li>
            )
          })}
        </ul>

        {clinic.isDemo ? (
          <p className="services__note" role="note">
            <Info aria-hidden="true" />
            <span>{clinic.servicesNote}</span>
          </p>
        ) : null}
      </div>

      <ServiceDialog
        service={activeService}
        onClose={() => setActiveService(null)}
        onEnquire={onEnquire}
      />
    </section>
  )
}

export default Services
