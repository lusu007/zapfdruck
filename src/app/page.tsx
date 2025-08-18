'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Beer, Zap, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import IntegratedCalculatorForm from '@/components/forms/IntegratedCalculatorForm';
import ExampleCalculation from '@/components/ExampleCalculation';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const [showDetails, setShowDetails] = useState(false);

  const handleCalculationComplete = (_data: Record<string, unknown>) => {
    // Handle calculation completion
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500 rounded-lg">
                <Beer className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  Zapfdruck Rechner
                </h1>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Bierzapfdruck berechnen
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Optimaler Druck für Ihr Zapfsystem
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Berechnen Sie den perfekten Druck für Ihr Bierzapfsystem
            </p>
          </div>
        </motion.div>

        {/* Integrated Calculator Form */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Calculator Column */}
          <div className="xl:col-span-3">
            <IntegratedCalculatorForm onComplete={handleCalculationComplete} />
          </div>

          {/* Sidebar - Example Calculation */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Beispielrechnung
                    </h3>
                    <p className="text-teal-100 text-sm">
                      So funktioniert die Berechnung
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <ExampleCalculation />
              </div>
            </motion.div>

            {/* Collapsible Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
            >
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full bg-gradient-to-r from-slate-500 to-slate-600 px-6 py-4 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Weitere Informationen
                      </h3>
                      <p className="text-slate-100 text-sm">
                        Details zur Berechnung
                      </p>
                    </div>
                  </div>
                  {showDetails ? (
                    <ChevronUp className="w-5 h-5 text-white" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white" />
                  )}
                </div>
              </button>

              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-6 space-y-4"
                >
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      Sättigungsdruck
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Der Sättigungsdruck hängt von der Biertemperatur ab. Pro
                      Grad Celsius steigt der Druck um etwa 0,1 bar.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      Förderhöhe
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Pro Meter Höhenunterschied (Fassboden bis Zapfhahn) werden
                      0,1 bar zusätzlicher Druck benötigt.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      Leitungslänge
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Die Reibungsverluste hängen vom Durchmesser ab: 4mm (0,72
                      bar/m), 7mm (0,05 bar/m), 10mm (0,01 bar/m).
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      Es wird keine Gewähr über Richtigkeit der Werte
                      übernommen!
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-2 bg-amber-500 rounded-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Zapfdruck Rechner
              </h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 max-w-2xl mx-auto">
              Professioneller Bierzapfdruck-Rechner für optimale Ergebnisse
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-500">
              <span>© 2024 Zapfdruck Rechner</span>
              <span>•</span>
              <span>Next.js • TypeScript • Tailwind CSS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
