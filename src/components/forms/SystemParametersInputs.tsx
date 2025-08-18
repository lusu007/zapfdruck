'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, Ruler, Circle, AlertCircle } from 'lucide-react';
import { THICKNESS_OPTIONS, HEIGHT_RANGE, LENGTH_RANGE } from '@/constants';
import { ValidatedNumberInput } from './ValidatedInput';
import { useFieldValidation } from '@/hooks/useFormValidation';

interface SystemParametersInputsProps {
  control: any; // Use any to avoid complex type issues
  form: any; // Use the form instance from useFormValidation
}

export default function SystemParametersInputs({
  control,
  form,
}: SystemParametersInputsProps) {
  const [selectedThickness, setSelectedThickness] = React.useState(0.01);

  const handleThicknessChange = (value: number) => {
    setSelectedThickness(value);
    form.setFieldValue('thickness', value);
  };

  // Field validation states
  const thicknessValidation = useFieldValidation(form, 'thickness');

  return (
    <div className="space-y-8">
      {/* Height Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <ArrowUpDown className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
              Förderhöhe
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              0,1 bar pro Meter Höhenunterschied
            </p>
          </div>
        </div>

        <ValidatedNumberInput
          name="height"
          control={control}
          label="Höhe in Metern"
          placeholder="z.B. 3.0"
          unit="m"
          min={HEIGHT_RANGE.min}
          max={HEIGHT_RANGE.max}
          step={HEIGHT_RANGE.step}
          required
          showValidation
        />
      </motion.div>

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
          {/* Thickness Selection Cards */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Leitungsdurchmesser wählen
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {THICKNESS_OPTIONS.map(option => (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => handleThicknessChange(option.value)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedThickness === option.value
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-purple-300 dark:hover:border-purple-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center space-y-3">
                    {/* Visual Pipe Representation */}
                    <div className="flex justify-center items-center">
                      <div className="relative">
                        <Circle
                          className={`w-16 h-16 ${
                            selectedThickness === option.value
                              ? 'text-purple-500'
                              : 'text-slate-300 dark:text-slate-600'
                          }`}
                          fill="currentColor"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            className={`w-8 h-8 rounded-full ${
                              selectedThickness === option.value
                                ? 'bg-white'
                                : 'bg-slate-200 dark:bg-slate-700'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Size Label */}
                    <div>
                      <div className="text-lg font-bold text-slate-900 dark:text-white">
                        {option.label}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {option.description}
                      </div>
                    </div>

                    {/* Usage Recommendation */}
                    <div className="text-xs text-slate-600 dark:text-slate-400">
                      {option.value === 0.72 && 'Für kurze Leitungen'}
                      {option.value === 0.05 && 'Für mittlere Leitungen'}
                      {option.value === 0.01 && 'Für lange Leitungen'}
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {selectedThickness === option.value && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}

                  {/* Validation Indicator */}
                  {selectedThickness === option.value &&
                    thicknessValidation.hasError && (
                      <div className="absolute -top-2 -left-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      </div>
                    )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Length Input */}
          <ValidatedNumberInput
            name="length"
            control={control}
            label="Leitungslänge in Metern"
            placeholder="z.B. 6.0"
            unit="m"
            min={LENGTH_RANGE.min}
            max={LENGTH_RANGE.max}
            step={LENGTH_RANGE.step}
            required
            showValidation
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 -mt-4">
            Gemessen von der Zapfanlage bis zum Zapfhahn
          </p>
        </div>
      </motion.div>
    </div>
  );
}
