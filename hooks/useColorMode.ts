"use client";

import { useState, useEffect } from 'react';

type ColorMode = 'light' | 'dark';

const useColorMode = (): [ColorMode, (mode: ColorMode) => void] => {
  const [colorMode, setColorMode] = useState<ColorMode>('light');

  useEffect(() => {
    // Check local storage or system preference
    const savedMode = localStorage.getItem('color-mode') as ColorMode;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialMode = savedMode || (prefersDark ? 'dark' : 'light');
    setColorMode(initialMode);
    document.documentElement.classList.toggle('dark', initialMode === 'dark');
  }, []);

  const updateColorMode = (mode: ColorMode) => {
    setColorMode(mode);
    localStorage.setItem('color-mode', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  };

  return [colorMode, updateColorMode];
};

export default useColorMode;
