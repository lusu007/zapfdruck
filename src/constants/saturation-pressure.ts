import type { TemperaturePressure } from '@/types';

/** CO2 saturation pressure (bar) by temperature (°C), single source of truth. */
export const SATURATION_PRESSURE_TABLE: readonly TemperaturePressure[] = [
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

const saturationPressureMap = new Map(
  SATURATION_PRESSURE_TABLE.map(tp => [tp.temperature, tp.pressure])
);

export function getSaturationPressureBar(temperature: number): number {
  return saturationPressureMap.get(temperature) ?? 0;
}

/** Temperature rows shown in the step-1 reference table (5 °C steps). */
export const PRESSURE_TABLE_SAMPLE_TEMPS = [5, 10, 15, 20, 25] as const;

export function getSaturationPressureTableSampleRows(): TemperaturePressure[] {
  return PRESSURE_TABLE_SAMPLE_TEMPS.map(temperature => ({
    temperature,
    pressure: getSaturationPressureBar(temperature),
  }));
}
