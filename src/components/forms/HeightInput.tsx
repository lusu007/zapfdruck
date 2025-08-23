import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { ValidatedNumberInput } from './ValidatedInput';

interface HeightInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  className?: string;
}

export default function HeightInput({
  control,
  form: _form, // Prefix with underscore to indicate unused
  className = '',
}: HeightInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`space-y-4 ${className}`}
    >
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
        <ValidatedNumberInput
          name="height"
          control={control}
          label="Förderhöhe in Metern"
          placeholder="z.B. 3.0"
          unit="m"
          min={0.2}
          max={10}
          step={0.1}
          required
          showValidation
        />
        <div className="text-sm text-slate-600 dark:text-slate-400">
          0,1 bar pro Meter Höhenunterschied
        </div>
      </div>
    </motion.div>
  );
}
