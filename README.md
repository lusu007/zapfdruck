# Zapfdruck Rechner

Web app to estimate **tap pressure** for draft beer: saturation pressure from temperature, line length and diameter (friction), and lift height.

Stack: **Next.js** (App Router), **TypeScript**, **Tailwind CSS**, **React Hook Form** + **Zod**, **Zustand**, **Framer Motion**. Production build targets **Cloudflare** via [OpenNext](https://opennext.js.org/) (`@opennextjs/cloudflare`).

## Requirements

- **Node.js** ≥ 24 (see `engines` in `package.json`; `.nvmrc` pins a patch version for local/CI alignment)

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

[MIT](LICENSE)
