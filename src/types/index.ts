export interface PressureCalculation {
  temperatureMin: number;
  temperatureMax: number;
  height: number;
  length: number;
  thickness: number;
  resultMin: number;
  resultMax: number;
  breakdown: {
    saturationMin: number;
    saturationMax: number;
    heightPressure: number;
    frictionPressure: number;
  };
  recommended: number;
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
