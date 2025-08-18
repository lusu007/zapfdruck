'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Settings,
  Calculator,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Zap,
} from 'lucide-react';
import { useFormValidation } from '@/hooks/useFormValidation';
import {
  pressureCalculationSchema,
  PressureCalculationFormData,
} from '@/types/form-schemas';

import SystemParametersInputs from './SystemParametersInputs';
import ValidatedTemperatureSlider from './ValidatedTemperatureSlider';
import PressureTable from '../PressureTable';
import ResultDisplay from '../ResultDisplay';
import { usePressureStore } from '@/store/pressureStore';
import { toast } from 'react-hot-toast';
import { useFieldValidation } from '@/hooks/useFormValidation';

interface IntegratedCalculatorFormProps {
  onComplete?: (data: PressureCalculationFormData) => void;
}

export default function IntegratedCalculatorForm({
  onComplete,
}: IntegratedCalculatorFormProps) {
  const { setForm } = usePressureStore();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useFormValidation<PressureCalculationFormData>({
    schema: pressureCalculationSchema,
    defaultValues: {
      temperatureRange: [10, 12],
      height: 0,
      length: 0,
      thickness: 0.01,
    },
    onSuccess: async data => {
      setIsSubmitting(true);
      try {
        setForm(data);
        toast.success('Berechnung erfolgreich durchgeführt!');
        setCurrentStep(3);
        onComplete?.(data);
      } catch (error) {
        toast.error(
          'Fehler bei der Berechnung. Bitte versuchen Sie es erneut.'
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    onError: _errors => {
      // Handle validation errors
    },
  });

  const { control, formState } = form;
  const { errors } = formState;

  // Field validation states
  const temperatureValidation = useFieldValidation(form, 'temperatureRange');
  const heightValidation = useFieldValidation(form, 'height');
  const lengthValidation = useFieldValidation(form, 'length');
  const thicknessValidation = useFieldValidation(form, 'thickness');

  const canProceedToStep2 = temperatureValidation.isValid;
  const canProceedToStep3 =
    heightValidation.isValid &&
    lengthValidation.isValid &&
    thicknessValidation.isValid;

  const handleStep1Complete = () => {
    if (canProceedToStep2) {
      setCurrentStep(2);
      toast.success('Temperaturbereich festgelegt!');
      // Scroll to step 2
      setTimeout(() => {
        const step2Element = document.getElementById('step-2');
        step2Element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      toast.error('Bitte wählen Sie einen gültigen Temperaturbereich.');
    }
  };

  const handleStep2Complete = () => {
    if (canProceedToStep3) {
      setCurrentStep(3);
      toast.success('Systemparameter festgelegt!');
      // Scroll to step 3
      setTimeout(() => {
        const step3Element = document.getElementById('step-3');
        step3Element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      toast.error('Bitte füllen Sie alle erforderlichen Felder aus.');
    }
  };

  const handleGoBack = (targetStep: number) => {
    setCurrentStep(targetStep);
    // Scroll to target step
    setTimeout(() => {
      const targetElement = document.getElementById(`step-${targetStep}`);
      targetElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleStep3Complete = () => {
    if (form.isFormValid && form.isFormDirty) {
      form.onSubmit();
      toast.success('Berechnung gestartet!');
    } else {
      toast.error('Bitte überprüfen Sie Ihre Eingaben.');
    }
  };

  const getStepStatus = (step: number) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className="space-y-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        {[1, 2, 3].map(step => (
          <div key={step} className="flex items-center">
            <button
              onClick={() => {
                if (
                  getStepStatus(step) === 'completed' ||
                  getStepStatus(step) === 'active'
                ) {
                  handleGoBack(step);
                }
              }}
              disabled={getStepStatus(step) === 'pending'}
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                getStepStatus(step) === 'completed'
                  ? 'bg-green-500 border-green-500 text-white shadow-lg hover:bg-green-600 cursor-pointer'
                  : getStepStatus(step) === 'active'
                    ? 'bg-blue-500 border-blue-500 text-white shadow-lg cursor-pointer'
                    : 'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
              }`}
            >
              {getStepStatus(step) === 'completed' ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <span className="font-semibold text-lg">{step}</span>
              )}
            </button>
            {step < 3 && (
              <div
                className={`w-20 h-1 mx-3 transition-all duration-300 ${
                  getStepStatus(step) === 'completed'
                    ? 'bg-green-500'
                    : 'bg-slate-300 dark:bg-slate-600'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Temperature Selection */}
      <motion.div
        id="step-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border transition-all ${
          currentStep === 1
            ? 'border-blue-200 dark:border-blue-700'
            : currentStep > 1
              ? 'border-green-200 dark:border-green-700 opacity-75'
              : 'border-slate-200/50 dark:border-slate-700/50'
        }`}
      >
        <div
          className={`px-6 py-4 transition-all rounded-t-2xl ${
            currentStep === 1
              ? 'bg-gradient-to-r from-blue-500 to-blue-600'
              : currentStep > 1
                ? 'bg-gradient-to-r from-green-500 to-green-600'
                : 'bg-gradient-to-r from-slate-400 to-slate-500'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Schritt 1: Sättigungsdruck
                </h3>
                <p className="text-white/80 text-sm">
                  Temperatur und Drucktabelle
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {currentStep > 1 && (
                <CheckCircle className="w-5 h-5 text-green-300" />
              )}
              {currentStep === 1 && temperatureValidation.isValid && (
                <CheckCircle className="w-5 h-5 text-green-300" />
              )}
              {currentStep === 1 && temperatureValidation.hasError && (
                <AlertCircle className="w-5 h-5 text-red-300" />
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PressureTable />
            <ValidatedTemperatureSlider
              control={control}
              name="temperatureRange"
              showValidation
            />
          </div>

          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex justify-end"
            >
              <button
                onClick={handleStep1Complete}
                disabled={!canProceedToStep2}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  canProceedToStep2
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Weiter zu Schritt 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Step 2: System Parameters */}
      <motion.div
        id="step-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border transition-all ${
          currentStep === 2
            ? 'border-green-200 dark:border-green-700'
            : currentStep > 2
              ? 'border-green-200 dark:border-green-700 opacity-75'
              : currentStep < 2
                ? 'border-slate-200/50 dark:border-slate-700/50 opacity-50'
                : 'border-slate-200/50 dark:border-slate-700/50'
        }`}
      >
        <div
          className={`px-6 py-4 transition-all rounded-t-2xl ${
            currentStep === 2
              ? 'bg-gradient-to-r from-green-500 to-green-600'
              : currentStep > 2
                ? 'bg-gradient-to-r from-green-500 to-green-600'
                : 'bg-gradient-to-r from-slate-400 to-slate-500'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Schritt 2: Systemparameter
                </h3>
                <p className="text-white/80 text-sm">
                  Förderhöhe und Leitungslänge
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {currentStep > 2 && (
                <CheckCircle className="w-5 h-5 text-green-300" />
              )}
              {currentStep === 2 && canProceedToStep3 && (
                <CheckCircle className="w-5 h-5 text-green-300" />
              )}
              {currentStep === 2 && Object.keys(errors).length > 0 && (
                <AlertCircle className="w-5 h-5 text-red-300" />
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <SystemParametersInputs control={control} form={form} />

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex justify-between"
            >
              <button
                onClick={() => handleGoBack(1)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück zu Schritt 1</span>
              </button>
              <button
                onClick={handleStep2Complete}
                disabled={!canProceedToStep3}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  canProceedToStep3
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Weiter zu Schritt 3</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Step 3: Calculation */}
      <motion.div
        id="step-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border transition-all ${
          currentStep === 3
            ? 'border-indigo-200 dark:border-indigo-700'
            : currentStep < 3
              ? 'border-slate-200/50 dark:border-slate-700/50 opacity-50'
              : 'border-slate-200/50 dark:border-slate-700/50'
        }`}
      >
        <div
          className={`px-6 py-4 transition-all rounded-t-2xl ${
            currentStep === 3
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600'
              : 'bg-gradient-to-r from-slate-400 to-slate-500'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Schritt 3: Ergebnis
                </h3>
                <p className="text-white/80 text-sm">Optimaler Zapfdruck</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {currentStep === 3 && form.isFormValid && (
                <CheckCircle className="w-5 h-5 text-green-300" />
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <ResultDisplay />

          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex justify-between"
            >
              <button
                onClick={() => handleGoBack(2)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Zurück zu Schritt 2</span>
              </button>
              <button
                onClick={handleStep3Complete}
                disabled={!form.isFormValid || isSubmitting}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  form.isFormValid && !isSubmitting
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Berechne...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Berechnung starten</span>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
