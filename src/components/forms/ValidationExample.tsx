'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useFormValidation } from '@/hooks/useFormValidation';
import { ValidatedForm, FormSection } from './ValidatedForm';
import { ValidatedInput, ValidatedNumberInput } from './ValidatedInput';
import { ValidatedRangeInput } from './ValidatedRangeInput';
import {
  pressureCalculationSchema,
  extendedPressureCalculationSchema,
  settingsSchema,
  PressureCalculationFormData,
  ExtendedPressureCalculationFormData,
  SettingsFormData,
} from '@/types/form-schemas';
import { toast } from 'react-hot-toast';

export default function ValidationExample() {
  // Basic pressure calculation form
  const basicForm = useFormValidation<PressureCalculationFormData>({
    schema: pressureCalculationSchema,
    defaultValues: {
      temperatureRange: [10, 12],
      height: 0,
      length: 0,
      thickness: 0.01,
    },
    onSuccess: _data => {
      toast.success('Basic form submitted successfully!');
      // Handle basic form data
    },
  });

  // Extended pressure calculation form
  const extendedForm = useFormValidation<ExtendedPressureCalculationFormData>({
    schema: extendedPressureCalculationSchema,
    defaultValues: {
      temperatureRange: [8, 10],
      height: 2,
      length: 5,
      thickness: 0.05,
      beerType: 'lager',
      carbonationLevel: 2.5,
      systemEfficiency: 0.85,
    },
    onSuccess: _data => {
      toast.success('Extended form submitted successfully!');
      // Handle extended form data
    },
  });

  // Settings form
  const settingsForm = useFormValidation<SettingsFormData>({
    schema: settingsSchema,
    defaultValues: {
      pressureUnit: 'bar',
      temperatureUnit: 'celsius',
      decimalPlaces: 2,
      autoCalculate: true,
    },
    onSuccess: _data => {
      toast.success('Settings saved successfully!');
      // Handle settings data
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Zod Validation Examples
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Demonstrating type-safe form validation with Zod schemas
        </p>
      </div>

      {/* Basic Form Example */}
      <FormSection
        title="Basic Pressure Calculation"
        description="Simple form with basic validation rules"
        collapsible
        defaultExpanded
      >
        <ValidatedForm
          form={basicForm}
          onSubmit={_data => {
            toast.success('Basic calculation completed!');
            // Handle basic calculation
          }}
          submitButtonText="Calculate Basic"
          showValidationSummary
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ValidatedRangeInput
              name="temperatureRange"
              control={basicForm.control}
              label="Temperature Range"
              min={-10}
              max={50}
              step={0.1}
              unit="°C"
              required
            />

            <ValidatedNumberInput
              name="height"
              control={basicForm.control}
              label="Height"
              placeholder="Enter height"
              unit="m"
              min={0}
              max={100}
              step={0.1}
              required
            />

            <ValidatedNumberInput
              name="length"
              control={basicForm.control}
              label="Length"
              placeholder="Enter length"
              unit="m"
              min={0}
              max={1000}
              step={0.1}
              required
            />

            <ValidatedNumberInput
              name="thickness"
              control={basicForm.control}
              label="Thickness"
              placeholder="Enter thickness"
              unit="m"
              min={0.001}
              max={1}
              step={0.001}
              required
            />
          </div>
        </ValidatedForm>
      </FormSection>

      {/* Extended Form Example */}
      <FormSection
        title="Extended Pressure Calculation"
        description="Advanced form with additional fields and validation"
        collapsible
        defaultExpanded={false}
      >
        <ValidatedForm
          form={extendedForm}
          onSubmit={_data => {
            toast.success('Extended calculation completed!');
            // Handle extended calculation
          }}
          submitButtonText="Calculate Extended"
          showValidationSummary
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ValidatedRangeInput
              name="temperatureRange"
              control={extendedForm.control}
              label="Temperature Range"
              min={-10}
              max={50}
              step={0.1}
              unit="°C"
              required
            />

            <ValidatedNumberInput
              name="height"
              control={extendedForm.control}
              label="Height"
              placeholder="Enter height"
              unit="m"
              min={0}
              max={100}
              step={0.1}
              required
            />

            <ValidatedNumberInput
              name="length"
              control={extendedForm.control}
              label="Length"
              placeholder="Enter length"
              unit="m"
              min={0}
              max={1000}
              step={0.1}
              required
            />

            <ValidatedNumberInput
              name="thickness"
              control={extendedForm.control}
              label="Thickness"
              placeholder="Enter thickness"
              unit="m"
              min={0.001}
              max={1}
              step={0.001}
              required
            />

            <ValidatedInput
              name="beerType"
              control={extendedForm.control}
              label="Beer Type"
              placeholder="Select beer type"
              required
            />

            <ValidatedNumberInput
              name="carbonationLevel"
              control={extendedForm.control}
              label="Carbonation Level"
              placeholder="Enter carbonation"
              unit="Vol%"
              min={1.5}
              max={4.0}
              step={0.1}
            />

            <ValidatedNumberInput
              name="systemEfficiency"
              control={extendedForm.control}
              label="System Efficiency"
              placeholder="Enter efficiency"
              unit="%"
              min={0.5}
              max={1.0}
              step={0.01}
            />
          </div>
        </ValidatedForm>
      </FormSection>

      {/* Settings Form Example */}
      <FormSection
        title="Application Settings"
        description="Settings form with different input types"
        collapsible
        defaultExpanded={false}
      >
        <ValidatedForm
          form={settingsForm}
          onSubmit={_data => {
            toast.success('Settings updated successfully!');
            // Handle settings update
          }}
          submitButtonText="Save Settings"
          showValidationSummary
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ValidatedInput
              name="pressureUnit"
              control={settingsForm.control}
              label="Pressure Unit"
              placeholder="Select pressure unit"
              required
            />

            <ValidatedInput
              name="temperatureUnit"
              control={settingsForm.control}
              label="Temperature Unit"
              placeholder="Select temperature unit"
              required
            />

            <ValidatedNumberInput
              name="decimalPlaces"
              control={settingsForm.control}
              label="Decimal Places"
              placeholder="Enter decimal places"
              min={0}
              max={4}
              step={1}
              required
            />

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="autoCalculate"
                {...settingsForm.register('autoCalculate')}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="autoCalculate"
                className="text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Auto Calculate
              </label>
            </div>
          </div>
        </ValidatedForm>
      </FormSection>

      {/* Validation Features Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
          Validation Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-200">
          <div>
            <h4 className="font-medium mb-2">Type Safety</h4>
            <ul className="space-y-1">
              <li>• Zod schema validation</li>
              <li>• TypeScript type inference</li>
              <li>• Compile-time error checking</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Real-time Validation</h4>
            <ul className="space-y-1">
              <li>• Instant feedback</li>
              <li>• Visual indicators</li>
              <li>• Error summaries</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Custom Validation</h4>
            <ul className="space-y-1">
              <li>• Range validation</li>
              <li>• Cross-field validation</li>
              <li>• Custom error messages</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">User Experience</h4>
            <ul className="space-y-1">
              <li>• Smooth animations</li>
              <li>• Toast notifications</li>
              <li>• Responsive design</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
