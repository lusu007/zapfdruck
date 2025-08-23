# Cloudflare Workers Deployment Guide

Diese Anleitung beschreibt die Migration von Cloudflare Pages zu Cloudflare Workers mit OpenNext.

> **Hinweis**: Diese Implementierung folgt der offiziellen Cloudflare Dokumentation: [Next.js auf Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)

## Warum OpenNext?

OpenNext ist die offizielle Lösung von Cloudflare für Next.js-Anwendungen auf Cloudflare Workers. Es bietet:

- **Bessere Performance**: Optimierte Builds für die Workers Runtime
- **Vollständige Next.js-Unterstützung**: Alle Next.js-Features werden unterstützt
- **Einfache Migration**: Automatische Konfiguration und Build-Optimierung
- **Offizielle Unterstützung**: Von Cloudflare empfohlen und dokumentiert

## Voraussetzungen

- Node.js 20+ installiert
- Cloudflare Account
- Wrangler CLI installiert: `npm install -g wrangler`

## Installation

1. **OpenNext installieren:**

   ```bash
   npm install @opennextjs/cloudflare@latest
   ```

2. **Wrangler als Dev-Dependency:**
   ```bash
   npm install -D wrangler@latest
   ```

## Konfiguration

### 1. OpenNext Config (`open-next.config.ts`)

```typescript
import { defineCloudflareConfig } from '@opennextjs/cloudflare';

export default defineCloudflareConfig();
```

### 2. Wrangler Config (`wrangler.toml`)

```toml
name = "zapfdruck"
main = ".open-next/worker.js"
compatibility_date = "2024-12-01"
compatibility_flags = ["nodejs_compat"]

[assets]
directory = ".open-next/assets"
binding = "ASSETS"

[env.production]
name = "zapfdruck"

[env.preview]
name = "zapfdruck-preview"

[vars]
ENVIRONMENT = "production"
```

### 3. Package.json Scripts

```json
{
  "scripts": {
    "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
    "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
    "deploy:preview": "opennextjs-cloudflare build && opennextjs-cloudflare deploy --env preview",
    "cf:typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts"
  }
}
```

## Entwicklung

### Lokale Entwicklung

```bash
npm run dev
```

Verwendet den Next.js Development Server für beste Developer Experience.

### Preview mit Workers Runtime

```bash
npm run preview
```

Baut die App und startet sie lokal mit der Workers Runtime für genaue Produktionssimulation.

## Deployment

### 1. Authentifizierung

```bash
npm run cf:login
```

### 2. Deployment

```bash
# Production
npm run deploy

# Preview Environment
npm run deploy:preview
```

### 3. TypeScript Types generieren (optional)

```bash
npm run cf:typegen
```

## Automatisierte Deployment mit GitHub Actions

### 1. Cloudflare API Token erstellen

1. Gehe zu [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Klicke auf "Create Token"
3. Wähle "Custom token" Template
4. Setze folgende Berechtigungen:
   - **Account**: Workers Scripts (Edit)
   - **Zone**: Workers Routes (Edit)
5. Speichere den Token

### 2. GitHub Secrets konfigurieren

1. Gehe zu deinem GitHub Repository
2. Klicke auf "Settings" → "Secrets and variables" → "Actions"
3. Erstelle folgende Secrets:
   - `CLOUDFLARE_API_TOKEN`: Dein Cloudflare API Token

### 3. GitHub Actions Workflow

Der Workflow (`.github/workflows/deploy.yml`) wird automatisch ausgeführt:

```yaml
name: Deploy to Cloudflare Workers

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run type check
        run: npm run type-check

      - name: Run linting
        run: npm run lint

      - name: Deploy to Cloudflare Workers
        if: github.ref == 'refs/heads/main'
        run: npm run deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}

      - name: Deploy to Preview Environment
        if: github.event_name == 'pull_request'
        run: npm run deploy:preview
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

### 4. Workflow-Verhalten

- **Push zu main**: Automatisches Deployment zu Production
- **Pull Request**: Automatisches Deployment zu Preview Environment
- **Automatische Tests**: Type-Check und Linting vor jedem Deployment

## Build-Prozess

OpenNext führt folgende Schritte aus:

1. **Next.js Build**: Standard Next.js Build-Prozess
2. **Bundle Generation**: Optimierung für Workers Runtime
3. **Asset Processing**: Statische Assets werden optimiert
4. **Worker Generation**: Erstellt `.open-next/worker.js`
5. **Deployment**: Upload zu Cloudflare Workers

## Vorteile gegenüber der vorherigen Lösung

- **Offizielle Unterstützung**: Von Cloudflare empfohlen
- **Bessere Performance**: Optimierte Builds für Workers
- **Einfachere Konfiguration**: Weniger manuelle Konfiguration nötig
- **Zukunftssicher**: Regelmäßige Updates und Verbesserungen
- **Vollständige Next.js-Features**: Alle Features werden unterstützt

## Troubleshooting

### Build-Fehler

- Stelle sicher, dass `nodejs_compat` Flag aktiviert ist
- Überprüfe die Next.js Version (15.4.7 wird unterstützt)

### Deployment-Fehler

- Authentifizierung überprüfen: `npm run cf:whoami`
- Wrangler Version überprüfen: `wrangler --version`
- GitHub Secrets überprüfen: API Token korrekt gesetzt?

### GitHub Actions Probleme

- Workflow-Logs in GitHub Actions überprüfen
- API Token Berechtigungen überprüfen
- Branch-Name überprüfen (muss `main` sein)

### Performance-Optimierungen

- OpenNext optimiert automatisch für Workers
- Caching wird automatisch konfiguriert
- Assets werden komprimiert und optimiert

## Nächste Schritte

1. **Custom Domain**: Domain in Cloudflare Dashboard konfigurieren
2. **Environment Variables**: Sensitive Daten als Secrets setzen
3. **Monitoring**: Cloudflare Analytics aktivieren
4. **Branch Protection**: GitHub Branch Protection Rules aktivieren

**Hinweis**: Diese Migration bietet eine solide Grundlage für zukünftige Erweiterungen und bessere Performance im Vergleich zu Cloudflare Pages.
