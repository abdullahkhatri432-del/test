import { useState, useEffect, useRef } from 'react'
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  Search,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  SlidersHorizontal,
  MessageSquarePlus,
  X,
  Quote,
  ShieldCheck,
  Sparkles,
  Info,
  RotateCcw,
  Check,
  Play,
  Pause,
} from 'lucide-react'
import {
  testimonialCategories,
  initialTestimonials,
  clinicRatingStats,
} from '../data/testimonials'
import './Testimonials.css'

export function Testimonials() {
  const [testimonials, setTestimonials] = useState(() => {
    try {
      const saved = localStorage.getItem('wellness_physio_user_reviews')
      if (saved) {
        const parsed = JSON.parse(saved)
        return [...parsed, ...initialTestimonials]
      }
    } catch {
      // Ignore storage errors
    }
    return initialTestimonials
  })

  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('carousel') // 'carousel' | 'grid'
  const [sortBy, setSortBy] = useState('helpful') // 'helpful' | 'newest'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Track helpful upvotes in local storage
  const [votedHelpful, setVotedHelpful] = useState(() => {
    try {
      const saved = localStorage.getItem('wellness_physio_voted_reviews')
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  // Review Form state
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    location: '',
    category: 'orthopedic',
    condition: '',
    rating: 5,
    quote: '',
    content: '',
  })

  const autoplayTimerRef = useRef(null)

  // Filter and Sort testimonials
  const filteredTestimonials = testimonials
    .filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.condition.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.quote.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)

      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === 'helpful') {
        return (b.helpfulCount || 0) - (a.helpfulCount || 0)
      }
      return b.id.localeCompare(a.id)
    })

  // Reset slider index when filter changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [activeCategory, searchQuery])

  // Autoplay functionality for carousel
  useEffect(() => {
    if (viewMode !== 'carousel' || !isAutoplay || filteredTestimonials.length <= 1) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current)
      return
    }

    autoplayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length)
    }, 6000)

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current)
    }
  }, [viewMode, isAutoplay, filteredTestimonials.length])

  const handleNext = () => {
    if (filteredTestimonials.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length)
  }

  const handlePrev = () => {
    if (filteredTestimonials.length === 0) return
    setCurrentIndex((prev) =>
      prev === 0 ? filteredTestimonials.length - 1 : prev - 1,
    )
  }

  const handleHelpfulClick = (id) => {
    if (votedHelpful[id]) return

    const updatedVoted = { ...votedHelpful, [id]: true }
    setVotedHelpful(updatedVoted)
    try {
      localStorage.setItem('wellness_physio_voted_reviews', JSON.stringify(updatedVoted))
    } catch {
      // ignore
    }

    setTestimonials((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, helpfulCount: (item.helpfulCount || 0) + 1 }
          : item,
      ),
    )
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingSelect = (rating) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.content) return

    const categoryObj = testimonialCategories.find(
      (c) => c.id === formData.category,
    )

    const newReview = {
      id: `user-rev-${Date.now()}`,
      name: formData.name.trim(),
      role: formData.role.trim() || 'Patient',
      location: formData.location.trim() || 'Surat',
      category: formData.category,
      categoryLabel: categoryObj ? categoryObj.label : 'General',
      rating: Number(formData.rating),
      date: 'Just now',
      verified: true,
      condition: formData.condition.trim() || 'Physiotherapy & Mobility',
      quote:
        formData.quote.trim() ||
        formData.content.trim().slice(0, 80) + '...',
      content: formData.content.trim(),
      highlight: 'Submitted by patient',
      helpfulCount: 1,
    }

    const updated = [newReview, ...testimonials]
    setTestimonials(updated)

    try {
      const userSubmitted = updated.filter((item) =>
        item.id.startsWith('user-rev-'),
      )
      localStorage.setItem(
        'wellness_physio_user_reviews',
        JSON.stringify(userSubmitted),
      )
    } catch {
      // ignore
    }

    setSubmitSuccess(true)
    setTimeout(() => {
      setSubmitSuccess(false)
      setIsModalOpen(false)
      setFormData({
        name: '',
        role: '',
        location: '',
        category: 'orthopedic',
        condition: '',
        rating: 5,
        quote: '',
        content: '',
      })
    }, 1800)
  }

  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        {/* Section Header */}
        <div className="testimonials__head">
          <div className="testimonials__head-badge">
            <Sparkles className="testimonials__head-icon" />
            <span>Patient Experiences</span>
          </div>
          <h2>
            Real recovery stories from <em>our patients</em>
          </h2>
          <p className="testimonials__lead">
            Hear how individualised physiotherapy, structured exercise and compassionate care helped
            people in Surat regain confidence in their movement.
          </p>
        </div>

        {/* Rating Summary Banner */}
        <div className="testimonials__summary-card">
          <div className="testimonials__summary-main">
            <div className="testimonials__summary-score">
              <span className="testimonials__summary-number">
                {clinicRatingStats.average}
              </span>
              <div className="testimonials__summary-stars-wrap">
                <div className="testimonials__stars" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="testimonials__star testimonials__star--filled" />
                  ))}
                </div>
                <span className="testimonials__summary-count">
                  Based on <strong>{clinicRatingStats.totalReviews}+ Google reviews</strong>
                </span>
              </div>
            </div>

            <div className="testimonials__summary-badges">
              <div className="testimonials__badge">
                <ShieldCheck className="testimonials__badge-icon" />
                <div>
                  <strong>{clinicRatingStats.recommendationRate} Positive</strong>
                  <span>Satisfaction feedback</span>
                </div>
              </div>

              <div className="testimonials__badge">
                <CheckCircle2 className="testimonials__badge-icon" />
                <div>
                  <strong>Verified Care</strong>
                  <span>Individualised plans</span>
                </div>
              </div>
            </div>
          </div>

          <div className="testimonials__summary-actions" />
        </div>

        {/* Controls & Search Toolbar */}
        <div className="testimonials__controls">
          {/* Category Tabs */}
          <div
            className="testimonials__categories"
            role="tablist"
            aria-label="Filter reviews by treatment category"
          >
            {testimonialCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`testimonials__category-btn ${
                  activeCategory === cat.id ? 'is-active' : ''
                }`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search, Sort & Layout Switcher */}
          <div className="testimonials__toolbar">
            {/* Search Input */}
            <div className="testimonials__search-box">
              <Search className="testimonials__search-icon" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by condition or keyword..."
                aria-label="Search reviews"
                className="testimonials__search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="testimonials__search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <X />
                </button>
              )}
            </div>

            {/* Sort selector */}
            <div className="testimonials__select-wrap">
              <SlidersHorizontal className="testimonials__select-icon" aria-hidden="true" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="testimonials__select"
                aria-label="Sort testimonials"
              >
                <option value="helpful">Most Helpful</option>
                <option value="newest">Recent First</option>
              </select>
            </div>

            {/* Layout Toggle (Carousel vs Grid) */}
            <div className="testimonials__view-toggle" role="group" aria-label="View mode">
              <button
                type="button"
                className={`testimonials__toggle-btn ${
                  viewMode === 'carousel' ? 'is-active' : ''
                }`}
                onClick={() => setViewMode('carousel')}
                title="Carousel View"
                aria-label="Carousel View"
              >
                <Quote aria-hidden="true" />
              </button>
              <button
                type="button"
                className={`testimonials__toggle-btn ${
                  viewMode === 'grid' ? 'is-active' : ''
                }`}
                onClick={() => setViewMode('grid')}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials Display Area */}
        {filteredTestimonials.length === 0 ? (
          <div className="testimonials__empty">
            <p>No testimonials match your filter or search terms.</p>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => {
                setActiveCategory('all')
                setSearchQuery('')
              }}
            >
              <RotateCcw aria-hidden="true" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : viewMode === 'carousel' ? (
          /* Carousel View */
          <div
            className="testimonials__carousel-wrapper"
            onMouseEnter={() => setIsAutoplay(false)}
            onMouseLeave={() => setIsAutoplay(true)}
          >
            <div className="testimonials__carousel-stage">
              {filteredTestimonials.map((item, idx) => {
                const isActive = idx === currentIndex
                return (
                  <div
                    key={item.id}
                    className={`testimonials__slide ${isActive ? 'is-active' : ''}`}
                    aria-hidden={!isActive}
                  >
                    {isActive && (
                      <TestimonialCard
                        item={item}
                        votedHelpful={!!votedHelpful[item.id]}
                        onHelpfulClick={() => handleHelpfulClick(item.id)}
                      />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Carousel Controls Footer */}
            <div className="testimonials__carousel-nav">
              <div className="testimonials__carousel-arrows">
                <button
                  type="button"
                  className="testimonials__nav-btn"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft />
                </button>

                <button
                  type="button"
                  className="testimonials__autoplay-btn"
                  onClick={() => setIsAutoplay(!isAutoplay)}
                  title={isAutoplay ? 'Pause auto-sliding' : 'Play auto-sliding'}
                  aria-label={isAutoplay ? 'Pause auto-sliding' : 'Play auto-sliding'}
                >
                  {isAutoplay ? <Pause size={16} /> : <Play size={16} />}
                </button>

                <button
                  type="button"
                  className="testimonials__nav-btn"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                >
                  <ChevronRight />
                </button>
              </div>

              {/* Dots */}
              <div className="testimonials__dots">
                {filteredTestimonials.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`testimonials__dot ${
                      index === currentIndex ? 'is-active' : ''
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <span className="testimonials__slide-counter">
                {currentIndex + 1} / {filteredTestimonials.length}
              </span>
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="testimonials__grid">
            {filteredTestimonials.map((item) => (
              <TestimonialCard
                key={item.id}
                item={item}
                votedHelpful={!!votedHelpful[item.id]}
                onHelpfulClick={() => handleHelpfulClick(item.id)}
              />
            ))}
          </div>
        )}

        {/* Responsible Medical Disclaimer */}
        <p className="testimonials__disclaimer">
          <Info aria-hidden="true" />
          <span>
            Testimonials represent individual patient experiences and outcomes. Recovery timelines
            and treatment results vary depending on medical diagnosis, consistency of exercise, and
            personal clinical response.
          </span>
        </p>
      </div>

        {/* Responsible Medical Disclaimer */}
    </section>
  )
}

/** Individual Testimonial Card Component */
function TestimonialCard({ item, votedHelpful, onHelpfulClick }) {
  const getInitials = (name) => {
    if (!name) return 'PT'
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  return (
    <article className="testimonial-card">
      <div className="testimonial-card__header">
        <div className="testimonial-card__user">
          <div className="testimonial-card__avatar" aria-hidden="true">
            {getInitials(item.name)}
          </div>
          <div>
            <h3 className="testimonial-card__name">{item.name}</h3>
            <p className="testimonial-card__meta">
              {item.role} {item.location ? `• ${item.location}` : ''}
            </p>
          </div>
        </div>

        <div className="testimonial-card__header-badges">
          {item.verified && (
            <span className="testimonial-card__verified">
              <CheckCircle2 size={13} aria-hidden="true" />
              Verified Patient
            </span>
          )}
        </div>
      </div>

      <div className="testimonial-card__rating-row">
        <div className="testimonials__stars" aria-label={`${item.rating} out of 5 stars`}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`testimonials__star ${
                i < item.rating ? 'testimonials__star--filled' : ''
              }`}
            />
          ))}
        </div>
        <span className="testimonial-card__tag">{item.categoryLabel}</span>
      </div>

      {item.condition && (
        <div className="testimonial-card__condition">
          <span className="testimonial-card__condition-label">Condition:</span>{' '}
          {item.condition}
        </div>
      )}

      <blockquote className="testimonial-card__quote">
        &ldquo;{item.quote}&rdquo;
      </blockquote>

      <p className="testimonial-card__content">{item.content}</p>

      {item.highlight && (
        <div className="testimonial-card__highlight">
          <Sparkles size={14} className="testimonial-card__highlight-icon" />
          <span>{item.highlight}</span>
        </div>
      )}

      <div className="testimonial-card__footer">
        <span className="testimonial-card__date">{item.date}</span>

        <button
          type="button"
          className={`testimonial-card__helpful-btn ${votedHelpful ? 'is-voted' : ''}`}
          onClick={onHelpfulClick}
          disabled={votedHelpful}
          aria-label={`Mark review as helpful. Currently ${item.helpfulCount || 0} votes.`}
        >
          <ThumbsUp size={14} />
          <span>
            {votedHelpful ? 'Helpful' : 'Helpful?'} ({item.helpfulCount || 0})
          </span>
        </button>
      </div>
    </article>
  )
}

export default Testimonials
