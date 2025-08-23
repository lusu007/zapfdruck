import { BarChart3, Settings } from 'lucide-react';
import { StepConfig } from '@/types/step-types';

export const STEP_CONFIG: StepConfig[] = [
  {
    id: 1,
    title: 'Sättigungsdruck',
    subtitle: 'Temperatur und Drucktabelle',
    icon: BarChart3,
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-200 dark:border-blue-700',
  },
  {
    id: 2,
    title: 'Leitungsdaten',
    subtitle: 'Durchmesser und Länge',
    icon: Settings,
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-200 dark:border-blue-700',
  },
  {
    id: 3,
    title: 'Förderhöhe',
    subtitle: 'Höhendifferenz',
    icon: Settings,
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-200 dark:border-blue-700',
  },
] as const;

export const TOTAL_STEPS = STEP_CONFIG.length;
