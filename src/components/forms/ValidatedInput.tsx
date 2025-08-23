import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { AlertCircle } from 'lucide-react';

interface ValidatedInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'email' | 'password';
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  showValidation?: boolean;
}

export function ValidatedInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  unit,
  min,
  max,
  step,
  required = false,
  disabled = false,
  className = '',
  error,
  showValidation = true,
}: ValidatedInputProps<T>) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const hasError = !!fieldState.error || !!error;
          const isValid = !hasError && fieldState.isDirty;

          return (
            <div className="relative">
              <div className="relative">
                <input
                  {...field}
                  id={name}
                  type={type}
                  placeholder={placeholder}
                  min={min}
                  max={max}
                  step={step}
                  disabled={disabled}
                  className={`
                    w-full px-4 py-3 border rounded-lg transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    disabled:bg-slate-100 disabled:cursor-not-allowed
                    ${
                      hasError
                        ? 'border-red-300 focus:ring-red-500 bg-white dark:bg-slate-800 text-red-600 dark:text-red-400'
                        : isValid
                          ? 'border-blue-300 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white'
                          : 'border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-600 text-slate-900 dark:text-white'
                    }
                    ${unit ? 'pr-12' : ''}
                  `}
                  onChange={e => {
                    const value =
                      type === 'number'
                        ? parseFloat(e.target.value) || 0
                        : e.target.value;
                    field.onChange(value);
                  }}
                />

                {unit && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 text-sm">
                    {unit}
                  </div>
                )}

                {showValidation && hasError && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>

              {(fieldState.error?.message || error) && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
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

// Specialized number input with better validation
export function ValidatedNumberInput<T extends FieldValues>(
  props: Omit<ValidatedInputProps<T>, 'type'>
) {
  return (
    <ValidatedInput
      {...props}
      type="number"
      placeholder={props.placeholder || ''}
    />
  );
}
