import { useState } from 'react'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'
import manualImg from '../assets/images/manual-therapy.jpg'
import manualThumb from '../assets/images/manual-therapy-640.jpg'
import rehabImg from '../assets/images/hero-rehabilitation.jpg'
import rehabThumb from '../assets/images/hero-rehabilitation-800.jpg'
import exerciseImg from '../assets/images/exercise-therapy.jpg'
import exerciseThumb from '../assets/images/exercise-therapy-640.jpg'
import './Gallery.css'

const images = [
  { src: manualImg, thumb: manualThumb, alt: 'Manual therapy session — hands-on rehabilitation treatment.', caption: 'Manual Therapy', desc: 'Hands-on clinical treatment for joint and muscle recovery.' },
  { src: rehabImg, thumb: rehabThumb, alt: 'Rehabilitation session in a modern clinic space.', caption: 'Rehabilitation', desc: 'Guided recovery work in our Surat clinic.' },
  { src: exerciseImg, thumb: exerciseThumb, alt: 'Exercise therapy and guided strength work.', caption: 'Exercise Therapy', desc: 'Progressive strength and mobility programmes.' },
  { src: manualImg, thumb: manualThumb, alt: 'Therapist guiding posture and mobility work.', caption: 'Posture & Mobility', desc: 'Desk-related stiffness and postural assessment.' },
  { src: rehabImg, thumb: rehabThumb, alt: 'Post-surgery mobility support with family guidance.', caption: 'Post-Surgery Care', desc: 'Coordinated rehabilitation after orthopaedic procedures.' },
  { src: exerciseImg, thumb: exerciseThumb, alt: 'Home visit exercise setup using available space.', caption: 'Home Sessions', desc: 'In-home assessments for clients with travel difficulty.' },
]

export function Gallery() {
  const [open, setOpen] = useState(null)

  const prev = () => setOpen((o) => (o === null ? 0 : o === 0 ? images.length - 1 : o - 1))
  const next = () => setOpen((o) => (o === null ? 0 : o === images.length - 1 ? 0 : o + 1))

  return (
    <section id="gallery" className="section gallery" aria-label="Clinic gallery">
      <div className="container">
        <h2 className="gallery__title">Inside the Clinic</h2>
        <p className="gallery__lead">A look at our rehabilitation space, therapy sessions and guided exercise work.</p>

        <div className="gallery__grid">
          {images.map((img, idx) => (
            <button
              key={img.caption + idx}
              className={`gallery__item ${idx === 0 ? 'gallery__item--featured' : ''}`}
              onClick={() => setOpen(idx)}
              aria-label={`Open ${img.caption}`}
              data-reveal
              style={{ '--reveal-delay': `${idx * 60}ms` }}
            >
              <img src={img.thumb} alt={img.alt} loading="lazy" />
              <div className="gallery__caption-box">
                <h3>{img.caption}</h3>
                <p>{img.desc}</p>
              </div>
              <span className="gallery__overlay" aria-hidden="true">
                <ZoomIn size={22} />
              </span>
            </button>
          ))}
        </div>

        {open !== null && (
          <div className="gallery__lightbox" role="dialog" aria-modal="true" aria-label={images[open].caption} onClick={() => setOpen(null)}>
            <button className="gallery__close" onClick={() => setOpen(null)} aria-label="Close image"><X size={22} /></button>
            <button className="gallery__nav gallery__nav--prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous image"><ChevronLeft size={28} /></button>
            <button className="gallery__nav gallery__nav--next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next image"><ChevronRight size={28} /></button>
            <img src={images[open].src} alt={images[open].alt} onClick={(e) => e.stopPropagation()} />
            <div className="gallery__lightbox-info">
              <h3>{images[open].caption}</h3>
              <p>{images[open].desc}</p>
              <span className="gallery__lightbox-counter">{open + 1} / {images.length}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery
