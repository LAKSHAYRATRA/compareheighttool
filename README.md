# CompareHeightTool (compareheighttool.com)

A high-performance, responsive visual height comparison web application built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **HTML5 Canvas**.

Designed to rank globally for high-volume search queries related to height comparisons, scale models, celebrity stature matchups, couples differences, and architectural object benchmarks.

---

## 🌟 Key Features

- **Interactive Precision Canvas**:
  - Drag-and-drop silhouette reordering with real-time collision dynamics.
  - Realistic gender/body outlines (Male, Female, Child, Object markers).
  - Dual measurement display (Metric `cm` and Imperial `ft / in`).
  - High-resolution architectural-grade PNG visual chart export with custom watermark.
- **Multilingual Native SEO (6 Locales)**:
  - English (`en`), Spanish (`es`), German (`de`), French (`fr`), Portuguese (`pt`), and Japanese (`ja`).
  - Automated bidirectional `hreflang` alternate tags and `x-default`.
  - Canonical URLs on all 199+ static pages.
- **Rich Structured Data (Schema.org)**:
  - `WebApplication` schema with 4.9/5 star aggregate ratings.
  - `BreadcrumbList`, `FAQPage`, `Article`, `Organization`, `WebSite`, and `CollectionPage` structured markups.
- **100% Client-Side Privacy**:
  - No server-side tracking of user inputs or personal measurements.
  - High Core Web Vitals performance with zero layout shifts.

---

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Typography**: Google Fonts (`Newsreader`, `Plus Jakarta Sans`, `JetBrains Mono`)
- **Icons**: Lucide React
- **Canvas Effects**: canvas-confetti, HTML5 Canvas 2D

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Start production server
npm run start
```

---

## 🌐 Deployment (Netlify)

This project is configured out-of-the-box for Netlify deployment via `netlify.toml`:
1. Connect your GitHub repository to [Netlify](https://app.netlify.com/).
2. Netlify will auto-detect Next.js:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
3. Click **Deploy Site**.

