# Rhythmic Beat Dance Court (RBDC)

> **"Let ur body speak"** — A Yuvraaj's Dance School  
> Founded in 2004 by Artistic Director & Choreographer Master Yuvraaj Jayakumar.

A single-page, light studio home experience designed with architectural precision, scroll-linked portal dynamics, and a physical throwable dance card deck.

---

## 🎨 Design Philosophy & Architecture

- **Ground & Ink:** `#F8FAFD` light ground, `#EAF1FB` secondary ground, `#10203A` deep navy ink, and `#4A5B78` secondary ink.
- **Accents:** Vibrant orange (`#F28C1E`) and royal blue (`#1E5BB8`) taken directly from the official logo. Accents are strictly reserved for typographic highlights, rules, and indicator dots.
- **Button Rule:** The only filled button across the entire interface is the single navy pill in the navigation bar. All other CTAs utilize hair-line borders (`rgba(16, 32, 58, 0.14)`).
- **Shadows:** No glow or shadow effects anywhere except for the physical dance cards in the throwable card deck.
- **Typography:** Display titles rendered in **Syne** (600–800) with tight tracking (`-0.025em`), balanced by **Sora** (400–600) for body and wide-tracked uppercase labels (`0.14em`).

---

## 🏛️ Sections Overview

1. **Navigation Bar (Fixed 58px):** Translucent backdrop blur (14px), hairline rule, logo, navigation anchors, single navy pill CTA, and responsive mobile drawer (< 820px).
2. **The Portal Hero:** A 2.5-viewport (`250vh`) sticky stage with dual parting ground panels, settling full-bleed photography, duotone wash, and a signature wordmark that scales while letter-spacing tightens and halves separate horizontally. 100% scroll-reversible.
3. **Statement Fold (Philosophy):** Large clamp typography with orange accent phrase (*"Dance is for every body."*), outlined stroke index numeral (`01`), and a floating circular dancer photograph with scroll drift and rotation.
4. **Dance Styles & Throwable Card Deck:** Two-column layout with headline/lede and a tactile card deck featuring mouse pointer capture, physical drag physics, flick-to-throw gesture, touch support (`touch-action: pan-y`), and keyboard arrow controls.
5. **Academy Roster:** Hairline-ruled rows with uppercase orange tags (`KIDS`, `TEENS`, `ADULTS`, `LADIES`, `CLASSICAL`, `TROUPE`), display names, mentors, and cohort details.
6. **Weekly Schedule:** Complete studio timetable with filter tabs, uppercase hairline headers, display font class names, and responsive narrow two-column row collapse.
7. **Close & Footer:** Direct WhatsApp / Call CTAs, directory of 4 verified branches (Valasaravakkam, Kolapakkam, Ambattur, Pondicherry), Instagram link (`@rhythmicbeatdancecourt`), and full-width bottom wordmark cropped by the viewport edge.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Launch
```bash
# Navigate to the client directory
cd client

# Install dependencies (if not already installed)
npm install

# Start Vite development server
npm run dev
```

The application will be served locally (typically at `http://localhost:5173` or `http://localhost:5174`).

### Production Build & Preview
```bash
# Compile and bundle
npm run build

# Preview production build locally
npm run preview
```

---

## ✏️ How to Edit Content & Data Files

All copy, batch schedules, styles, and contact details are completely decoupled from UI components and stored in typed files under `/src/data/`:

| Data File | Description & Contents |
|---|---|
| [`src/data/navigation.ts`](file:///d:/TechN%20Projects/Rhythmic_Beat/client/src/data/navigation.ts) | Nav anchor links, labels, and top pill button target |
| [`src/data/hero.ts`](file:///d:/TechN%20Projects/Rhythmic_Beat/client/src/data/hero.ts) | Tagline, scroll prompt, wordmark halves ("RHYTHMIC", "BEAT"), and subtitle |
| [`src/data/statement.ts`](file:///d:/TechN%20Projects/Rhythmic_Beat/client/src/data/statement.ts) | Index numeral, label, creed text, and orange accent highlight phrase |
| [`src/data/styles.ts`](file:///d:/TechN%20Projects/Rhythmic_Beat/client/src/data/styles.ts) | 6 confirmed dance disciplines, descriptions, intensity tags, and images |
| [`src/data/roster.ts`](file:///d:/TechN%20Projects/Rhythmic_Beat/client/src/data/roster.ts) | Cohorts, category tags, batch names, mentor credits, and age ranges |
| [`src/data/schedule.ts`](file:///d:/TechN%20Projects/Rhythmic_Beat/client/src/data/schedule.ts) | Timetable rows: days, times, skill levels, and branch locations |
| [`src/data/close.ts`](file:///d:/TechN%20Projects/Rhythmic_Beat/client/src/data/close.ts) | Contact numbers, WhatsApp link, email, Instagram handle, and 4 branch addresses |

### Adding a New Style Card:
Open [`src/data/styles.ts`](file:///d:/TechN%20Projects/Rhythmic_Beat/client/src/data/styles.ts) and add an entry to the `cards` array:
```ts
{
  id: "folk-fusion",
  name: "Folk Fusion",
  tag: "TRADITIONAL & CONTEMPORARY",
  summary: "Energetic regional beats combined with modern footwork.",
  image: customImg,
  details: {
    intensity: "High Energy",
    focus: "Rhythm & Agility",
    mentor: "Master Faculty",
  },
}
```

### Updating Batches or Timetable:
Open [`src/data/schedule.ts`](file:///d:/TechN%20Projects/Rhythmic_Beat/client/src/data/schedule.ts) and modify or append entries in `rows`.

---

## 📱 Responsive Testing Matrix

The layout is tested and verified at:
- **360px** (Mobile compact): Zero horizontal overflow (`scrollWidth <= innerWidth`), menu toggle, stacked 2-col schedule rows, touch-enabled card deck.
- **768px** (Tablet portrait): Medium layout transitions, full touch gestures, compact roster rows.
- **1024px** (Tablet landscape / Laptop): Side-by-side styles and deck, expanded timetable.
- **1440px+** (Desktop wide): Full portal stage kinematics, generous typography clamp, and edge-cropped footer wordmark.
