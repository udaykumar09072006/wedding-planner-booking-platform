# VendorHub — Wedding Vendor Marketplace

VendorHub connects engaged couples with top wedding service providers (venues, photographers, caterers, florists, makeup artists, DJs, and wedding planners).

---

## Deploying to Vercel

This project is configured and verified for 1-click deployment to **Vercel**.

### Method 1: Deploy with Git & Vercel Dashboard (Recommended)

1. Push this repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to [vercel.com/new](https://vercel.com/new) and log in.
3. Import your repository.
4. Vercel will automatically detect the settings from `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **Deploy**. Your site will be live on a `*.vercel.app` domain in seconds!

### Method 2: Deploy with Vercel CLI

In your terminal:

```bash
# 1. Install or run Vercel CLI
npx vercel

# 2. Follow the interactive prompts to link and deploy
# 3. For production release:
npx vercel --prod
```

---

## Configuration Files Added

- `vercel.json`: Handles client-side SPA route rewrites to `/index.html` for smooth navigation across all tabs and routes.
- `package.json`: Contains production `npm run build` script with Vite.
- `dist/`: Pre-verified production bundle built with `npm run build`.

---

## Features

- **Vendor Discovery & Search**: Multi-criteria search by category, city, and keywords.
- **Category-Based Filtering**: Venues, Photographers, Caterers, Florists, Makeup, DJs, Planners.
- **Detailed Profiles**: Rich photo gallery, itemized pricing packages, live availability calendar, and verified reviews.
- **Booking System**: Transparent fee calculation with simulated payment gateway (Cards, UPI, Consultation).
- **Vendor Comparison**: Side-by-side comparison matrix for up to 4 vendors.
- **Dual Dashboards**: Dedicated Couple Planner view (bookings, countdown, budget, checklist) and Vendor Partner portal (inquiries, listing editor, calendar management).
