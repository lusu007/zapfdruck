'use client';

import { useController } from 'react-hook-form';
import { Thermometer, Info, AlertCircle } from 'lucide-react';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { TEMPERATURE_RANGE } from '@/constants';
import { motion, AnimatePresence } from 'framer-motion';

interface ValidatedTemperatureSliderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  showValidation?: boolean;
  error?: string;
  onUserInteraction?: () => void;
}

export default function ValidatedTemperatureSlider({
  control,
  name,
  showValidation = true,
  error,
  onUserInteraction,
}: ValidatedTemperatureSliderProps) {
  const {
    field: { value, onChange },
    fieldState,
  } = useController({
    name,
    control,
  });

  const rangeValue = useMemo(() => {
    return Array.isArray(value) ? (value as [number, number]) : [10, 12];
  }, [value]) as [number, number];

  const min = TEMPERATURE_RANGE.min;
  const max = TEMPERATURE_RANGE.max;

  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  // Validation states
  const hasError = !!fieldState.error || !!error;
  const isValid = !hasError && fieldState.isDirty;
  const showError = (fieldState.isDirty || fieldState.isTouched) && hasError;

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

  // Generic pointer event handlers that work for both mouse and touch
  const handlePointerDown = useCallback(
    (e: React.PointerEvent, thumb: 'min' | 'max') => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(thumb);
      onUserInteraction?.();
    },
    [onUserInteraction]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
      );
      const newValue = Math.round((percentage / 100) * (max - min) + min);

      const [currentMin, currentMax] = rangeValue;

      if (isDragging === 'min') {
        const newMin = Math.min(newValue, currentMax - 1);
        onChange([newMin, currentMax]);
        onUserInteraction?.();
      } else {
        const newMax = Math.max(newValue, currentMin + 1);
        onChange([currentMin, newMax]);
        onUserInteraction?.();
      }
    },
    [isDragging, onChange, rangeValue, min, max, onUserInteraction]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
      return () => {
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };
    }
    return undefined;
  }, [isDragging, handlePointerMove, handlePointerUp]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) return;

      if (!sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
      );
      const newValue = Math.round((percentage / 100) * (max - min) + min);

      const [currentMin, currentMax] = rangeValue;
      const minDistance = Math.abs(newValue - currentMin);
      const maxDistance = Math.abs(newValue - currentMax);

      if (minDistance < maxDistance) {
        const newMin = Math.min(newValue, currentMax - 1);
        onChange([newMin, currentMax]);
      } else {
        const newMax = Math.max(newValue, currentMin + 1);
        onChange([currentMin, newMax]);
      }

      onUserInteraction?.();
    },
    [isDragging, onChange, rangeValue, min, max, onUserInteraction]
  );

  const handleInfoMouseEnter = () => {
    setShowInfo(true);
  };

  const handleInfoMouseLeave = () => {
    setShowInfo(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Biertemperatur
          </h3>
          {showValidation && hasError && (
            <div className="flex items-center gap-1">
              <AlertCircle className="w-4 h-4 text-red-500" />
            </div>
          )}
        </div>
        <div className="relative">
          <button
            type="button"
            onMouseEnter={handleInfoMouseEnter}
            onMouseLeave={handleInfoMouseLeave}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label="Informationen zur Temperatur"
          >
            <Info className="w-4 h-4" />
          </button>
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                ref={infoRef}
                onMouseEnter={handleInfoMouseEnter}
                onMouseLeave={handleInfoMouseLeave}
                className="absolute right-0 top-8 w-64 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 text-sm z-10"
              >
                <p className="text-slate-600 dark:text-slate-400">
                  Wählen Sie den Temperaturbereich Ihres Biers. Der
                  Sättigungsdruck wird automatisch aus der Temperatur berechnet.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-3">
        <div
          ref={sliderRef}
          className={`relative h-12 cursor-pointer touch-none ${
            hasError ? 'ring-2 ring-red-300' : ''
          }`}
          onClick={handleClick}
        >
          {/* Track */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full" />

          {/* Selected range */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 h-2 rounded-full transition-colors ${
              hasError ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{
              left: `${getPercentage(rangeValue[0])}%`,
              width: `${getPercentage(rangeValue[1]) - getPercentage(rangeValue[0])}%`,
            }}
          />

          {/* Min thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-slate-300 rounded-full shadow-lg border-2 cursor-pointer hover:scale-110 transition-all touch-none ${
              hasError ? 'border-red-500' : 'border-blue-500'
            }`}
            style={{ left: `calc(${getPercentage(rangeValue[0])}% - 12px)` }}
            onPointerDown={e => handlePointerDown(e, 'min')}
            aria-label={`Min temperature ${rangeValue[0]}°C`}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={rangeValue[0]}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {rangeValue[0]}°C
            </div>
          </div>

          {/* Max thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-slate-300 rounded-full shadow-lg border-2 cursor-pointer hover:scale-110 transition-all touch-none ${
              hasError ? 'border-red-500' : 'border-blue-500'
            }`}
            style={{ left: `calc(${getPercentage(rangeValue[1])}% - 12px)` }}
            onPointerDown={e => handlePointerDown(e, 'max')}
            aria-label={`Max temperature ${rangeValue[1]}°C`}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={rangeValue[1]}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {rangeValue[1]}°C
            </div>
          </div>
        </div>

        {/* Scale markers */}
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <span>{min}°C</span>
          <span>{Math.round((min + max) / 2)}°C</span>
          <span>{max}°C</span>
        </div>

        {/* Selected range display */}
        <div className="text-center">
          <div
            className={`inline-flex items-center gap-4 px-6 py-3 rounded-xl border transition-colors ${
              hasError
                ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                : isValid
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                  : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
            }`}
          >
            <div>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Min:
              </span>
              <span
                className={`ml-2 text-xl font-bold ${
                  hasError
                    ? 'text-red-600 dark:text-red-400'
                    : isValid
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-blue-600 dark:text-blue-400'
                }`}
              >
                {rangeValue[0]}°C
              </span>
            </div>
            <div className="w-px h-6 bg-slate-300 dark:bg-slate-600" />
            <div>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Max:
              </span>
              <span
                className={`ml-2 text-xl font-bold ${
                  hasError
                    ? 'text-red-600 dark:text-red-400'
                    : isValid
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-blue-600 dark:text-blue-400'
                }`}
              >
                {rangeValue[1]}°C
              </span>
            </div>
          </div>
        </div>

        {/* Validation error message */}
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
          >
            <AlertCircle className="w-4 h-4" />
            {fieldState.error?.message || error}
          </motion.div>
        )}
      </div>
    </div>
  );
}
