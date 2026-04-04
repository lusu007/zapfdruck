# 🍺 Zapfdruck Rechner

Ein moderner, performanter Bierzapfdruck-Rechner für optimale Ergebnisse beim Zapfen von Bier. Entwickelt mit den neuesten Web-Technologien und optimiert für beste Benutzererfahrung.

## ✨ Features

### 🚀 Performance & Technologie

- **Next.js 15** mit App Router für optimale Performance
- **TypeScript** für typsichere Entwicklung
- **Tailwind CSS v4** für modernes, responsives Design
- **Framer Motion** für flüssige Animationen
- **React Hook Form** mit Zod-Validierung
- **Zustand** für effizientes State Management
- **Memoization** für optimale Reaktionszeiten

### 🎨 Benutzerfreundlichkeit

- **Responsive Design** - Funktioniert perfekt auf allen Geräten
- **Dark Mode** - Automatischer Theme-Wechsel
- **Intuitive Bedienung** - 3-Schritt-Prozess für einfache Berechnung
- **Live-Updates** - Sofortige Berechnung bei Eingabeänderungen
- **Visuelle Feedback** - Klare Statusanzeigen und Animationen

### 📊 Präzise Berechnungen

- **Sättigungsdruck** basierend auf Biertemperatur
- **Förderhöhe** - Berücksichtigung der Höhendifferenz
- **Reibungsverluste** - Abhängig von Leitungslänge und -durchmesser
- **Live-Ergebnisse** - Sofortige Anzeige des optimalen Drucks

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React Framework mit App Router
- **TypeScript 5.5** - Typsichere Entwicklung
- **Tailwind CSS v4** - Utility-First CSS Framework
- **Framer Motion** - Animationsbibliothek
- **Lucide React** - Moderne Icons

### State Management & Forms

- **Zustand** - Leichtgewichtiges State Management
- **React Hook Form** - Performante Formulare
- **Zod** - Schema-Validierung
- **@hookform/resolvers** - Form-Validierung

### Development Tools

- **ESLint** - Code-Qualität
- **Prettier** - Code-Formatierung
- **Husky** - Git Hooks
- **lint-staged** - Pre-commit Linting

## 📁 Projektstruktur

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root Layout
│   ├── page.tsx           # Hauptseite
│   └── globals.css        # Globale Styles
├── components/            # React Komponenten
│   ├── forms/            # Formularkomponenten
│   │   ├── IntegratedCalculatorForm.tsx
│   │   ├── PipeParametersInputs.tsx
│   │   └── ValidatedTemperatureSlider.tsx
│   ├── LivePressureResult.tsx
│   ├── PressureTable.tsx
│   ├── ThemeToggle.tsx
│   └── ...
├── hooks/                # Custom React Hooks
│   └── useFormValidation.ts
├── store/               # Zustand Store
│   └── pressureStore.ts
├── types/               # TypeScript Typen
│   └── form-schemas.ts
├── constants/           # Konstanten
│   └── index.ts
└── utils/              # Utility Funktionen
    └── theme.ts
```

## 🚀 Installation & Setup

### Voraussetzungen

- Node.js 24 or newer (see `engines` in `package.json`; use `nvm use` to match [`.nvmrc`](.nvmrc) / CI patch version when possible)
- npm oder yarn

### Installation

1. **Repository klonen**

   ```bash
   git clone <repository-url>
   cd zapfdruck
   ```

2. **Dependencies installieren**

   ```bash
   npm install
   ```

3. **Development Server starten**

   ```bash
   npm run dev
   ```

4. **Browser öffnen**
   ```
   http://localhost:3000
   ```

## 📝 Development

### Verfügbare Scripts

```bash
# Development
npm run dev              # Development Server starten
npm run build           # Produktions-Build erstellen
npm run start           # Produktions-Server starten

# Code Quality
npm run lint            # ESLint ausführen
npm run lint:fix        # ESLint-Fehler automatisch beheben
npm run format          # Prettier Formatierung
npm run format:check    # Prettier-Check
npm run type-check      # TypeScript-Typen prüfen

# Utilities
npm run clean           # Build-Dateien löschen
```

### Performance-Optimierungen

#### Memoization

- **useMemo** für teure Berechnungen
- **useCallback** für Event-Handler
- **React.memo** für Komponenten-Optimierung

#### Code-Splitting

- Automatisches Code-Splitting durch Next.js
- Lazy Loading für nicht-kritische Komponenten

#### Bundle-Optimierung

- Tree Shaking für ungenutzte Imports
- Optimierte Icon-Imports (Lucide React)
- Minimierte Bundle-Größe

## 🎯 Verwendung

### 1. Temperaturbereich wählen

- Wählen Sie den Temperaturbereich Ihres Biers
- Der Sättigungsdruck wird automatisch berechnet

### 2. Leitungsdaten eingeben

- Geben Sie die Leitungslänge ein
- Wählen Sie den Leitungsdurchmesser

### 3. Förderhöhe bestimmen

- Messen Sie die Höhendifferenz zwischen Fass und Zapfhahn
- Geben Sie den Wert in Metern ein

### Ergebnis

Der optimale Zapfdruck wird live berechnet und angezeigt, inklusive:

- Empfohlener Druck
- Druckaufschlüsselung
- Aktuelle Eingabewerte

## 🔧 Konfiguration

### Umgebungsvariablen

```env
# .env.local
NEXT_PUBLIC_APP_NAME=Zapfdruck Rechner
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Tailwind CSS

Das Projekt verwendet Tailwind CSS v4 mit optimierten Konfigurationen für:

- Responsive Design
- Dark Mode
- Custom Animations
- Performance-Optimierungen

## 📊 Performance-Metriken

### Lighthouse Scores

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Bundle-Analyse

- **JavaScript**: < 200KB (gzipped)
- **CSS**: < 50KB (gzipped)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s

## 🤝 Beitragen

### Development Workflow

1. Fork des Repositories
2. Feature-Branch erstellen (`git checkout -b feature/amazing-feature`)
3. Änderungen committen (`git commit -m 'Add amazing feature'`)
4. Branch pushen (`git push origin feature/amazing-feature`)
5. Pull Request erstellen

### Code-Standards

- TypeScript für alle neuen Dateien
- ESLint-Regeln befolgen
- Prettier-Formatierung verwenden
- Unit-Tests für neue Features
- Dokumentation für API-Änderungen

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe [LICENSE](LICENSE) für Details.

## 🙏 Danksagungen

- **Next.js Team** für das fantastische Framework
- **Tailwind CSS** für das CSS-Framework
- **Framer Motion** für die Animationen
- **Lucide** für die Icons

## 📞 Support

Bei Fragen oder Problemen:

- [Issues](https://github.com/your-repo/issues) erstellen
- [Discussions](https://github.com/your-repo/discussions) für Fragen
- Email: support@zapfdruck-rechner.de

---

**Entwickelt mit ❤️ für die Bier-Community**
