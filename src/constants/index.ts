import { ThicknessOption } from '@/types';

export const THICKNESS_OPTIONS: ThicknessOption[] = [
  {
    value: 0.004,
    label: '4 mm',
    description: '0,72 bar pro Meter',
  },
  {
    value: 0.007,
    label: '7 mm',
    description: '0,05 bar pro Meter',
  },
  {
    value: 0.01,
    label: '10 mm',
    description: '0,01 bar pro Meter',
  },
];

export const TEMPERATURE_RANGE = {
  min: 5,
  max: 26,
};

export const HEIGHT_RANGE = {
  min: 0.2,
  max: 10,
  step: 0.1,
};

export const LENGTH_RANGE = {
  min: 0.2,
  max: 10,
  step: 0.1,
};
