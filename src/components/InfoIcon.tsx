'use client';

import React, { useState, useRef } from 'react';
import { Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InfoIconProps {
  content: string;
  title?: string;
  className?: string;
}

export default function InfoIcon({
  content,
  title,
  className = '',
}: InfoIconProps) {
  const [showInfo, setShowInfo] = useState(false);
  const infoRef = useRef<HTMLDivElement>(null);

  const handleInfoMouseEnter = () => {
    setShowInfo(true);
  };

  const handleInfoMouseLeave = () => {
    setShowInfo(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onMouseEnter={handleInfoMouseEnter}
        onMouseLeave={handleInfoMouseLeave}
        className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        aria-label={title || 'Informationen'}
      >
        <Info className="w-4 h-4" />
      </button>
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            ref={infoRef}
            onMouseEnter={handleInfoMouseEnter}
            onMouseLeave={handleInfoMouseLeave}
            className="absolute right-0 top-8 w-64 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 text-sm z-10"
          >
            <p className="text-slate-600 dark:text-slate-400">{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
