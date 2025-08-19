import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import {
  CalculationForm,
  PressureCalculation,
  TemperaturePressure,
} from '@/types';

interface PressureStore {
  form: CalculationForm;
  result: PressureCalculation | null;
  isLoading: boolean;
  error: string | null;
  setForm: (form: Partial<CalculationForm>) => void;
  calculatePressure: () => Promise<void>;
  resetForm: () => void;
  clearError: () => void;
}

// Memoized temperature to pressure mapping
const TEMPERATURE_PRESSURE_MAP: readonly TemperaturePressure[] = [
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

// Optimized pressure lookup with Map for O(1) access
const PRESSURE_MAP = new Map(
  TEMPERATURE_PRESSURE_MAP.map(tp => [tp.temperature, tp.pressure])
);

const getPressureForTemperature = (temperature: number): number => {
  return PRESSURE_MAP.get(temperature) ?? 0;
};

const roundToDecimal = (value: number, decimals: number = 1): number => {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
};

// Validation functions
const validateForm = (form: CalculationForm): string | null => {
  const { temperatureRange, height, length, thickness } = form;

  // Check temperature range
  if (!Array.isArray(temperatureRange) || temperatureRange.length !== 2) {
    return 'Ungültiger Temperaturbereich';
  }

  const [minTemp, maxTemp] = temperatureRange;
  if (minTemp > maxTemp) {
    return 'Minimale Temperatur darf nicht höher als maximale Temperatur sein';
  }

  if (maxTemp - minTemp < 0.5) {
    return 'Temperaturbereich muss mindestens 0,5°C betragen';
  }

  if (minTemp < -10 || maxTemp > 50) {
    return 'Temperaturbereich muss zwischen -10°C und 50°C liegen';
  }

  // Check height
  if (height <= 0) {
    return 'Förderhöhe muss größer als 0 sein';
  }

  if (height > 10) {
    return 'Förderhöhe darf maximal 10 Meter betragen';
  }

  // Check length
  if (length <= 0) {
    return 'Leitungslänge muss größer als 0 sein';
  }

  if (length > 100) {
    return 'Leitungslänge darf maximal 100 Meter betragen';
  }

  // Check thickness
  if (thickness <= 0) {
    return 'Leitungsdurchmesser muss größer als 0 sein';
  }

  if (thickness > 0.05) {
    return 'Leitungsdurchmesser darf maximal 50mm betragen';
  }

  return null;
};

export const usePressureStore = create<PressureStore>()(
  subscribeWithSelector((set, get) => ({
    form: {
      temperatureRange: [10, 12],
      height: 0,
      length: 0,
      thickness: 0.01, // Default to 10mm
    },
    result: null,
    isLoading: false,
    error: null,

    setForm: newForm => {
      set(state => {
        const nextForm: CalculationForm = {
          ...state.form,
          ...newForm,
        };

        // Deep comparison to prevent unnecessary updates
        const prev = state.form;
        const isSame =
          prev.temperatureRange[0] === nextForm.temperatureRange[0] &&
          prev.temperatureRange[1] === nextForm.temperatureRange[1] &&
          prev.height === nextForm.height &&
          prev.length === nextForm.length &&
          prev.thickness === nextForm.thickness;

        if (isSame) return state;

        // Clear error when form changes
        return {
          form: nextForm,
          error: null,
        };
      });
    },

    calculatePressure: async () => {
      const { form } = get();

      // Set loading state
      set({ isLoading: true, error: null });

      try {
        // Validate inputs
        const validationError = validateForm(form);
        if (validationError) {
          set({
            result: null,
            error: validationError,
            isLoading: false,
          });
          return;
        }

        const { temperatureRange, height, length, thickness } = form;

        // Simulate async calculation for better UX
        await new Promise(resolve => setTimeout(resolve, 100));

        // Get base pressure for temperature range
        const pressureMin = getPressureForTemperature(temperatureRange[0]);
        const pressureMax = getPressureForTemperature(temperatureRange[1]);

        // Calculate height pressure (0.1 bar per meter)
        const heightPressure = height * 0.1;

        // Calculate thickness pressure (friction losses)
        const thicknessPressure = length * thickness;

        // Calculate final results
        const resultMin = roundToDecimal(
          pressureMin + heightPressure + thicknessPressure
        );
        const resultMax = roundToDecimal(
          pressureMax + heightPressure + thicknessPressure
        );

        // Validate results
        if (resultMin < 0 || resultMax < 0) {
          set({
            result: null,
            error: 'Berechneter Druck ist negativ',
            isLoading: false,
          });
          return;
        }

        if (resultMax > 10) {
          set({
            result: null,
            error: 'Berechneter Druck ist zu hoch (> 10 bar)',
            isLoading: false,
          });
          return;
        }

        set({
          result: {
            temperatureMin: temperatureRange[0],
            temperatureMax: temperatureRange[1],
            height,
            length,
            thickness,
            resultMin,
            resultMax,
            breakdown: {
              saturationMin: pressureMin,
              saturationMax: pressureMax,
              heightPressure,
              frictionPressure: thicknessPressure,
            },
            recommended: roundToDecimal((resultMin + resultMax) / 2, 2),
          },
          isLoading: false,
          error: null,
        });
      } catch (error) {
        set({
          result: null,
          error: 'Fehler bei der Berechnung',
          isLoading: false,
        });
        // TODO: Replace with proper error logging
        // console.error('Pressure calculation error:', error);
      }
    },

    resetForm: () => {
      set({
        form: {
          temperatureRange: [10, 12],
          height: 0,
          length: 0,
          thickness: 0.01,
        },
        result: null,
        error: null,
        isLoading: false,
      });
    },

    clearError: () => {
      set({ error: null });
    },
  }))
);

// Selectors for better performance
export const useFormData = () => usePressureStore(state => state.form);
export const useCalculationResult = () =>
  usePressureStore(state => state.result);
export const useCalculationLoading = () =>
  usePressureStore(state => state.isLoading);
export const useCalculationError = () => usePressureStore(state => state.error);
