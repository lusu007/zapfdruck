import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, TrendingUp } from 'lucide-react';
import { StepNavigationProps } from '@/types/step-types';

export default function StepNavigation({
  currentStep,
  totalSteps,
  canProceed,
  onNext,
  onPrevious,
  nextButtonText = 'Weiter',
  previousButtonText = 'Zurück',
  showResultButton = false,
  onShowResult,
  className = '',
}: StepNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-6 flex ${isFirstStep ? 'justify-end' : 'justify-between'} ${className}`}
    >
      {!isFirstStep && (
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{previousButtonText}</span>
        </button>
      )}

      {!isLastStep && !showResultButton && (
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            canProceed
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>{nextButtonText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}

      {showResultButton && onShowResult && (
        <button
          onClick={onShowResult}
          disabled={!canProceed}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            canProceed
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Ergebnis anzeigen</span>
        </button>
      )}
    </motion.div>
  );
}
