import { memo, useEffect } from 'react';
import { useCommonContext } from '../../hooks';

const DarkMode = () => {
  // Contexts
  const { darkMode, setDarkMode } = useCommonContext();

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    sessionStorage.setItem('theme', JSON.stringify(darkMode));
  }, [darkMode]);
  return (
    <div className='mt-2 ml-2'>
      {darkMode ? (
        <span
          className='border p-2 rounded cursor-pointer'
          onClick={() => setDarkMode(!darkMode)}
        >
          <i className='bi bi-moon-fill dark:text-white'></i>
        </span>
      ) : (
        <span
          className='border p-2 rounded cursor-pointer'
          onClick={() => setDarkMode(!darkMode)}
        >
          <i className='bi bi-sun-fill'></i>
        </span>
      )}
    </div>
  );
};

export const MemorizedDarkMode = memo(DarkMode);
export default DarkMode;
