import { create } from 'zustand';
import {
  CalculationForm,
  PressureCalculation,
  TemperaturePressure,
} from '@/types';

interface PressureStore {
  form: CalculationForm;
  result: PressureCalculation | null;
  setForm: (form: Partial<CalculationForm>) => void;
  calculatePressure: () => void;
  resetForm: () => void;
}

// Temperature to pressure mapping
const TEMPERATURE_PRESSURE_MAP: TemperaturePressure[] = [
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
];

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

export const usePressureStore = create<PressureStore>((set, get) => ({
  form: {
    temperatureRange: [10, 12],
    height: 0,
    length: 0,
    thickness: 0.01, // Default to 10mm
  },
  result: null,

  setForm: newForm => {
    set(state => {
      const nextForm: CalculationForm = {
        ...state.form,
        ...newForm,
      };
      const prev = state.form;
      const isSame =
        prev.temperatureRange[0] === nextForm.temperatureRange[0] &&
        prev.temperatureRange[1] === nextForm.temperatureRange[1] &&
        prev.height === nextForm.height &&
        prev.length === nextForm.length &&
        prev.thickness === nextForm.thickness;
      if (isSame) return state;
      return { form: nextForm };
    });
  },

  calculatePressure: () => {
    const { form } = get();
    const { temperatureRange, height, length, thickness } = form;

    // Validate inputs
    if (!height || !length || !thickness) {
      return;
    }

    // Get base pressure for temperature range
    const pressureMin = getPressureForTemperature(temperatureRange[0]);
    const pressureMax = getPressureForTemperature(temperatureRange[1]);

    // Calculate height pressure (0.1 bar per meter)
    const heightPressure = height * 0.1;

    // Calculate thickness pressure
    const thicknessPressure = length * thickness;

    // Calculate final results
    const resultMin = roundToDecimal(
      pressureMin + heightPressure + thicknessPressure
    );
    const resultMax = roundToDecimal(
      pressureMax + heightPressure + thicknessPressure
    );

    set({
      result: {
        temperatureMin: temperatureRange[0],
        temperatureMax: temperatureRange[1],
        height,
        length,
        thickness,
        resultMin,
        resultMax,
      },
    });
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
    });
  },
}));
