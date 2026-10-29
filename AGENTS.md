# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page photography portfolio for "JD Gallery" (Dan), plus one gallery page per category. Astro 7 + Tailwind CSS v4, fully static. Requires Node >= 22.12.0. Design direction: minimal, light, mobile-first; two fonts only (Cormorant Garamond for headings, Plus Jakarta Sans for everything else).

## Commands

- `npm run dev` — dev server (when starting it yourself, use background mode: `astro dev --background`; manage with `astro dev stop`, `astro dev status`, `astro dev logs`)
- `npm run build` — static build to `dist/` (first build optimizes ~70 large photos and takes about a minute; later builds use the cache)
- `npm run preview` — serve the built site
- `npx prettier --write "src/**/*.{astro,ts,css}"` — format (4-space indent, `prettier-plugin-astro`)

There is no test suite or linter.

## Architecture

- **Shared data:** `src/data/site.ts` holds the brand name, email, Instagram handle, nav items and the gallery list. Change contact details there, not in components.
- **Galleries:** each folder in `src/assets/work/<slug>/` is a gallery. `site.ts` globs the folders and joins them with the `galleryInfo` entries (title, description, cover filename). `src/pages/work/[slug].astro` generates one page per gallery with a masonry grid and a `<dialog>` lightbox. To add a gallery, add a folder of photos plus a `galleryInfo` entry.
- **Layout:** `src/layouts/Base.astro` has the `<head>` (meta tags, Google Fonts link), Navbar and Footer. Every page wraps its content in it.
- **Home page:** `src/pages/index.astro` stacks section components from `src/components/`. Section copy (services, reviews) lives as arrays in each component's frontmatter. The reviews are placeholders on purpose; keep the section visible.
- **Images:** all photos are in `src/assets/` and go through `astro:assets` (`<Image>`/`getImage`). Always pass both `widths` and `width` to `<Image>`. Without `width`, Astro emits a full-size (6000px) fallback. Only favicons live in `public/`.
- **Client JS:** a few small inline `<script>`s (mobile menu, lightbox, contact form). No framework islands.
- **Contact form:** there's no backend. Submitting opens the visitor's email app with the message pre-filled (`mailto:`). To switch to a form service, set the form's `action` and remove the script in `Contact.astro`.

## Styling

Tokens and shared utilities live in `src/styles/global.css` (there is no `tailwind.config`):
- `@theme` defines the colors `paper`, `card`, `line`, `ink`, `ink-muted` and the fonts `font-sans`/`font-serif`.
- `@utility` defines `container-x` (page width and gutters), `section-y` (section padding), `eyebrow` (small uppercase label) and `heading` (section title).

Use these instead of one-off sizes so sections stay consistent.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
