'use client';

import { useController } from 'react-hook-form';
import { Thermometer, Info } from 'lucide-react';
import { Control } from 'react-hook-form';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { TEMPERATURE_RANGE } from '@/constants';

interface TemperatureSliderProps {
  control: Control<{
    temperatureRange: [number, number];
    height: number;
    length: number;
    thickness: number;
  }>;
  name: 'temperatureRange';
}

export default function TemperatureSlider({
  control,
  name,
}: TemperatureSliderProps) {
  const {
    field: { value, onChange },
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

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

  // Generic pointer event handlers that work for both mouse and touch
  const handlePointerDown = useCallback(
    (e: React.PointerEvent, thumb: 'min' | 'max') => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(thumb);
    },
    []
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
      } else {
        const newMax = Math.max(newValue, currentMin + 1);
        onChange([currentMin, newMax]);
      }
    },
    [isDragging, onChange, rangeValue, min, max]
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
    },
    [isDragging, onChange, rangeValue, min, max]
  );

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowInfo(!showInfo);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (infoRef.current && !infoRef.current.contains(event.target as Node)) {
        setShowInfo(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Biertemperatur
          </h3>
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={handleInfoClick}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            aria-label="Informationen zur Temperatur"
          >
            <Info className="w-4 h-4" />
          </button>
          {showInfo && (
            <div
              ref={infoRef}
              className="absolute right-0 top-8 w-64 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 text-sm z-10"
            >
              <p className="text-slate-600 dark:text-slate-400">
                Wählen Sie den Temperaturbereich Ihres Biers. Der
                Sättigungsdruck wird automatisch aus der Temperatur berechnet.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div
          ref={sliderRef}
          className="relative h-12 cursor-pointer touch-none"
          onClick={handleClick}
        >
          {/* Track */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full" />

          {/* Selected range */}
          <div
            className="absolute top-1/2 -translate-y-1/2 h-2 bg-blue-500 rounded-full"
            style={{
              left: `${getPercentage(rangeValue[0])}%`,
              width: `${getPercentage(rangeValue[1]) - getPercentage(rangeValue[0])}%`,
            }}
          />

          {/* Min thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-slate-300 rounded-full shadow-lg border-2 border-blue-500 cursor-pointer hover:scale-110 transition-transform touch-none"
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
            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-slate-300 rounded-full shadow-lg border-2 border-blue-500 cursor-pointer hover:scale-110 transition-transform touch-none"
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
          <div className="inline-flex items-center gap-4 bg-blue-50 dark:bg-blue-900/20 px-6 py-3 rounded-xl border border-blue-200 dark:border-blue-800">
            <div>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Min:
              </span>
              <span className="ml-2 text-xl font-bold text-blue-600 dark:text-blue-400">
                {rangeValue[0]}°C
              </span>
            </div>
            <div className="w-px h-6 bg-slate-300 dark:bg-slate-600" />
            <div>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Max:
              </span>
              <span className="ml-2 text-xl font-bold text-blue-600 dark:text-blue-400">
                {rangeValue[1]}°C
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
