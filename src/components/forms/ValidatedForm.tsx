import React from 'react';
import { FieldValues, FieldError } from 'react-hook-form';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useFormValidation } from '@/hooks/useFormValidation';

interface ValidatedFormProps<T extends FieldValues> {
  form: ReturnType<typeof useFormValidation<T>>;
  onSubmit: (data: T) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
  showValidationSummary?: boolean;
  submitButtonText?: string;
  isSubmitting?: boolean;
  disabled?: boolean;
}

export function ValidatedForm<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className = '',
  showValidationSummary = true,
  submitButtonText = 'Berechnen',
  isSubmitting = false,
  disabled = false,
}: ValidatedFormProps<T>) {
  const { handleSubmit, formState } = form;
  const { errors, isValid, isDirty } = formState;

  const errorCount = Object.keys(errors).length;
  const hasErrors = errorCount > 0;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-6 ${className}`}
      noValidate
    >
      {children}

      {/* Validation Summary */}
      {showValidationSummary && isDirty && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {hasErrors ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">
                  {errorCount} Validierungsfehler gefunden
                </span>
              </div>
              <ul className="mt-2 space-y-1">
                {Object.entries(errors).map(([field, error]) => (
                  <li
                    key={field}
                    className="text-sm text-red-700 dark:text-red-300"
                  >
                    •{' '}
                    {typeof error === 'string'
                      ? error
                      : (error as FieldError)?.message || 'Ungültiger Wert'}
                  </li>
                ))}
              </ul>
            </div>
          ) : isValid ? (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Alle Eingaben sind gültig</span>
              </div>
            </div>
          ) : null}
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={disabled || isSubmitting || !isValid || !isDirty}
        className={`
          w-full px-6 py-3 rounded-lg font-medium transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50
          ${
            isValid && isDirty && !isSubmitting
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
          }
        `}
        whileHover={isValid && isDirty && !isSubmitting ? { scale: 1.02 } : {}}
        whileTap={isValid && isDirty && !isSubmitting ? { scale: 0.98 } : {}}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Berechne...</span>
          </div>
        ) : (
          submitButtonText
        )}
      </motion.button>
    </form>
  );
}

// Form section component for grouping related fields
interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export function FormSection({
  title,
  description,
  children,
  className = '',
  collapsible = false,
  defaultExpanded = true,
}: FormSectionProps) {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  if (collapsible) {
    return (
      <div
        className={`bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 ${className}`}
      >
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                {title}
              </h3>
              {description && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {description}
                </p>
              )}
            </div>
            <div className="text-slate-400">{isExpanded ? '−' : '+'}</div>
          </div>
        </button>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 pb-6"
          >
            {children}
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 ${className}`}
    >
      <div className="mb-4">
        <h3 className="text-lg font-medium text-slate-900 dark:text-white">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
