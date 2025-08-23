import { useForm, UseFormProps, FieldValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

import { z } from 'zod';

interface UseFormValidationOptions<T extends FieldValues>
  extends Omit<UseFormProps<T>, 'resolver'> {
  schema: z.ZodSchema<T>;
  onSuccess?: (data: T) => void | Promise<void>;
  onError?: (errors: Record<string, unknown>) => void;
  showToastErrors?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFormValidation<T extends FieldValues>({
  schema,
  onSuccess,
  onError,
  showToastErrors = true,
  ...formOptions
}: UseFormValidationOptions<T>) {
  const form = useForm<T>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any) as any,
    mode: 'onChange', // Validate on change for better UX
    ...formOptions,
  });

  const { handleSubmit, formState } = form;

  const onSubmit = handleSubmit(
    async (data: T) => {
      try {
        if (onSuccess) {
          await onSuccess(data);
        }
      } catch (error) {
        if (showToastErrors) {
          toast.error(
            'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
          );
        }
      }
    },
    errors => {
      if (onError) {
        onError(errors);
      }

      if (showToastErrors) {
        // Show first error in toast
        const firstError = Object.values(errors)[0];
        if (firstError?.message) {
          toast.error(firstError.message as string);
        } else {
          toast.error('Bitte überprüfen Sie Ihre Eingaben.');
        }
      }
    }
  );

  // Helper function to get field error
  const getFieldError = (fieldName: Path<T>): string | undefined => {
    const error = formState.errors[fieldName];
    return error?.message as string | undefined;
  };

  // Helper function to check if field is valid
  const isFieldValid = (fieldName: Path<T>): boolean => {
    return (
      !formState.errors[fieldName] &&
      !!(formState.dirtyFields as Record<string, unknown>)[fieldName]
    );
  };

  // Helper function to check if form is valid
  const isFormValid = formState.isValid;

  // Helper function to check if form is dirty
  const isFormDirty = Object.keys(formState.dirtyFields).length > 0;

  // Helper function to reset form with validation
  const resetForm = (values?: Partial<T>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form.reset(values as any);
  };

  // Helper function to set field value with validation
  const setFieldValue = (fieldName: Path<T>, value: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form.setValue(fieldName, value as any, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return {
    ...form,
    onSubmit,
    getFieldError,
    isFieldValid,
    isFormValid,
    isFormDirty,
    resetForm,
    setFieldValue,
  };
}

// Hook for real-time validation feedback
export function useFieldValidation<T extends FieldValues>(
  form: ReturnType<typeof useFormValidation<T>>,
  fieldName: Path<T>
) {
  const error = form.getFieldError(fieldName);
  const isValid = form.isFieldValid(fieldName);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isDirty = (form.formState.dirtyFields as any)[fieldName];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isTouched = (form.formState.touchedFields as any)[fieldName];

  return {
    error,
    isValid,
    isDirty,
    isTouched,
    hasError: !!error,
    showError: (isDirty || isTouched) && !!error,
  };
}

// Hook for form submission state
export function useFormSubmissionState<T extends FieldValues>(
  form: ReturnType<typeof useFormValidation<T>>
) {
  const { formState } = form;

  return {
    isSubmitting: formState.isSubmitting,
    isSubmitted: formState.isSubmitted,
    isSubmitSuccessful: formState.isSubmitSuccessful,
    submitCount: formState.submitCount,
    isValid: formState.isValid,
    isDirty: Object.keys(formState.dirtyFields).length > 0,
  };
}
