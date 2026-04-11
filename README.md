# Writer Portfolio — Astro

A clean, typographic portfolio site for writers. Built with [Astro](https://astro.build), deployable to GitHub Pages or Cloudflare Pages.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs to dist/
npm run preview    # preview the built site locally
```

---

## Personalising the site

### 1. Your name & details

Find and replace `Jane Doe` across the project with your own name. Key files:

| File | What to change |
|------|---------------|
| `src/layouts/BaseLayout.astro` | Nav logo, footer name, social links |
| `src/pages/index.astro` | Hero tagline, bio blurb, publications list |
| `src/pages/about.astro` | Bio paragraphs, agent details, sidebar info |
| `src/pages/contact.astro` | Email address, social links |
| `astro.config.mjs` | `site:` URL |

### 2. Your photo

Drop your photo at `public/photo.jpg` (or `.png`, `.webp`), then in `src/pages/about.astro` replace the placeholder `<div>` with:

```astro
<img
  src="/photo.jpg"
  alt="Jane Doe"
  style="width:100%; border-radius:2px; border:1px solid var(--color-border);"
/>
```

### 3. Adding a new piece of writing

**Option A — Single Astro page (recommended for long pieces you host yourself)**

1. Copy `src/pages/writing/quiet-tyranny-productivity.astro`
2. Rename it to `src/pages/writing/your-piece-slug.astro`
3. Update the frontmatter object and write your content in the `.prose` section

**Option B — External link (for work published elsewhere)**

In `src/pages/writing/index.astro`, add an entry to the `pieces` array and point `href` to the external URL:

```ts
{
  slug:        '',                              // not needed for external links
  title:       'My new essay',
  excerpt:     'A short description.',
  publication: 'The Guardian',
  date:        '2025-01',
  genre:       'Essay',
  href:        'https://theguardian.com/...',   // external URL
},
```

Then in the card template, change `href={'/writing/' + piece.slug}` to `href={piece.href}`.

### 4. Accent colour

The accent is forest green (`#2d5016`) in light mode and `#7ab648` in dark mode. To change it, edit the two CSS custom properties in `src/styles/global.css`:

```css
:root {
  --color-accent:    #2d5016;   /* ← light mode accent */
  --color-accent-lt: #edf3e8;   /* ← light mode accent tint (backgrounds) */
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-accent:    #7ab648;  /* ← dark mode accent */
    --color-accent-lt: #1e2a14;  /* ← dark mode accent tint */
  }
}
```

### 5. Fonts

The site uses system serif (`Georgia`) by default — no web font requests, so it loads instantly. To add a web font, import it in `src/layouts/BaseLayout.astro` inside `<head>`, then update `--font-serif` in `global.css`.

---

## Deployment

### Cloudflare Pages (recommended — fastest, free tier generous)

1. Push the repo to GitHub
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages** → **Create a project**
3. Connect your GitHub repo
4. Set build settings:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**

Cloudflare will deploy on every push to `main` automatically.

**Custom domain**: In Cloudflare Pages → your project → **Custom domains** → add your domain. DNS is managed automatically if your domain is already on Cloudflare.

---

### GitHub Pages

The repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

1. Push to GitHub
2. Go to your repo → **Settings** → **Pages**
3. Under **Source**, choose **GitHub Actions**
4. Push a commit to `main` — the action builds and deploys automatically

**If your repo is not at the root** (e.g. `https://username.github.io/my-repo/`), set `base` in `astro.config.mjs`:

```js
export default defineConfig({
  base: '/my-repo',   // ← must match your repo name exactly
  output: 'static',
  site: 'https://username.github.io/my-repo',
});
```

---

## Project structure

```
writer-portfolio/
├── public/
│   ├── favicon.svg
│   └── photo.jpg          ← add your photo here
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro    ← nav, footer, <head>
│   ├── pages/
│   │   ├── index.astro         ← homepage
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── publications.astro
│   │   ├── 404.astro
│   │   └── writing/
│   │       ├── index.astro     ← writing list
│   │       └── quiet-tyranny-productivity.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tsconfig.json
├── wrangler.toml              ← Cloudflare Pages config
└── package.json
```

---

## Adding an RSS feed (optional)

```bash
npm install @astrojs/rss
```

Create `src/pages/rss.xml.ts`:

```ts
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  return rss({
    title: 'Jane Doe',
    description: 'Essays, fiction, and criticism.',
    site: context.site!,
    items: [
      {
        title: 'The quiet tyranny of productivity',
        pubDate: new Date('2024-03-01'),
        description: 'How hustle culture colonised our imagination.',
        link: '/writing/quiet-tyranny-productivity',
      },
      // add more items here
    ],
  });
}
```

The footer already has an RSS link pointing to `/rss.xml`.
