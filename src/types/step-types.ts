import { ReactNode } from 'react';

export interface StepConfig {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
  borderColor: string;
}

export interface StepProps {
  step: StepConfig;
  isActive: boolean;
  isCompleted: boolean;
  children: ReactNode;
  className?: string;
}

export interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onNext: () => void;
  onPrevious: () => void;
  nextButtonText?: string;
  previousButtonText?: string;
  showResultButton?: boolean;
  onShowResult?: () => void;
  className?: string;
}

export interface StepIndicatorProps {
  steps: StepConfig[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

export type StepStatus = 'pending' | 'active' | 'completed';
