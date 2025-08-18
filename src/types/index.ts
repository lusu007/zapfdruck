export interface PressureCalculation {
  temperatureMin: number;
  temperatureMax: number;
  height: number;
  length: number;
  thickness: number;
  resultMin: number;
  resultMax: number;
}

export interface TemperaturePressure {
  temperature: number;
  pressure: number;
}

export interface ThicknessOption {
  value: number;
  label: string;
  description: string;
}

export interface CalculationForm {
  temperatureRange: [number, number];
  height: number;
  length: number;
  thickness: number;
}
