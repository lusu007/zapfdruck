import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock } from 'lucide-react';
import { StepIndicatorProps } from '@/types/step-types';

export default function StepIndicator({
  steps,
  currentStep,
  onStepClick,
  className = '',
}: StepIndicatorProps) {
  const getStepStatus = (stepNumber: number) => {
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className={`flex space-x-4 ${className}`}>
      {steps.map((step, _index) => {
        const status = getStepStatus(step.id);
        const Icon = step.icon;

        return (
          <motion.button
            key={step.id}
            onClick={() => onStepClick?.(step.id)}
            disabled={status === 'pending'}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
              status === 'active'
                ? step.borderColor
                : status === 'completed'
                  ? 'border-green-200 dark:border-green-700'
                  : 'border-slate-200/50 dark:border-slate-700/50 opacity-50'
            } ${onStepClick ? 'cursor-pointer hover:scale-105' : 'cursor-default'}`}
            whileHover={onStepClick ? { scale: 1.05 } : {}}
            whileTap={onStepClick ? { scale: 0.95 } : {}}
          >
            <div
              className={`p-2 rounded-lg ${
                status === 'active'
                  ? 'bg-white/20'
                  : status === 'completed'
                    ? 'bg-green-100 dark:bg-green-900/30'
                    : 'bg-slate-100 dark:bg-slate-800'
              }`}
            >
              {status === 'completed' ? (
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              ) : status === 'active' ? (
                <Icon className="w-5 h-5 text-white" />
              ) : (
                <Clock className="w-5 h-5 text-slate-400" />
              )}
            </div>
            <div className="text-left">
              <h3
                className={`text-sm font-semibold ${
                  status === 'active'
                    ? 'text-white'
                    : status === 'completed'
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`text-xs ${
                  status === 'active'
                    ? 'text-white/80'
                    : status === 'completed'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {step.subtitle}
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
