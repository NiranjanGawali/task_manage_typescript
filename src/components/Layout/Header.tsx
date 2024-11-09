import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './../../assets/logo/logo512.png';
import { MemorizedAddTask } from '../Modals/AddTask';
import { MemorizedDarkMode } from '../Other/DarkMode';
import { MemorizedSearch } from '../Sections/Search';
import { useCommonContext } from '../../hooks';
import { MemorizedDropdown } from '../Elements/Dropdown';
import { useTranslation } from 'react-i18next';
// import hamburgerSVG from './../../assets/svg/hamburger-menu-svgrepo-com.svg';

const Header = () => {
  // Translation{
  const { t } = useTranslation();
  // States
  const [subMenu, showSubMenu] = useState(false);

  // Methods
  const { updatePopupStatus, popupStatus, setEditableTask } =
    useCommonContext();

  const closeAddTaskPopup = () => {
    updatePopupStatus(false);
  };
  const openAddTaskPopup = () => {
    updatePopupStatus(true);
    setEditableTask(null);
  };

  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-900 sticky top-0 z-100 shadow-xl'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link to='/dashboard' className='flex items-center'>
          <img src={logo} className='h-8 mr-2' alt=' Logo' />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
            {t('applicationTitle')}
          </span>
        </Link>
        <div className='flex md:order-2'>
          {/* <button
            type='button'
            data-collapse-toggle='navbar-search'
            aria-controls='navbar-search'
            aria-expanded='false'
            className='md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1'
            onClick={() => {
              showSubMenu(!subMenu);
            }}
          >
            <svg
              className='w-5 h-5'
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
            <span className='sr-only'>{t('searchInputPlaceholderLabel')}</span>
          </button> */}
          <div className='hidden md:block'>
            <MemorizedSearch />
          </div>
          <MemorizedDarkMode />

          <button
            data-collapse-toggle='navbar-search'
            type='button'
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='navbar-search'
            aria-expanded='false'
            onClick={() => {
              showSubMenu(!subMenu);
            }}
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-5 h-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M1 1h15M1 7h15M1 13h15'
              />
            </svg>
            {/* <img
              src={hamburgerSVG}
              alt='hamburger icon'
              className='w-5 h-5 dark:text-white'
            /> */}
          </button>
          <MemorizedDropdown />
        </div>
        <div
          className={`${
            subMenu ? 'hidden' : ''
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id='navbar-search'
        >
          <div className='md:hidden'>
            <MemorizedSearch />
          </div>
          <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            <li className='p-0.5'>
              <button
                className='block py-2 pl-3 pr-4 text-black bg-blue-200 rounded md:bg-transparent md:text-slate-700 md:p-0 md:dark:text-slate-100 underline hover:text-blue-700 font-bold w-full'
                aria-current='page'
                onClick={openAddTaskPopup}
              >
                <i className='bi bi-plus-circle-fill text-lg mr-2'></i>
                {t('addTaskButtonLabel')}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <MemorizedAddTask isOpen={popupStatus} closeModal={closeAddTaskPopup} />
      </div>
      <hr />
    </nav>
  );
};

export const MemorizedHeader = memo(Header);
export default Header;
