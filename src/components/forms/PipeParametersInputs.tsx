'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Ruler, Circle, AlertCircle } from 'lucide-react';
import { THICKNESS_OPTIONS, LENGTH_RANGE } from '@/constants';
import { ValidatedNumberInput } from './ValidatedInput';
import { useFieldValidation } from '@/hooks/useFormValidation';
import { Control, FieldValues } from 'react-hook-form';

interface PipeParametersInputsProps {
  control: Control<FieldValues>;
  form: any; // TODO: Create proper type for form from useFormValidation
}

export default function PipeParametersInputs({
  control,
  form,
}: PipeParametersInputsProps) {
  // Get current thickness from form, default to 0.01 if not set
  const currentThickness = form.watch('thickness') || 0.01;
  const [selectedThickness, setSelectedThickness] =
    React.useState(currentThickness);

  const handleThicknessChange = (value: number) => {
    setSelectedThickness(value);
    form.setFieldValue('thickness', value);
  };

  // Field validation states
  const thicknessValidation = useFieldValidation(form, 'thickness');

  return (
    <div className="space-y-8">
      {/* Length and Thickness Inputs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Ruler className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
              Leitung & Durchmesser
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Reibungsverluste je nach Querschnitt
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Length Input */}
          <ValidatedNumberInput
            name="length"
            control={control}
            label="Leitungslänge"
            placeholder="z.B. 5.0"
            unit="m"
            min={LENGTH_RANGE.min}
            max={LENGTH_RANGE.max}
            step={LENGTH_RANGE.step}
            required
            showValidation
          />

          {/* Thickness Selection Cards */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Leitungsdurchmesser wählen
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {THICKNESS_OPTIONS.map((option, index) => (
                <motion.button
                  key={index}
                  type="button"
                  onClick={() => handleThicknessChange(option.value)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedThickness === option.value
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                        selectedThickness === option.value
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      {selectedThickness === option.value && (
                        <Circle className="w-4 h-4 text-white fill-current" />
                      )}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {option.label}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {option.description}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Validation Error for Thickness */}
          {thicknessValidation.hasError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" />
              {thicknessValidation.error}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
