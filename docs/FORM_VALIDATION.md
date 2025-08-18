# Form Validation mit Zod Schema für Typsicherheit

Dieses Dokument beschreibt die Implementierung eines typsicheren Formularvalidierungssystems mit Zod und React Hook Form für das Zapfdruck Rechner Projekt.

## Übersicht

Das Validierungssystem bietet:

- **Typsicherheit**: Vollständige TypeScript-Integration mit Zod-Schemas
- **Echtzeit-Validierung**: Sofortige Rückmeldung bei Benutzereingaben
- **Wiederverwendbare Komponenten**: Modulare Formularkomponenten
- **Benutzerfreundlichkeit**: Visuelle Indikatoren und Toast-Benachrichtigungen
- **Erweiterbarkeit**: Einfache Anpassung und Erweiterung von Validierungsregeln

## Installation

Die benötigten Abhängigkeiten sind bereits installiert:

```bash
npm install zod @hookform/resolvers react-hook-form react-hot-toast
```

## Architektur

### 1. Zod Schemas (`src/types/form-schemas.ts`)

Definiert die Validierungsregeln und TypeScript-Typen:

```typescript
import { z } from 'zod';

// Basis-Schemas für häufige Validierungsmuster
export const positiveNumberSchema = z
  .number()
  .positive('Wert muss positiv sein')
  .min(0.001, 'Wert muss größer als 0.001 sein');

export const temperatureSchema = z
  .number()
  .min(-10, 'Temperatur muss mindestens -10°C sein')
  .max(50, 'Temperatur darf maximal 50°C sein');

// Hauptformular-Schema
export const pressureCalculationSchema = z.object({
  temperatureRange: z
    .tuple([temperatureSchema, temperatureSchema])
    .refine(([min, max]) => min <= max, {
      message:
        'Minimale Temperatur muss kleiner oder gleich der maximalen Temperatur sein',
      path: ['temperatureRange'],
    }),
  height: heightSchema,
  length: lengthSchema,
  thickness: thicknessSchema,
});

// TypeScript-Typen exportieren
export type PressureCalculationFormData = z.infer<
  typeof pressureCalculationSchema
>;
```

### 2. Custom Hook (`src/hooks/useFormValidation.ts`)

Integriert Zod mit React Hook Form:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export function useFormValidation<T extends FieldValues>({
  schema,
  onSuccess,
  onError,
  showToastErrors = true,
  ...formOptions
}: UseFormValidationOptions<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    mode: 'onChange', // Validierung bei Änderung für bessere UX
    ...formOptions,
  });

  // ... Implementierung
}
```

### 3. Validierte Komponenten

#### ValidatedInput (`src/components/forms/ValidatedInput.tsx`)

Wiederverwendbare Eingabekomponente mit Validierung:

```typescript
export function ValidatedInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  unit,
  min,
  max,
  step,
  required = false,
  disabled = false,
  className = '',
  error,
  showValidation = true,
}: ValidatedInputProps<T>) {
  // Implementierung mit Controller und visueller Rückmeldung
}
```

#### ValidatedRangeInput (`src/components/forms/ValidatedRangeInput.tsx`)

Spezialisierte Komponente für Temperaturbereiche:

```typescript
export function ValidatedRangeInput<T extends FieldValues>({
  name,
  control,
  label,
  min,
  max,
  step = 0.1,
  unit = '°C',
  required = false,
  disabled = false,
  className = '',
  error,
  showValidation = true,
  onRangeChange,
}: ValidatedRangeInputProps<T>) {
  // Implementierung mit Min/Max-Validierung
}
```

#### ValidatedForm (`src/components/forms/ValidatedForm.tsx`)

Formular-Wrapper mit Validierungszusammenfassung:

```typescript
export function ValidatedForm<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className = '',
  showValidationSummary = true,
  submitButtonText = 'Berechnen',
  isSubmitting = false,
  disabled = false,
}: ValidatedFormProps<T>) {
  // Implementierung mit Validierungszusammenfassung und Submit-Button
}
```

## Verwendung

### 1. Einfaches Formular erstellen

```typescript
import { useFormValidation } from '@/hooks/useFormValidation';
import { pressureCalculationSchema, PressureCalculationFormData } from '@/types/form-schemas';
import { ValidatedForm } from '@/components/forms/ValidatedForm';
import { ValidatedInput } from '@/components/forms/ValidatedInput';

function MyForm() {
  const form = useFormValidation<PressureCalculationFormData>({
    schema: pressureCalculationSchema,
    defaultValues: {
      temperatureRange: [10, 12],
      height: 0,
      length: 0,
      thickness: 0.01,
    },
    onSuccess: (data) => {
      console.log('Form submitted:', data);
      toast.success('Formular erfolgreich gesendet!');
    },
  });

  return (
    <ValidatedForm
      form={form}
      onSubmit={(data) => {
        // Handle form submission
      }}
      submitButtonText="Berechnen"
    >
      <ValidatedInput
        name="height"
        control={form.control}
        label="Höhe"
        placeholder="Höhe eingeben"
        unit="m"
        min={0}
        max={100}
        required
      />
      {/* Weitere Felder */}
    </ValidatedForm>
  );
}
```

### 2. Erweiterte Validierung

```typescript
// Cross-field validation
export const extendedSchema = baseSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwörter stimmen nicht überein',
    path: ['confirmPassword'],
  });

// Custom validation functions
const validateTemperatureRange = (min: number, max: number) => {
  if (min > max) {
    return { isValid: false, error: 'Min muss kleiner als Max sein' };
  }
  return { isValid: true };
};
```

### 3. Real-time Validation

```typescript
// Hook für Echtzeit-Validierung
export function useFieldValidation<T extends FieldValues>(
  form: ReturnType<typeof useFormValidation<T>>,
  fieldName: Path<T>
) {
  const error = form.getFieldError(fieldName);
  const isValid = form.isFieldValid(fieldName);
  const isDirty = form.formState.dirtyFields[fieldName];

  return {
    error,
    isValid,
    isDirty,
    hasError: !!error,
    showError: isDirty && !!error,
  };
}
```

## Validierungsregeln

### Basis-Validierungen

- **Positive Zahlen**: `z.number().positive()`
- **Bereiche**: `z.number().min(0).max(100)`
- **Strings**: `z.string().min(3).max(50)`
- **E-Mail**: `z.string().email()`
- **Enums**: `z.enum(['option1', 'option2'])`

### Erweiterte Validierungen

- **Cross-field**: `z.object().refine()`
- **Conditional**: `z.union([schema1, schema2])`
- **Custom**: `z.custom((val) => customValidation(val))`

### Fehlermeldungen

Alle Fehlermeldungen sind auf Deutsch und benutzerfreundlich:

```typescript
export const temperatureSchema = z
  .number()
  .min(-10, 'Temperatur muss mindestens -10°C sein')
  .max(50, 'Temperatur darf maximal 50°C sein');
```

## Best Practices

### 1. Schema-Organisation

```typescript
// Basis-Schemas für Wiederverwendung
export const baseSchemas = {
  positiveNumber: z.number().positive(),
  temperature: z.number().min(-10).max(50),
  email: z.string().email(),
};

// Spezifische Schemas
export const userSchema = z.object({
  name: z.string().min(2),
  email: baseSchemas.email,
  age: baseSchemas.positiveNumber,
});
```

### 2. Type Safety

```typescript
// Immer Typen aus Schemas ableiten
export type UserFormData = z.infer<typeof userSchema>;

// Nie manuell Typen definieren
// ❌ interface UserFormData { name: string; email: string; }
// ✅ export type UserFormData = z.infer<typeof userSchema>;
```

### 3. Error Handling

```typescript
const form = useFormValidation({
  schema: mySchema,
  onError: errors => {
    console.error('Validation errors:', errors);
    // Logging oder Analytics
  },
  onSuccess: data => {
    // Erfolgreiche Verarbeitung
  },
});
```

### 4. Performance

```typescript
// Validierung nur bei Änderung
const form = useForm({
  resolver: zodResolver(schema),
  mode: 'onChange', // Nicht 'onBlur' oder 'onSubmit'
});

// Memoization für teure Validierungen
const expensiveValidation = useMemo(() => {
  return z.custom(val => complexValidation(val));
}, []);
```

## Testing

### Unit Tests für Schemas

```typescript
import { pressureCalculationSchema } from '@/types/form-schemas';

describe('pressureCalculationSchema', () => {
  it('should validate correct data', () => {
    const validData = {
      temperatureRange: [10, 12],
      height: 5,
      length: 10,
      thickness: 0.05,
    };

    const result = pressureCalculationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid temperature range', () => {
    const invalidData = {
      temperatureRange: [15, 10], // Max < Min
      height: 5,
      length: 10,
      thickness: 0.05,
    };

    const result = pressureCalculationSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toContain('Minimale Temperatur');
  });
});
```

### Integration Tests

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { useFormValidation } from '@/hooks/useFormValidation';

test('form validation works correctly', async () => {
  render(<MyForm />);

  const heightInput = screen.getByLabelText('Höhe');
  fireEvent.change(heightInput, { target: { value: '-5' } });

  // Warten auf Validierung
  await waitFor(() => {
    expect(screen.getByText('Wert muss positiv sein')).toBeInTheDocument();
  });
});
```

## Erweiterungen

### 1. Neue Validierungsregeln hinzufügen

```typescript
// Neue Schema-Definition
export const advancedSchema = baseSchema.extend({
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Ungültige Telefonnummer'),
  website: z.string().url('Ungültige URL'),
  customField: z
    .string()
    .refine(
      val => customBusinessLogic(val),
      'Benutzerdefinierte Validierung fehlgeschlagen'
    ),
});
```

### 2. Neue Komponenten erstellen

```typescript
// Spezialisierte Komponente
export function ValidatedSelect<T extends FieldValues>({
  name,
  control,
  label,
  options,
  ...props
}: ValidatedSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <select {...field} {...props}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    />
  );
}
```

### 3. Internationalisierung

```typescript
// Mehrsprachige Fehlermeldungen
const errorMessages = {
  de: {
    required: 'Dieses Feld ist erforderlich',
    invalid: 'Ungültiger Wert',
  },
  en: {
    required: 'This field is required',
    invalid: 'Invalid value',
  },
};

export const localizedSchema = z.object({
  field: z.string().min(1, errorMessages.de.required),
});
```

## Troubleshooting

### Häufige Probleme

1. **TypeScript-Fehler bei Control-Typen**

   ```typescript
   // Lösung: any verwenden für komplexe Typen
   control: Control<FormData, any>;
   ```

2. **Validierung funktioniert nicht**

   ```typescript
   // Prüfen: mode ist auf 'onChange' gesetzt
   const form = useForm({
     resolver: zodResolver(schema),
     mode: 'onChange',
   });
   ```

3. **Fehlermeldungen werden nicht angezeigt**
   ```typescript
   // Prüfen: showValidation ist true
   <ValidatedInput
     name="field"
     control={control}
     showValidation={true}
   />
   ```

### Debugging

```typescript
// Debug-Logging aktivieren
const form = useFormValidation({
  schema: mySchema,
  onError: errors => {
    console.log('Validation errors:', errors);
    console.log('Form state:', form.formState);
  },
});
```

## Fazit

Das implementierte Validierungssystem bietet eine robuste, typsichere und benutzerfreundliche Lösung für Formularvalidierung. Durch die Verwendung von Zod-Schemas wird die Typsicherheit gewährleistet, während React Hook Form eine optimale Performance und Benutzererfahrung bietet.

Die modulare Architektur ermöglicht einfache Erweiterungen und Wartung, während die umfassende Dokumentation und Beispiele die Integration in neue Features erleichtern.
