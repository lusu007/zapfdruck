'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpDown,
  Ruler,
  Circle,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { THICKNESS_OPTIONS, HEIGHT_RANGE, LENGTH_RANGE } from '@/constants';
import { ValidatedNumberInput } from './ValidatedInput';
import { ValidatedRangeInput } from './ValidatedRangeInput';
import { useFieldValidation } from '@/hooks/useFormValidation';

interface ValidatedFormInputsProps {
  control: any; // Use any to avoid complex type issues
  form: any; // Use the form instance from useFormValidation
}

export default function ValidatedFormInputs({
  control,
  form,
}: ValidatedFormInputsProps) {
  const [selectedThickness, setSelectedThickness] = React.useState(0.01);

  const handleThicknessChange = (value: number) => {
    setSelectedThickness(value);
    form.setFieldValue('thickness', value);
  };

  // Field validation states
  const heightValidation = useFieldValidation(form, 'height');
  const lengthValidation = useFieldValidation(form, 'length');
  const thicknessValidation = useFieldValidation(form, 'thickness');
  const temperatureValidation = useFieldValidation(form, 'temperatureRange');

  return (
    <div className="space-y-8">
      {/* Temperature Range Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <ArrowUpDown className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
              Temperaturbereich
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Optimaler Temperaturbereich für Ihr Bier
            </p>
          </div>
        </div>

        <ValidatedRangeInput
          name="temperatureRange"
          control={control}
          label="Temperaturbereich"
          min={-10}
          max={50}
          step={0.1}
          unit="°C"
          required
          showValidation
        />
      </motion.div>

      {/* Height Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
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
        transition={{ delay: 0.2 }}
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
                  {selectedThickness === option.value && (
                    <div className="absolute -top-2 -left-2">
                      {thicknessValidation.hasError ? (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      ) : thicknessValidation.isValid ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : null}
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Thickness validation error */}
            {thicknessValidation.showError && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {thicknessValidation.error}
              </p>
            )}
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

      {/* Validation Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3"
      >
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
          <h5 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
            Validierungsstatus
          </h5>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">
                Temperaturbereich:
              </span>
              <div className="flex items-center gap-1">
                {temperatureValidation.hasError ? (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                ) : temperatureValidation.isValid ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">
                Förderhöhe:
              </span>
              <div className="flex items-center gap-1">
                {heightValidation.hasError ? (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                ) : heightValidation.isValid ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">
                Leitungslänge:
              </span>
              <div className="flex items-center gap-1">
                {lengthValidation.hasError ? (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                ) : lengthValidation.isValid ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">
                Leitungsdurchmesser:
              </span>
              <div className="flex items-center gap-1">
                {thicknessValidation.hasError ? (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                ) : thicknessValidation.isValid ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
