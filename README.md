# Wellness Physiotherapy & Rehabilitation Center — Demo Website

A premium, responsive demo website for a physiotherapy and rehabilitation clinic in Surat,
Gujarat. Built with **React + Vite + JavaScript (JSX)** and **Lucide** icons.

> **This is a demo.** The clinic's phone number, WhatsApp number, address, opening hours, map
> link, team details and service availability have **not** been verified. The site labels these
> as pending rather than inventing them. The appointment form does not send or store anything.

---

## Quick start

Requires **Node.js 20.19+** or **22.12+** (Vite 8 requirement) and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Production build
npm run build

# 4. Preview the production build (http://localhost:4173)
npm run preview

# Optional: lint
npm run lint
```

---

## What's included

| Area | Notes |
| --- | --- |
| Demo bar + badges | Persistent "Demo website" label in the top bar, navbar and footer, plus `noindex` metadata |
| Navbar | Sticky, blurs on scroll, active-section highlight, accessible mobile drawer (Escape, scroll lock, focus return) and appointment CTA |
| Hero | Exact headline "Move Better. Recover Stronger. Live Healthier.", primary/secondary CTAs, care-pathway card, responsive `srcset` image |
| About | General physiotherapy explanation, focus areas, honesty note about unverified clinic details |
| Services | 8 config-driven cards with category labels, **accessible detail dialogs** (native `<dialog>` with focus trap), and "Enquire" prefill |
| Why choose us | Dark teal section, four care principles, explicit no-guarantee note |
| How it works | Contact → discuss → confirm, with a note that nothing books automatically |
| FAQ | 6 accessible `<details>` questions about referrals, first visits, home visits and booking |
| Appointment enquiry | Client-side validation, date bounds (+90 days), sensitive-data warning, **WhatsApp message preview + copy**, demo-only result panel |
| Contact | Clearly labelled placeholders for phone/WhatsApp/address/hours/map + map artwork |
| Mobile action bar | Sticky Contact + Book Appointment actions on small screens, safe-area aware |
| Floating WhatsApp | Real `wa.me` link only when a verified number exists; otherwise an explanatory pending panel (desktop) |
| SEO | Descriptive title/description, Open Graph/Twitter cards, 1200×630 social image, config-generated `Physiotherapy` JSON-LD |
| Footer | Navigation, care areas, contact placeholders, medical disclaimer, image credit |

All business information is centralised in [`src/config/clinic.js`](src/config/clinic.js).
FAQ copy lives in [`src/data/faqs.js`](src/data/faqs.js).

### Intentionally not included

No booking engine, payments, patient portal, medical records, prices, staff profiles, reviews,
testimonials, awards, recovery timelines or success rates. Those need verified clinic input and
a separate scope.

---

## Project structure

```
public/
  favicon.svg              Brand favicon
  og-image.png             Social sharing card (1200×630)
src/
  assets/
    fonts/                 Self-hosted Fraunces + Manrope (no runtime Google Fonts requests)
    images/                Optimised Pexels placeholder photography (+ responsive variants)
  components/              One component + colocated CSS per section
    icons/WhatsAppIcon.jsx Custom WhatsApp glyph (Lucide has no brand icon)
    ServiceDialog.jsx      Native <dialog> service detail sheet
    Faq.jsx                Accessible FAQ accordion
    MobileActionBar.jsx    Sticky mobile quick actions
    StructuredData.jsx     JSON-LD generated from config
  config/clinic.js         Clinic name, contacts, hours, maps, services, form behaviour
  data/
    navigation.js          Shared nav + footer links
    faqs.js                FAQ questions and answers
  hooks/useScrollReveal.js IntersectionObserver reveal, respects reduced motion
  lib/
    validation.js          Form validation + date helpers
    contact.js             tel/WhatsApp links + enquiry message builder
    clipboard.js           Clipboard API with legacy fallback
  styles/tokens.css        Design tokens (colour, type, spacing, radii, shadows)
  styles/base.css          Reset, typography, buttons, utilities, @font-face
```

---

## Configuration for the clinic owner

Open `src/config/clinic.js` and replace the placeholders:

| Field | Purpose | Example |
| --- | --- | --- |
| `phone.value` / `phone.verified` | Clickable clinic phone + mobile action bar call button | `'+91 261 234 5678'`, `true` |
| `whatsapp.value` / `whatsapp.verified` | Enables the real floating WhatsApp link and WhatsApp enquiry mode | `'+91 98765 43210'`, `true` |
| `address.lines` | Address lines shown on the contact card and in JSON-LD | `['2nd Floor, ...', 'Ring Road', 'Surat, Gujarat 395002']` |
| `hours.rows` / `hours.verified` | Opening hours (one row per range) | `[{ days: 'Mon – Sat', time: '9:00 – 19:00' }]` |
| `mapsUrl` | Verified Google Maps share link | `'https://maps.app.goo.gl/...'` |
| `services[].enabled` | Show/hide a service card | `false` removes the card |
| `services[].tag` / `suits` / `includes` / `note` | Service dialog content; review every line with the clinic | — |
| `isDemo` | `false` hides demo labels/disclaimers **only after content is approved** | `false` |
| `appointment.mode` | `'demo'`, `'whatsapp'` or `'endpoint'` | `'demo'` |
| `appointment.maxDaysAhead` | Date picker upper bound | `90` |
| `appointment.endpoint` | HTTPS endpoint for `'endpoint'` mode | `'https://.../api/enquiry'` |

### Enabling real appointment enquiries

The default `appointment.mode` is `'demo'`. It validates locally, then shows exactly what would be
shared — **no network request, no storage**.

**WhatsApp mode** — set a verified `whatsapp.value` and `appointment.mode: 'whatsapp'`. After
validation the form opens `wa.me` with a pre-filled message (name, phone, preferred date, optional
note). The visitor still has to press send inside WhatsApp. Nothing is stored by the website.
`whatsappHref()` in [`src/lib/contact.js`](src/lib/contact.js) normalises Indian numbers to the
`91XXXXXXXXXX` format `wa.me` expects.

**Endpoint mode** — set `appointment.endpoint` and `appointment.mode: 'endpoint'`. The form POSTs:

```json
{
  "name": "…",
  "phone": "…",
  "preferredDate": "YYYY-MM-DD",
  "message": "…",
  "source": "website-enquiry"
}
```

Your server must handle validation, rate limiting/spam protection, a privacy notice, consent and a
retention policy. Never collect medical reports or health details through this form.

> Pop-up blockers can stop the WhatsApp tab. The result panel includes an "Open WhatsApp again"
> link as a fallback.

---

## Launch checklist

Before publishing, confirm with the clinic:

- [ ] Exact clinic name and preferred short name
- [ ] Verified phone, WhatsApp and email (if any)
- [ ] Full address + Google Maps link
- [ ] Opening hours and public holidays
- [ ] Which of the 8 services are actually offered, and the approved wording for every service dialog
- [ ] FAQ answers match clinic policy (referrals, home visits, session expectations)
- [ ] Home-visit availability and coverage area
- [ ] Practitioner names, qualifications, registrations (not included yet)
- [ ] Consent to use any clinic photography (current images are stock placeholders)
- [ ] Insurance / payment information (not included)
- [ ] Local compliance wording for healthcare advertising in Gujarat/India

Then:

- [ ] Set `isDemo: false`
- [ ] Set `appointment.mode` and verify the full enquiry journey on a real phone
- [ ] Update the title, description and OG/Twitter copy in `index.html` to remove "Demo Website"
- [ ] Review `src/data/faqs.js` — especially the booking answer — and any remaining demo wording
- [ ] Remove `<meta name="robots" content="noindex, nofollow">` from `index.html`
- [ ] Make the OG/Twitter image URL absolute in `index.html` (e.g. `https://your-domain/og-image.png`)
- [ ] Replace the placeholder OG image and favicon if the clinic has a brand kit
- [ ] Add the production domain and, if desired, a sitemap/robots policy
- [ ] Re-run `npm run lint` and `npm run build`
- [ ] Test on iOS Safari, Android Chrome and a desktop browser

---

## Deployment

The build output is a static site in `dist/`.

**Netlify** — build command `npm run build`, publish directory `dist`.

**Vercel** — framework preset "Vite", build `npm run build`, output `dist`.

**GitHub Pages** — add the repository base path to `vite.config.js`:

```js
export default defineConfig({
  base: '/repository-name/',
  plugins: [react()],
})
```

There are no routes or server requirements, so no SPA rewrite rules are needed. For an
`appointment.mode: 'endpoint'` deployment, host the endpoint separately (serverless function or
clinic CRM) and keep its URL in config — never embed secrets in the frontend.

---

## Accessibility & performance notes

- Semantic landmarks, one `h1`, ordered heading hierarchy, skip link and visible focus states.
- Service details use native `<dialog>`: browser-managed focus trap, Escape close, backdrop click,
  and focus returned to the triggering card.
- FAQ uses native `<details>/<summary>`; keyboard-operable without custom key handling.
- Form: labelled inputs, `aria-invalid`, `aria-describedby` error links, `role="alert"` errors,
  focus moved to the first invalid field, focus moved to the result heading, and a copy fallback
  for browsers without the Clipboard API.
- Mobile menu, dialog and WhatsApp popover support Escape and scroll locking; the pending WhatsApp
  control is hidden on small screens where the quick-action bar already offers contact + booking.
- Motion is disabled under `prefers-reduced-motion`.
- Fonts are self-hosted woff2 (latin subset); hero image is eager/high priority, remaining images
  lazy-load with `srcset`/`sizes` and intrinsic dimensions to reduce layout shift.
- No analytics, cookies or third-party scripts; only `react`, `react-dom` and `lucide-react` are
  bundled.
- Verified with Playwright at 1440×900, 1000×800, 834×1112 and 390×844, plus axe-core WCAG 2.1
  A/AA checks (0 violations on desktop, mobile and the service dialog).

---

## Imagery

Placeholder photography from [Pexels](https://www.pexels.com) (free-to-use license). These are
demonstration images only and should be replaced with the clinic's own photography before launch.

- Rehabilitation session — Karola G, Pexels #6111589
- Shoulder mobilisation — Karola G, Pexels #4506074
- Resistance band exercise — Karola G, Pexels #4506168

Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces) and
[Manrope](https://fonts.google.com/specimen/Manrope), licensed under the SIL Open Font License.
