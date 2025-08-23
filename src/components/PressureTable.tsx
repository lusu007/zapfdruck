'use client';

import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

const PRESSURE_DATA = [
  { temperature: 5, pressure: 0.8 },
  { temperature: 10, pressure: 1.2 },
  { temperature: 15, pressure: 1.6 },
  { temperature: 20, pressure: 2.0 },
  { temperature: 25, pressure: 2.4 },
];

export default function PressureTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
            Sättigungsdruck
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Drucktabelle nach Temperatur
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700"
      >
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">
                Temp.
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-white">
                Druck
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {PRESSURE_DATA.map((row, index) => (
              <motion.tr
                key={row.temperature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">
                  {row.temperature}°C
                </td>
                <td className="px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400">
                  {row.pressure} bar
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
