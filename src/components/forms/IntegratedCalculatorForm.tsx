'use client';

import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Settings,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Clock,
  Info,
  TrendingUp,
} from 'lucide-react';
import { useFormValidation } from '@/hooks/useFormValidation';
import {
  pressureCalculationSchema,
  PressureCalculationFormData,
} from '@/types/form-schemas';

import PipeParametersInputs from './PipeParametersInputs';
import ValidatedTemperatureSlider from './ValidatedTemperatureSlider';

import PressureTable from '../PressureTable';

import { usePressureStore } from '@/store/pressureStore';
import { toast } from 'react-hot-toast';

interface IntegratedCalculatorFormProps {
  onComplete?: (data: PressureCalculationFormData) => void;
  onStepChange?: (step: number) => void;
  currentStep?: number;
  onShowResult?: () => void;
}

// Memoized step configuration
const STEP_CONFIG = [
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

export default function IntegratedCalculatorForm({
  onComplete,
  onStepChange,
  currentStep: externalCurrentStep,
  onShowResult,
}: IntegratedCalculatorFormProps) {
  const { setForm, calculatePressure } = usePressureStore();
  const [internalCurrentStep, setInternalCurrentStep] = React.useState(1);

  // Use external currentStep if provided, otherwise use internal state
  const currentStep = externalCurrentStep ?? internalCurrentStep;

  // Update internal state when external step changes
  React.useEffect(() => {
    if (externalCurrentStep && externalCurrentStep !== internalCurrentStep) {
      setInternalCurrentStep(externalCurrentStep);
    }
  }, [externalCurrentStep, internalCurrentStep]);

  // Update step when internal state changes
  const updateStep = useCallback(
    (newStep: number) => {
      setInternalCurrentStep(newStep);
      onStepChange?.(newStep);
    },
    [onStepChange]
  );

  const form = useFormValidation<PressureCalculationFormData>({
    schema: pressureCalculationSchema,
    defaultValues: {
      temperatureRange: [10, 12],
      height: undefined,
      length: undefined,
      thickness: 0.01,
    },
    onSuccess: async data => {
      onComplete?.(data);
    },
    onError: _errors => {
      // Handle validation errors
    },
  });

  const { control } = form;
  const temperatureValue = form.watch('temperatureRange');
  const lengthValue = form.watch('length');
  const thicknessValue = form.watch('thickness');

  // Memoized validation states
  const validationStates = useMemo(() => {
    // Manual validation for temperature range
    const isTemperatureValid = (() => {
      if (!Array.isArray(temperatureValue) || temperatureValue.length !== 2)
        return false;
      const [min, max] = temperatureValue;
      if (min > max) return false;
      if (max - min < 0.5) return false;
      if (min < -10 || max > 50) return false;
      return true;
    })();

    const hasValidTemperatureSelection = isTemperatureValid;
    const canProceedToStep2 = hasValidTemperatureSelection;

    // Manual validation for pipe parameters
    const hasValidLength = lengthValue && lengthValue > 0;
    const hasValidThickness = thicknessValue && thicknessValue > 0;

    const canProceedToStep3 = hasValidLength && hasValidThickness;

    return {
      isTemperatureValid,
      hasValidTemperatureSelection,
      canProceedToStep2,
      hasValidLength,
      hasValidThickness,
      canProceedToStep3,
    };
  }, [temperatureValue, lengthValue, thicknessValue]);

  // Auto-calculate pressure when all form fields are valid
  React.useEffect(() => {
    const temperatureValue = form.watch('temperatureRange');
    const heightValue = form.watch('height');
    const lengthValue = form.watch('length');
    const thicknessValue = form.watch('thickness');

    // Check if all required fields have valid values
    const hasValidTemperature =
      Array.isArray(temperatureValue) &&
      temperatureValue.length === 2 &&
      temperatureValue[0] <= temperatureValue[1] &&
      temperatureValue[1] - temperatureValue[0] >= 0.5;

    const hasValidHeight = heightValue && heightValue > 0;
    const hasValidLength = lengthValue && lengthValue > 0;
    const hasValidThickness = thicknessValue && thicknessValue > 0;

    if (
      hasValidTemperature &&
      hasValidHeight &&
      hasValidLength &&
      hasValidThickness
    ) {
      // Create a stable reference by stringifying the values
      const formData = {
        temperatureRange: temperatureValue,
        height: heightValue,
        length: lengthValue,
        thickness: thicknessValue,
      };

      // Update the store with current form values
      setForm(formData);

      // Calculate pressure after a small delay to prevent rapid updates
      const timeoutId = setTimeout(() => {
        calculatePressure();
      }, 100);

      return () => clearTimeout(timeoutId);
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  // Memoized step handlers
  const handleStep1Complete = useCallback(() => {
    if (validationStates.canProceedToStep2) {
      updateStep(2);
      toast.success('Temperaturbereich festgelegt!');
    } else {
      const error = form.getFieldError('temperatureRange');
      toast.error(
        error || 'Bitte wählen Sie einen gültigen Temperaturbereich.'
      );
    }
  }, [validationStates.canProceedToStep2, updateStep, form]);

  const handleStep2Complete = useCallback(() => {
    if (validationStates.canProceedToStep3) {
      updateStep(3);
      toast.success('Leitungsdaten festgelegt!');
    } else {
      toast.error('Bitte füllen Sie alle erforderlichen Felder aus.');
    }
  }, [validationStates.canProceedToStep3, updateStep]);

  const handleGoBack = useCallback(
    (targetStep: number) => {
      updateStep(targetStep);
    },
    [updateStep]
  );

  // Update step indicator when currentStep changes
  React.useEffect(() => {
    onStepChange?.(currentStep);
  }, [currentStep, onStepChange]);

  // Memoized step status
  const getStepStatus = useCallback(
    (stepNumber: number) => {
      if (stepNumber < currentStep) return 'completed';
      if (stepNumber === currentStep) return 'active';
      return 'pending';
    },
    [currentStep]
  );

  return (
    <div className="space-y-8">
      {/* Horizontal Step Stack */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentStep - 1) * 33.33}%)`,
            width: '300%',
          }}
        >
          {/* Step 1: Temperature Selection */}
          <div className="w-1/3">
            <motion.div
              id="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border transition-all min-h-[600px] flex flex-col ${
                getStepStatus(1) === 'active'
                  ? STEP_CONFIG[0].borderColor
                  : getStepStatus(1) === 'completed'
                    ? STEP_CONFIG[0].borderColor + ' opacity-75'
                    : STEP_CONFIG[0].borderColor + ' opacity-30'
              }`}
            >
              <div
                className={`px-6 py-4 transition-all rounded-t-2xl ${
                  getStepStatus(1) === 'active'
                    ? `bg-gradient-to-r ${STEP_CONFIG[0].gradient}`
                    : getStepStatus(1) === 'completed'
                      ? `bg-gradient-to-r ${STEP_CONFIG[0].gradient} opacity-75`
                      : `bg-gradient-to-r ${STEP_CONFIG[0].gradient} opacity-30`
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-white">
                          {STEP_CONFIG[0].title}
                        </h3>
                        <button
                          type="button"
                          className="p-1 text-white/80 hover:text-white transition-colors"
                          title="Sättigungsdruck: Der Druck hängt von der Biertemperatur ab. Pro Grad Celsius steigt der Druck um etwa 0,1 bar."
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-white/80 text-sm">
                        {STEP_CONFIG[0].subtitle}
                      </p>
                    </div>
                  </div>
                  {getStepStatus(1) === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-white" />
                  )}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
                  <PressureTable />
                  <div className="space-y-4">
                    <ValidatedTemperatureSlider
                      control={control}
                      name="temperatureRange"
                      showValidation
                    />
                  </div>
                </div>

                {getStepStatus(1) === 'active' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex justify-end"
                  >
                    <button
                      onClick={handleStep1Complete}
                      disabled={!validationStates.canProceedToStep2}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                        validationStates.canProceedToStep2
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <span>Weiter</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Step 2: Pipe Parameters */}
          <div className="w-1/3">
            <motion.div
              id="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border transition-all min-h-[600px] flex flex-col ${
                getStepStatus(2) === 'active'
                  ? STEP_CONFIG[1].borderColor
                  : getStepStatus(2) === 'completed'
                    ? STEP_CONFIG[1].borderColor + ' opacity-75'
                    : STEP_CONFIG[1].borderColor + ' opacity-30'
              }`}
            >
              <div
                className={`px-6 py-4 transition-all rounded-t-2xl ${
                  getStepStatus(2) === 'active'
                    ? `bg-gradient-to-r ${STEP_CONFIG[1].gradient}`
                    : getStepStatus(2) === 'completed'
                      ? `bg-gradient-to-r ${STEP_CONFIG[1].gradient} opacity-75`
                      : `bg-gradient-to-r ${STEP_CONFIG[1].gradient} opacity-30`
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-white">
                          {STEP_CONFIG[1].title}
                        </h3>
                        <button
                          type="button"
                          className="p-1 text-white/80 hover:text-white transition-colors"
                          title="Leitungsdaten: Die Reibungsverluste hängen vom Durchmesser ab: 4mm (0,72 bar/m), 7mm (0,05 bar/m), 10mm (0,01 bar/m)."
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-white/80 text-sm">
                        {STEP_CONFIG[1].subtitle}
                      </p>
                    </div>
                  </div>
                  {getStepStatus(2) === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-white" />
                  )}
                </div>
              </div>

              <div
                className={`p-6 flex-1 flex flex-col ${getStepStatus(2) === 'pending' ? 'pointer-events-none' : ''}`}
              >
                <div className="flex-1">
                  <PipeParametersInputs control={control} form={form} />
                </div>

                {getStepStatus(2) === 'active' && (
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
                      <span>Zurück</span>
                    </button>
                    <button
                      onClick={handleStep2Complete}
                      disabled={!validationStates.canProceedToStep3}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                        validationStates.canProceedToStep3
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <span>Weiter</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Step 3: Height Parameters */}
          <div className="w-1/3">
            <motion.div
              id="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border transition-all min-h-[600px] flex flex-col ${
                getStepStatus(3) === 'active'
                  ? STEP_CONFIG[2].borderColor
                  : STEP_CONFIG[2].borderColor + ' opacity-30'
              }`}
            >
              <div
                className={`px-6 py-4 transition-all rounded-t-2xl ${
                  getStepStatus(3) === 'active'
                    ? `bg-gradient-to-r ${STEP_CONFIG[2].gradient}`
                    : `bg-gradient-to-r ${STEP_CONFIG[2].gradient} opacity-30`
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-white">
                          {STEP_CONFIG[2].title}
                        </h3>
                        <button
                          type="button"
                          className="p-1 text-white/80 hover:text-white transition-colors"
                          title="Förderhöhe: Pro Meter Höhenunterschied (Fassboden bis Zapfhahn) werden 0,1 bar zusätzlicher Druck benötigt."
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-white/80 text-sm">
                        {STEP_CONFIG[2].subtitle}
                      </p>
                    </div>
                  </div>
                  {getStepStatus(3) === 'active' && (
                    <Clock className="w-5 h-5 text-white" />
                  )}
                </div>
              </div>

              <div
                className={`p-6 flex-1 flex flex-col ${getStepStatus(3) === 'pending' ? 'pointer-events-none' : ''}`}
              >
                <div className="flex-1">
                  {/* Height input component */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <Settings className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                          Förderhöhe
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Höhendifferenz zwischen Zapfhahn und Fass
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        Förderhöhe in Metern
                      </label>
                      <input
                        type="number"
                        min="0.2"
                        max="10"
                        step="0.1"
                        placeholder="z.B. 3.0"
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        value={form.watch('height') || ''}
                        onChange={e =>
                          form.setFieldValue(
                            'height',
                            parseFloat(e.target.value) || 0
                          )
                        }
                      />
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        0,1 bar pro Meter Höhenunterschied
                      </div>
                    </div>
                  </div>
                </div>

                {getStepStatus(3) === 'active' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex flex-col sm:flex-row gap-4 sm:justify-between"
                  >
                    <button
                      onClick={() => handleGoBack(2)}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Zurück</span>
                    </button>

                    {onShowResult && (
                      <button
                        onClick={onShowResult}
                        disabled={
                          !validationStates.canProceedToStep3 ||
                          !form.watch('height')
                        }
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                          validationStates.canProceedToStep3 &&
                          form.watch('height')
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <TrendingUp className="w-4 h-4" />
                        <span>Ergebnis anzeigen</span>
                      </button>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
