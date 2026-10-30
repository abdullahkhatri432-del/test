import { Award, GraduationCap, Stethoscope } from 'lucide-react'
import SectionHeader from './SectionHeader'
import './Team.css'

const practitioners = [
  {
    name: 'Dr. Arjun Mehta',
    role: 'Lead Physiotherapist',
    qualification: 'DPT (USA), MPT (Orthopedics)',
    experience: '12+ years',
    focus: 'Orthopedic & Sports Rehabilitation',
    bio: 'Specialises in post-surgical rehabilitation, sports injury recovery and movement analysis for active individuals and desk workers.',
  },
  {
    name: 'Dr. Priya Shah',
    role: 'Neurological Physiotherapist',
    qualification: 'DPT, Certified Neuro Rehab Specialist',
    experience: '8+ years',
    focus: 'Neurological & Post-Stroke Mobility',
    bio: 'Provides patient-centered balance, gait and functional movement support with family involvement and home adaptation guidance.',
  },
  {
    name: 'Rahul Desai',
    role: 'Exercise & Rehabilitation Therapist',
    qualification: 'BPT (Surat), Sports Rehab Certified',
    experience: '6+ years',
    focus: 'Exercise Therapy & Home Visits',
    bio: 'Builds progressive exercise plans and conducts home-based sessions for patients with mobility or travel difficulties.',
  },
]

export function Team() {
  return (
    <section id="team" className="section team" aria-labelledby="team-title">
      <div className="container">
        <SectionHeader
          eyebrow="Our Team"
          title={
            <>
              Practitioners you can <em>trust</em>
            </>
          }
          lead="Experienced, qualified physiotherapists with focused training in orthopedic, neurological and sports rehabilitation."
        />

        <div className="team__grid">
          {practitioners.map((p) => (
            <article key={p.name} className="team__card" data-reveal>
              <div className="team__avatar" aria-hidden="true">
                <Stethoscope size={32} />
              </div>
              <h3 className="team__name">{p.name}</h3>
              <p className="team__role">{p.role}</p>
              <div className="team__meta">
                <span><Award size={14} aria-hidden="true" /> {p.qualification}</span>
                <span><GraduationCap size={14} aria-hidden="true" /> {p.experience}</span>
              </div>
              <p className="team__focus">{p.focus}</p>
              <p className="team__bio">{p.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
