import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { AlertCircle, CheckCircle, Thermometer } from 'lucide-react';

interface ValidatedRangeInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T, any>;
  label: string;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  showValidation?: boolean;
  onRangeChange?: (range: [number, number]) => void;
}

export function ValidatedRangeInput<T extends FieldValues>({
  name,
  control,
  label,
  min,
  max,
  step = 0.1,
  unit = '°C',
  required = false,
  disabled = false,
  className = '',
  error,
  showValidation = true,
  onRangeChange,
}: ValidatedRangeInputProps<T>) {
  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const range = (field.value as [number, number]) || [min, min + 1];
          const hasError = !!fieldState.error || !!error;
          const isValid = !hasError && fieldState.isDirty;

          const handleMinChange = (value: number) => {
            const newRange: [number, number] = [
              value,
              Math.max(value + 0.5, range[1]),
            ];
            field.onChange(newRange);
            onRangeChange?.(newRange);
          };

          const handleMaxChange = (value: number) => {
            const newRange: [number, number] = [range[0], value];
            field.onChange(newRange);
            onRangeChange?.(newRange);
          };

          return (
            <div className="space-y-4">
              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-xs text-slate-600 dark:text-slate-400 mb-2">
                      Minimum {unit}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={range[0]}
                        onChange={e =>
                          handleMinChange(parseFloat(e.target.value) || min)
                        }
                        min={min}
                        max={range[1] - 0.5}
                        step={step}
                        disabled={disabled}
                        className={`
                          w-full px-4 py-3 border rounded-lg transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          disabled:bg-slate-100 disabled:cursor-not-allowed
                          ${
                            hasError
                              ? 'border-red-300 bg-red-50 focus:ring-red-500'
                              : isValid
                                ? 'border-green-300 bg-green-50 focus:ring-green-500'
                                : 'border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-600'
                          }
                          pr-12
                          dark:text-white
                        `}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 text-sm">
                        {unit}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Thermometer className="w-5 h-5 text-slate-400" />
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs text-slate-600 dark:text-slate-400 mb-2">
                      Maximum {unit}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={range[1]}
                        onChange={e =>
                          handleMaxChange(parseFloat(e.target.value) || max)
                        }
                        min={range[0] + 0.5}
                        max={max}
                        step={step}
                        disabled={disabled}
                        className={`
                          w-full px-4 py-3 border rounded-lg transition-all duration-200
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          disabled:bg-slate-100 disabled:cursor-not-allowed
                          ${
                            hasError
                              ? 'border-red-300 bg-red-50 focus:ring-red-500'
                              : isValid
                                ? 'border-green-300 bg-green-50 focus:ring-green-500'
                                : 'border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-600'
                          }
                          pr-12
                          dark:text-white
                        `}
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 text-sm">
                        {unit}
                      </div>
                    </div>
                  </div>
                </div>

                {showValidation && (
                  <div className="absolute -top-2 right-0">
                    {hasError ? (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    ) : isValid ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : null}
                  </div>
                )}
              </div>

              {/* Range display */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    Temperaturbereich:
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {range[0]} - {range[1]} {unit}
                  </span>
                </div>
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Differenz: {range[1] - range[0]} {unit}
                </div>
              </div>

              {(fieldState.error?.message || error) && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {fieldState.error?.message || error}
                </p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
