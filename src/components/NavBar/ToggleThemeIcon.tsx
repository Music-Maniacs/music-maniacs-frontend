import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../../context/themeContext';

export const ToggleThemeIcon = () => {
  const { theme, toggleTheme } = useTheme();

  return theme === 'dark' ? (
    <FaMoon style={{ cursor: 'pointer' }} onClick={toggleTheme} />
  ) : (
    <FaSun style={{ cursor: 'pointer' }} onClick={toggleTheme} />
  );
};
