// ThemeContext.js
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const resetTheme = () => {
    setIsDarkMode(false);
  };
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
