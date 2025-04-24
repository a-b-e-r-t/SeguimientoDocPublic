import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Verificamos si hay un tema guardado en el localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Si no hay preferencia, usamos la preferencia por defecto del sistema
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    // Aplicamos la clase 'dark' o 'light' al body cuando el modo cambia
    if (isDarkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <button
      className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      {isDarkMode ? (
        <MoonIcon className="h-5 w-5" />  // Icono de luna en modo oscuro
      ) : (
        <SunIcon className="h-5 w-5" />  // Icono de sol en modo claro
      )}
    </button>
  );
};

export default DarkModeToggle;
