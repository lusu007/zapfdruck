'use client';

import { motion } from 'framer-motion';
import { Calculator, AlertTriangle, CheckCircle } from 'lucide-react';
import { usePressureStore } from '@/store/pressureStore';

export default function ResultDisplay() {
  const { result, calculatePressure } = usePressureStore();

  const handleCalculate = () => {
    calculatePressure();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
          <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
            Ihr optimaler Zapfdruck
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Berechnetes Ergebnis
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {result ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800"
          >
            <div className="text-center space-y-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full w-fit mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>

              {result.resultMin === result.resultMax ? (
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Der optimale Zapfdruck bei Ihren Gegebenheiten beträgt:
                  </p>
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                    {result.resultMin} bar
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Der optimale Zapfdruck bei Ihren Gegebenheiten beträgt:
                  </p>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      Minimum: {result.resultMin} bar
                    </div>
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      Maximum: {result.resultMax} bar
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700 text-center"
          >
            <p className="text-slate-500 dark:text-slate-400">
              Geben Sie alle Werte ein und klicken Sie auf &quot;Berechnen&quot;
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800"
        >
          <div className="flex items-start gap-3">
            <div className="p-1 bg-amber-100 dark:bg-amber-900/30 rounded">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <p className="text-sm text-amber-800 dark:text-amber-200">
              Dieser Druck sollte in der Praxis auf keinen Fall unterschritten
              werden. Im Zweifelsfall sollte der Druck erhöht werden.
            </p>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Calculator className="w-5 h-5 inline mr-2" />
          Druck berechnen
        </motion.button>
      </div>
    </div>
  );
}
