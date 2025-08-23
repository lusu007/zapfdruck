'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function ExampleCalculation() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
          <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
            Beispielrechnung
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            So funktioniert die Berechnung
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl border border-teal-200 dark:border-teal-800"
      >
        <div className="space-y-3">
          <div>
            <h5 className="font-semibold text-slate-900 dark:text-white mb-2">
              Beispiel: 20°C, 3m Höhe, 6m Leitung (10mm)
            </h5>
          </div>

          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">
                  Sättigungsdruck:
                </span>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  2,0 bar
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">
                  Höhenunterschied:
                </span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  + 0,3 bar
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">
                  Leitungslänge:
                </span>
                <span className="font-medium text-purple-600 dark:text-purple-400">
                  + 0,1 bar
                </span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-900 dark:text-white">
                    Zapfdruck:
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400">
                    = 2,4 bar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
