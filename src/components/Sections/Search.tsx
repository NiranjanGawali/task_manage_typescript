import React, { ChangeEvent, memo, useState } from 'react';
import { useTaskContext, useDebouncer } from '../../hooks';
import { ErrorHandler } from '../../utility';
import { useTranslation } from 'react-i18next';

const Search = () => {
  // i18n translation
  const { t } = useTranslation();

  // Search context
  const { searchTask, getTasks } = useTaskContext();

  // States
  const [searchField, setSearchField] = useState('');

  // Search method
  useDebouncer(searchTask, searchField);

  // Methods
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      e.preventDefault();
      const query = e.target.value;
      setSearchField(query);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const handleClearSearch = () => {
    try {
      setSearchField('');
      getTasks();
    } catch (error: any) {
      ErrorHandler(error);
    }
  };
  return (
    <div className='relative hidden md:block'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <svg
          className='w-4 h-4 text-gray-500 dark:text-gray-400'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 20 20'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
          />
        </svg>
        <span className='sr-only'>Search icon</span>
      </div>
      <input
        type='text'
        id='search-navbar'
        className={`block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        value={searchField}
        placeholder={t('searchInputPlaceholderLabel')}
        onChange={(e) => handleSearch(e)}
      />
      {searchField && (
        <button
          className='absolute top-1.5 right-0 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg mx-2 bg-gray-50 dark:bg-slate-700 pl-1'
          onClick={handleClearSearch}
        >
          <i className='bi bi-x-circle'></i>
        </button>
      )}
    </div>
  );
};

export const MemorizedSearch = memo(Search);
export default Search;
