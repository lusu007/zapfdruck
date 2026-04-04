import { z } from 'zod';

export const temperatureSchema = z
  .number()
  .min(-10, 'Temperatur muss mindestens -10°C sein')
  .max(50, 'Temperatur darf maximal 50°C sein');

export const thicknessSchema = z
  .number()
  .min(0.001, 'Dicke muss mindestens 0.001m sein')
  .max(1, 'Dicke darf maximal 1m sein');

export const heightSchema = z
  .number()
  .min(0, 'Höhe muss mindestens 0m sein')
  .max(100, 'Höhe darf maximal 100m sein');

export const lengthSchema = z
  .number()
  .min(0, 'Länge muss mindestens 0m sein')
  .max(1000, 'Länge darf maximal 1000m sein');

export const pressureCalculationSchema = z.object({
  temperatureRange: z
    .tuple([temperatureSchema, temperatureSchema])
    .refine(([min, max]) => min <= max, {
      message:
        'Minimale Temperatur muss kleiner oder gleich der maximalen Temperatur sein',
      path: ['temperatureRange'],
    })
    .refine(([min, max]) => max - min >= 0.5, {
      message: 'Temperaturbereich muss mindestens 0.5°C betragen',
      path: ['temperatureRange'],
    }),
  height: heightSchema.optional(),
  length: lengthSchema.optional(),
  thickness: thicknessSchema,
});

export type PressureCalculationFormData = z.infer<
  typeof pressureCalculationSchema
>;
