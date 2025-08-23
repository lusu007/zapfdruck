'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Beer, ArrowRight } from 'lucide-react';
import IntegratedCalculatorForm from '@/components/forms/IntegratedCalculatorForm';
import LivePressureResult from '@/components/LivePressureResult';

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isResultHighlighted, setIsResultHighlighted] = useState(false);

  // Memoized step indicators
  const stepIndicators = useMemo(() => [1, 2, 3], []);

  const handleStepChange = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  const handleCalculationComplete = useCallback(
    (_data: Record<string, unknown>) => {
      // Handle calculation completion
    },
    []
  );

  const handleScrollToCalculator = useCallback(() => {
    const element = document.getElementById('calculator-form');
    if (element) {
      const navbarHeight = 80;
      const sectionTitleHeight = 200;
      const elementPosition =
        element.offsetTop - navbarHeight - sectionTitleHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleScrollToResult = useCallback(() => {
    const element = document.getElementById('live-pressure-result');
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.offsetTop - navbarHeight - 20;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });

      // Trigger highlight animation
      setIsResultHighlighted(true);

      // Reset highlight after animation completes
      setTimeout(() => {
        setIsResultHighlighted(false);
      }, 1000);
    }
  }, []);

  // Memoized step status
  const getStepStatus = useCallback(
    (step: number) => {
      if (step < currentStep || (step === 3 && currentStep === 4)) {
        return 'completed';
      }
      if (step === currentStep) {
        return 'active';
      }
      return 'pending';
    },
    [currentStep]
  );

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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-40"
        >
          <div className="max-w-4xl mx-auto px-4">
            {/* Hero Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl shadow-lg">
                <Beer className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Optimaler Druck für Ihr Zapfsystem
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-6 max-w-2xl mx-auto">
              Berechnen Sie den perfekten Druck für Ihr Bierzapfsystem in nur 3
              einfachen Schritten
            </p>
            <p className="text-lg text-slate-500 dark:text-slate-500 leading-relaxed mb-8 max-w-3xl mx-auto">
              Unser professioneller Rechner berücksichtigt Temperatur,
              Förderhöhe und Leitungslänge für präzise Ergebnisse. Perfekt für
              Brauereien, Gastronomie und Hobby-Brauer.
            </p>

            {/* Call to Action */}
            <motion.button
              onClick={handleScrollToCalculator}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <span>Jetzt berechnen</span>
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent mb-16" />

        {/* Calculator Section */}
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Druck berechnen
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Füllen Sie die Felder Schritt für Schritt aus
            </p>
          </motion.div>

          {/* Step Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center mb-8 px-4"
          >
            <div className="flex items-center gap-2 sm:gap-4 max-w-full overflow-hidden">
              {stepIndicators.map((step, index) => (
                <div key={step} className="flex items-center flex-shrink-0">
                  <div className="flex flex-col items-center gap-1 sm:gap-2">
                    <button
                      onClick={() => {
                        // Only allow navigation to completed steps or the current step
                        if (
                          getStepStatus(step) === 'completed' ||
                          getStepStatus(step) === 'active'
                        ) {
                          setCurrentStep(step);
                        }
                      }}
                      className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all ${
                        getStepStatus(step) === 'completed'
                          ? 'bg-blue-500 border-blue-500 text-white shadow-lg hover:bg-blue-600 hover:shadow-xl cursor-pointer'
                          : getStepStatus(step) === 'active'
                            ? 'bg-blue-500 border-blue-500 text-white shadow-lg cursor-pointer'
                            : 'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                      }`}
                      disabled={getStepStatus(step) === 'pending'}
                      title={
                        getStepStatus(step) === 'completed'
                          ? `Zurück zu Schritt ${step}`
                          : getStepStatus(step) === 'active'
                            ? `Aktueller Schritt ${step}`
                            : `Schritt ${step} noch nicht verfügbar`
                      }
                    >
                      <span className="font-semibold text-base sm:text-lg">
                        {step}
                      </span>
                    </button>
                  </div>
                  {index < stepIndicators.length - 1 && (
                    <div
                      className={`w-8 sm:w-12 md:w-20 h-1 mx-2 sm:mx-4 md:mx-6 transition-colors ${
                        getStepStatus(step) === 'completed'
                          ? 'bg-blue-500'
                          : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div
            id="calculator-form"
            className="grid grid-cols-1 xl:grid-cols-4 gap-8"
          >
            {/* Main Calculator Column */}
            <div className="xl:col-span-3">
              <IntegratedCalculatorForm
                onComplete={handleCalculationComplete}
                onStepChange={handleStepChange}
                currentStep={currentStep}
                onShowResult={handleScrollToResult}
              />
            </div>

            {/* Sidebar - Live Results Only */}
            <div>
              {/* Live Pressure Result */}
              <LivePressureResult isHighlighted={isResultHighlighted} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center space-y-4 sm:space-y-6">
            {/* Logo and Title */}
            <div className="flex items-center justify-center gap-2">
              <div className="p-2 bg-amber-500 rounded-lg">
                <Beer className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Zapfdruck Rechner
              </h3>
            </div>

            {/* Disclaimer */}
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-500 max-w-2xl mx-auto px-4">
                Es wird keine Gewähr über Richtigkeit der Werte übernommen! Die
                Berechnungen basieren auf allgemeinen Formeln und können je nach
                spezifischen Bedingungen variieren.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs text-slate-500 dark:text-slate-500">
              <span className="hidden sm:inline">Wir ❤️ Open Source</span>
              <span className="hidden sm:inline">•</span>
              <a
                href="https://github.com/lusu007/zapfdruck"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors flex items-center gap-1"
                title="View on GitHub"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Copyright - At the very bottom */}
        <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                © {new Date().getFullYear()} Scelus Development (Lukas Jost)
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
