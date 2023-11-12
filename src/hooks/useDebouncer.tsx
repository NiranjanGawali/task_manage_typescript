import { useEffect } from 'react';

const useDebouncer = (func: any, searchField: string, delay: number = 1000) => {
  useEffect(() => {
    let debounceTimer: any;
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      if (searchField) func(searchField);
    }, delay);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchField, delay]); // eslint-disable-line
};

export default useDebouncer;
