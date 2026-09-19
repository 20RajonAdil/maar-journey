
# MAAR Journey — The Biography of MD Adil Rajon

A cinematic, single-page digital biography telling the life story of **MD Adil Rajon** — a British Bangladeshi student and self-taught web developer. The site traces a journey from Sylhet, Bangladesh to Birmingham, England, through chapters on faith, education, challenges, and vision for the future.

**Live site:** _add your Vercel URL here once deployed_

## About This Project

MAAR Journey is a personal biography site designed and built by MD Adil Rajon. It combines editorial-style typography, full-bleed photography, and scroll-based animation to present a life story as a series of chapters — from childhood in Sylhet, to arrival in the UK, to the projects and ideas that define the author's work today.

## Tech Stack

- **Vite** — build tooling
- **TypeScript** — type safety
- **React 18** — UI framework
- **Tailwind CSS** — styling
- **shadcn/ui** — component primitives
- **Framer Motion** — scroll and page animation
- **React Router** — routing

## Getting Started

Requires [Node.js](https://nodejs.org/) and npm.

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate into the project directory
cd MAAR-Journy

# Install dependencies
npm install

# Start the local development server
npm run dev
```

The site will be available at `http://localhost:8080`.

### Build for production

```sh
npm run build
```

Output is generated in the `dist/` folder.

## Deployment

This project is configured to deploy on [Vercel](https://vercel.com) with zero additional setup:

1. Push this repository to GitHub.
2. Import the repository into Vercel.
3. Vercel auto-detects the Vite framework preset — no custom build configuration needed.
4. Deploy.

A `vercel.json` is included to correctly handle client-side routing on refresh/deep links.

## Project Structure

```
src/
  components/     Page sections (Hero, Biography, Journey, Education, etc.)
  components/ui/  Reusable shadcn/ui primitives
  hooks/          Custom React hooks
  pages/          Route-level pages
public/
  images/         Biography photography assets
```

## Author

**MD Adil Rajon**
British Bangladeshi student and self-taught web developer.

## License

Copyright © 2026 MD Adil Rajon. All rights reserved.

See [LICENSE](./LICENSE) for full terms.

## Offline support

This app works fully offline as a PWA — it caches itself for offline use automatically, no manual download step required.
