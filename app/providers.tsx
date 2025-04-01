'use client';

import React, { useState, useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export function Providers({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // Evitar problemas de hidratación con el tema
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </NextThemesProvider>
  );
} 