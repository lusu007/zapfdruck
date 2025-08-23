'use client';

import React, { useMemo, useCallback } from 'react';
import { useFormValidation } from '@/hooks/useFormValidation';
import {
  pressureCalculationSchema,
  PressureCalculationFormData,
} from '@/types/form-schemas';
import { STEP_CONFIG, TOTAL_STEPS } from '@/constants/step-config';

// Modular components
import StepContent from './StepContent';
import StepNavigation from './StepNavigation';
import PipeParametersInputs from './PipeParametersInputs';
import ValidatedTemperatureSlider from './ValidatedTemperatureSlider';
import HeightInput from './HeightInput';
import PressureTable from '../PressureTable';

import { usePressureStore } from '@/store/pressureStore';
import { toast } from 'react-hot-toast';

interface IntegratedCalculatorFormRefactoredProps {
  onComplete?: (data: PressureCalculationFormData) => void;
  onStepChange?: (step: number) => void;
  currentStep?: number;
}

export default function IntegratedCalculatorFormRefactored({
  onComplete,
  onStepChange,
  currentStep: externalCurrentStep,
}: IntegratedCalculatorFormRefactoredProps) {
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
      height: 0,
      length: 0,
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
    const hasValidLength = !!(lengthValue && lengthValue > 0);
    const hasValidThickness = !!(thicknessValue && thicknessValue > 0);

    const canProceedToStep3: boolean = hasValidLength && hasValidThickness;

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

    const hasValidHeight = !!(heightValue && heightValue > 0);
    const hasValidLength = !!(lengthValue && lengthValue > 0);
    const hasValidThickness = !!(thicknessValue && thicknessValue > 0);

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
            <StepContent
              step={STEP_CONFIG[0]!}
              isActive={getStepStatus(1) === 'active'}
              isCompleted={getStepStatus(1) === 'completed'}
            >
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
                <StepNavigation
                  currentStep={1}
                  totalSteps={TOTAL_STEPS}
                  canProceed={validationStates.canProceedToStep2}
                  onNext={handleStep1Complete}
                  onPrevious={() => {}}
                />
              )}
            </StepContent>
          </div>

          {/* Step 2: Pipe Parameters */}
          <div className="w-1/3">
            <StepContent
              step={STEP_CONFIG[1]!}
              isActive={getStepStatus(2) === 'active'}
              isCompleted={getStepStatus(2) === 'completed'}
            >
              <div className="flex-1">
                <PipeParametersInputs control={control} form={form} />
              </div>

              {getStepStatus(2) === 'active' && (
                <StepNavigation
                  currentStep={2}
                  totalSteps={TOTAL_STEPS}
                  canProceed={validationStates.canProceedToStep3}
                  onNext={handleStep2Complete}
                  onPrevious={() => handleGoBack(1)}
                />
              )}
            </StepContent>
          </div>

          {/* Step 3: Height Parameters */}
          <div className="w-1/3">
            <StepContent
              step={STEP_CONFIG[2]!}
              isActive={getStepStatus(3) === 'active'}
              isCompleted={false}
            >
              <div className="flex-1">
                <HeightInput control={control} form={form} />
              </div>

              {getStepStatus(3) === 'active' && (
                <StepNavigation
                  currentStep={3}
                  totalSteps={TOTAL_STEPS}
                  canProceed={false}
                  onNext={() => {}}
                  onPrevious={() => handleGoBack(2)}
                />
              )}
            </StepContent>
          </div>
        </div>
      </div>
    </div>
  );
}
