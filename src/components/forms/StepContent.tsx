import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock } from 'lucide-react';
import { StepProps } from '@/types/step-types';

interface StepContentProps extends StepProps {}

export default function StepContent({
  step,
  isActive,
  isCompleted,
  children,
  className = '',
}: StepContentProps) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border transition-all min-h-[600px] flex flex-col ${
        isActive
          ? step.borderColor
          : isCompleted
            ? step.borderColor + ' opacity-75'
            : step.borderColor + ' opacity-30'
      } ${className}`}
    >
      <div
        className={`px-6 py-4 transition-all rounded-t-2xl ${
          isActive
            ? `bg-gradient-to-r ${step.gradient}`
            : isCompleted
              ? `bg-gradient-to-r ${step.gradient} opacity-75`
              : `bg-gradient-to-r ${step.gradient} opacity-30`
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="text-white/80 text-sm">{step.subtitle}</p>
            </div>
          </div>
          {isCompleted && <CheckCircle className="w-5 h-5 text-white" />}
          {isActive && !isCompleted && <Clock className="w-5 h-5 text-white" />}
        </div>
      </div>

      <div
        className={`p-6 flex-1 flex flex-col ${!isActive ? 'pointer-events-none' : ''}`}
      >
        {children}
      </div>
    </motion.div>
  );
}
