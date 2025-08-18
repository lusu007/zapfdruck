# Zapfdruck Rechner

Ein moderner Bierzapfdruck-Rechner für optimale Ergebnisse beim Zapfen von Bier.

## 🚀 Features

- **Moderne Web-Technologien**: Next.js 14, TypeScript, Tailwind CSS
- **Responsive Design**: Funktioniert auf allen Geräten
- **Dark Mode**: Automatischer Theme-Wechsel
- **Präzise Berechnungen**: Basierend auf wissenschaftlichen Formeln
- **Benutzerfreundlich**: Intuitive Bedienung und klare Darstellung

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Sprache**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Form Handling**: React Hook Form
- **Animationen**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📁 Projektstruktur

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root Layout
│   ├── page.tsx        # Hauptseite
│   └── globals.css     # Globale Styles
├── components/         # React Komponenten
│   ├── FormInputs.tsx
│   ├── PressureTable.tsx
│   ├── ResultDisplay.tsx
│   ├── TemperatureSlider.tsx
│   ├── ThemeToggle.tsx
│   └── ExampleCalculation.tsx
├── hooks/             # Custom React Hooks
│   └── useTheme.ts
├── utils/             # Utility Funktionen
│   └── theme.ts
├── store/             # Zustand Store
│   └── pressureStore.ts
├── types/             # TypeScript Typen
│   └── index.ts
└── constants/         # Konstanten
    └── index.ts
```

## 🚀 Installation

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

- `npm run dev` - Development Server starten
- `npm run build` - Produktions-Build erstellen
- `npm run start` - Produktions-Server starten
- `npm run lint` - ESLint ausführen
- `npm run lint:fix` - ESLint-Fehler automatisch beheben
- `npm run format` - Code mit Prettier formatieren
- `npm run format:check` - Formatierung prüfen
- `npm run type-check` - TypeScript-Typen prüfen
- `npm run clean` - Build-Ordner löschen

### Code-Qualität

Das Projekt verwendet:

- **ESLint** für Code-Linting
- **Prettier** für Code-Formatierung
- **TypeScript** für Typsicherheit
- **Husky** für Git Hooks
- **lint-staged** für Pre-commit Checks

### Commit-Konventionen

- `feat:` Neue Features
- `fix:` Bug-Fixes
- `docs:` Dokumentation
- `style:` Code-Formatierung
- `refactor:` Code-Refactoring
- `test:` Tests
- `chore:` Build-Tools, Dependencies

## 🧮 Berechnungsmethodik

Der Zapfdruck wird basierend auf folgenden Faktoren berechnet:

1. **Sättigungsdruck**: Abhängig von der Biertemperatur
2. **Förderhöhe**: 0,1 bar pro Meter Höhenunterschied
3. **Reibungsverluste**: Abhängig vom Leitungsdurchmesser
   - 4mm: 0,72 bar/m
   - 7mm: 0,05 bar/m
   - 10mm: 0,01 bar/m

### Formel

```
Zapfdruck = Sättigungsdruck + Förderhöhe + Reibungsverluste
```

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.

## ⚠️ Haftungsausschluss

Es wird keine Gewähr über die Richtigkeit der berechneten Werte übernommen. Die Ergebnisse dienen nur als Orientierungshilfe.
