'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beer, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { usePressureStore } from '@/store/pressureStore';

// Memoized temperature to pressure mapping
const TEMPERATURE_PRESSURE_MAP = [
  { temperature: 5, pressure: 0.8 },
  { temperature: 6, pressure: 0.9 },
  { temperature: 7, pressure: 1.0 },
  { temperature: 8, pressure: 1.0 },
  { temperature: 9, pressure: 1.1 },
  { temperature: 10, pressure: 1.2 },
  { temperature: 11, pressure: 1.3 },
  { temperature: 12, pressure: 1.4 },
  { temperature: 13, pressure: 1.5 },
  { temperature: 14, pressure: 1.5 },
  { temperature: 15, pressure: 1.6 },
  { temperature: 16, pressure: 1.7 },
  { temperature: 17, pressure: 1.8 },
  { temperature: 18, pressure: 1.9 },
  { temperature: 19, pressure: 1.9 },
  { temperature: 20, pressure: 2.0 },
  { temperature: 21, pressure: 2.0 },
  { temperature: 22, pressure: 2.1 },
  { temperature: 23, pressure: 2.2 },
  { temperature: 24, pressure: 2.3 },
  { temperature: 25, pressure: 2.4 },
  { temperature: 26, pressure: 2.5 },
] as const;

interface LivePressureResultProps {
  isHighlighted?: boolean;
}

export default function LivePressureResult({
  isHighlighted = false,
}: LivePressureResultProps) {
  const { form } = usePressureStore();

  // Extract form values to avoid complex expressions in dependencies
  const { temperatureRange, height, length, thickness } = form;

  // Memoized pressure calculation
  const pressureData = useMemo(() => {
    // Check if we have enough data to calculate
    if (
      !temperatureRange ||
      !Array.isArray(temperatureRange) ||
      temperatureRange.length !== 2
    ) {
      return null;
    }

    if (!height || !length || !thickness) {
      return null;
    }

    try {
      // Get base pressure for temperature range
      const getPressureForTemperature = (temperature: number): number => {
        const entry = TEMPERATURE_PRESSURE_MAP.find(
          tp => tp.temperature === temperature
        );
        return entry ? entry.pressure : 0;
      };

      const roundToDecimal = (value: number, decimals: number = 1): number => {
        const multiplier = Math.pow(10, decimals);
        return Math.round(value * multiplier) / multiplier;
      };

      const pressureMin = getPressureForTemperature(temperatureRange[0]);
      const pressureMax = getPressureForTemperature(temperatureRange[1]);

      // Calculate height pressure (0.1 bar per meter)
      const heightPressure = height * 0.1;

      // Calculate thickness pressure
      const thicknessPressure = length * thickness;

      // Calculate final pressure range
      const resultMin = roundToDecimal(
        pressureMin + heightPressure + thicknessPressure
      );
      const resultMax = roundToDecimal(
        pressureMax + heightPressure + thicknessPressure
      );

      return {
        range: { min: resultMin, max: resultMax },
        breakdown: {
          saturation: {
            min: pressureMin,
            max: pressureMax,
          },
          height: heightPressure,
          friction: thicknessPressure,
        },
        recommended: roundToDecimal((resultMin + resultMax) / 2, 2),
      };
    } catch (error) {
      return null;
    }
  }, [temperatureRange, height, length, thickness]);

  const hasValidData = pressureData !== null;

  // Memoized diameter display
  const diameterDisplay = useMemo(() => {
    if (thickness === 0.004) return '4mm';
    if (thickness === 0.007) return '7mm';
    if (thickness === 0.01) return '10mm';
    if (thickness > 0) return `${(thickness * 1000).toFixed(0)}mm`;
    return 'Nicht gesetzt';
  }, [thickness]);

  // Memoized temperature display
  const temperatureDisplay = useMemo(() => {
    if (
      temperatureRange &&
      Array.isArray(temperatureRange) &&
      temperatureRange.length === 2
    ) {
      return `${temperatureRange[0]}°C - ${temperatureRange[1]}°C`;
    }
    return 'Nicht gesetzt';
  }, [temperatureRange]);

  return (
    <motion.div
      id="live-pressure-result"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isHighlighted ? [1, 1.02, 1] : 1,
        boxShadow: isHighlighted
          ? [
              '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              '0 25px 50px -12px rgba(59, 130, 246, 0.25)',
              '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            ]
          : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
      transition={{
        delay: 0.2,
        duration: 0.6,
        scale: isHighlighted ? { duration: 0.6, ease: 'easeInOut' } : undefined,
        boxShadow: isHighlighted
          ? { duration: 0.6, ease: 'easeInOut' }
          : undefined,
      }}
      className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl shadow-xl border overflow-hidden transition-all duration-300 ${
        isHighlighted
          ? 'border-indigo-400 dark:border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800'
          : 'border-slate-200/50 dark:border-slate-700/50'
      }`}
    >
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <Beer className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Aktueller Zapfdruck
            </h3>
            <p className="text-indigo-100 text-sm">
              Live-Berechnung basierend auf Ihren Eingaben
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {!hasValidData ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                <Beer className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Füllen Sie alle erforderlichen Felder aus, um den Zapfdruck zu
                berechnen
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="pressure-result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Main pressure result */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{
                    scale: isHighlighted ? [1, 1.05, 1] : 1,
                    y: isHighlighted ? [0, -5, 0] : 0,
                  }}
                  transition={{
                    delay: 0.2,
                    type: 'spring',
                    stiffness: 200,
                    scale: isHighlighted
                      ? { duration: 0.8, ease: 'easeInOut' }
                      : undefined,
                    y: isHighlighted
                      ? { duration: 0.8, ease: 'easeInOut' }
                      : undefined,
                  }}
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-indigo-500 dark:text-indigo-300" />
                    <div className="text-xs text-indigo-500 dark:text-indigo-300 font-medium">
                      Empfohlen
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                    {pressureData.recommended}
                  </div>
                  <div className="text-xs text-indigo-500 dark:text-indigo-300 mb-1">
                    {pressureData.range.min.toFixed(2)} -{' '}
                    {pressureData.range.max.toFixed(2)}
                  </div>
                  <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                    bar
                  </div>
                </motion.div>
              </div>

              {/* Breakdown */}
              <div className="space-y-3">
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Druckaufschlüsselung:
                </h4>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="text-slate-600 dark:text-slate-400">
                      Sättigungsdruck:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {pressureData.breakdown.saturation.min.toFixed(2)} -{' '}
                      {pressureData.breakdown.saturation.max.toFixed(2)} bar
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="text-slate-600 dark:text-slate-400">
                      Förderhöhe:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {pressureData.breakdown.height.toFixed(2)} bar
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <span className="text-slate-600 dark:text-slate-400">
                      Reibungsverluste:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {pressureData.breakdown.friction.toFixed(2)} bar
                    </span>
                  </div>
                </div>
              </div>

              {/* Current values */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-500" />
                  Aktuelle Werte:
                </h4>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="text-slate-600 dark:text-slate-400">
                      Temperatur:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {temperatureDisplay}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="text-slate-600 dark:text-slate-400">
                      Höhe:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {form.height ? `${form.height}m` : 'Nicht gesetzt'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="text-slate-600 dark:text-slate-400">
                      Länge:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {form.length ? `${form.length}m` : 'Nicht gesetzt'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="text-slate-600 dark:text-slate-400">
                      Durchmesser:
                    </span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {diameterDisplay}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
