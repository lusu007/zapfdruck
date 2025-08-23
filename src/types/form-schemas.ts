import { z } from 'zod';

// Base schemas for common validation patterns
export const positiveNumberSchema = z
  .number()
  .positive('Wert muss positiv sein')
  .min(0.001, 'Wert muss größer als 0.001 sein');

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

// Main form schema
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

// Extended form schema with additional validation
export const extendedPressureCalculationSchema =
  pressureCalculationSchema.extend({
    beerType: z.enum(['lager', 'ale', 'stout', 'wheat']).optional(),
    carbonationLevel: z
      .number()
      .min(1.5, 'Kohlensäuregehalt muss mindestens 1.5 Vol% sein')
      .max(4.0, 'Kohlensäuregehalt darf maximal 4.0 Vol% sein')
      .optional(),
    systemEfficiency: z
      .number()
      .min(0.5, 'Systemeffizienz muss mindestens 50% sein')
      .max(1.0, 'Systemeffizienz darf maximal 100% sein')
      .optional(),
  });

// Settings form schema
export const settingsSchema = z.object({
  pressureUnit: z.enum(['bar', 'psi']),
  temperatureUnit: z.enum(['celsius', 'fahrenheit']),
  decimalPlaces: z
    .number()
    .int()
    .min(0, 'Dezimalstellen müssen mindestens 0 sein')
    .max(4, 'Dezimalstellen dürfen maximal 4 sein'),
  autoCalculate: z.boolean(),
});

// Type exports for use in components
export type PressureCalculationFormData = z.infer<
  typeof pressureCalculationSchema
>;
export type ExtendedPressureCalculationFormData = z.infer<
  typeof extendedPressureCalculationSchema
>;
export type SettingsFormData = z.infer<typeof settingsSchema>;

// Validation error types
export type FormValidationError = {
  field: string;
  message: string;
};

// Helper function to get field-specific error messages
export const getFieldError = (
  errors: Record<string, { message?: string }>,
  fieldName: string
): string | undefined => {
  const fieldError = errors[fieldName];
  if (fieldError?.message) {
    return fieldError.message;
  }
  return undefined;
};

// Helper function to validate temperature range
export const validateTemperatureRange = (
  minTemp: number,
  maxTemp: number
): { isValid: boolean; error?: string } => {
  if (minTemp > maxTemp) {
    return {
      isValid: false,
      error:
        'Minimale Temperatur muss kleiner oder gleich der maximalen Temperatur sein',
    };
  }

  if (maxTemp - minTemp < 0.5) {
    return {
      isValid: false,
      error: 'Temperaturbereich muss mindestens 0.5°C betragen',
    };
  }

  return { isValid: true };
};
