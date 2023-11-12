import { memo, useCallback, useEffect, useState } from 'react';
import profilePhoto from './../../assets/images/profile-pic.webp';
import { useUserContext } from '../../hooks';
import { UserType, ErrorHandler } from '../../utility';
import { useLocation, useNavigate } from 'react-router-dom';
import { MemorizedConfirmPopup } from '../Modals/ConfirmPopup';

import { useTranslation } from 'react-i18next';

const Dropdown = () => {
  // i18n translation
  const { t, i18n } = useTranslation();

  // navigate variable
  const navigate = useNavigate();

  const { pathname } = useLocation();

  // states
  const [isUserDropDownOpen, setUserDropDownOpen] = useState(false);
  const [loggedInUserDetails, setLoggedInUserDetails] = useState<UserType>({});
  const [logoutConfirmPopup, showLogoutConfirmPopup] = useState(false);
  const [languageSubMenu, showLanguageSubMenu] = useState(false);

  // local variables
  const userIdLocalStorageValue = sessionStorage.getItem('userId');
  const userId: string = userIdLocalStorageValue
    ? JSON.parse(userIdLocalStorageValue)
    : null;

  // user context
  const { logout, getUserDetails, userData } = useUserContext();

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, []); //eslint-disable-line

  useEffect(() => {
    setUserDropDownOpen(false);
  }, [pathname]);

  const fetchUserDetails = async () => {
    try {
      const loggedInUserDetails = await getUserDetails(userId);
      setLoggedInUserDetails(loggedInUserDetails);
    } catch (error: any) {
      ErrorHandler(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId, userData.user.password]); // eslint-disable-line

  const handleUserSetting = () => {
    navigate('/dashboard/user', {
      state: { loggedInUserDetails: loggedInUserDetails },
    });
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    showLanguageSubMenu(false);
    setUserDropDownOpen(false);
  };

  return (
    <div className='flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse px-2 z-50'>
      <button
        type='button'
        className='flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
        id='user-menu-button'
        aria-expanded='false'
        data-dropdown-toggle='user-dropdown'
        data-dropdown-placement='bottom'
        onClick={() => setUserDropDownOpen(!isUserDropDownOpen)}
      >
        <span className='sr-only'>Open user menu</span>
        <img
          className='w-8 h-8 rounded-full'
          src={profilePhoto}
          alt='Profile'
        />
      </button>
      <div
        className={`${
          !isUserDropDownOpen ? 'hidden' : ''
        } absolute z-100 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 right-2 lg:right-10 top-12 mt-10 md:mt-0 lg:mt-0`}
        id='user-dropdown'
      >
        <div className='px-4 py-3'>
          <span className='block text-sm text-gray-900 dark:text-white'>
            {loggedInUserDetails.name}
          </span>
          <span className='block text-sm  text-gray-500 truncate dark:text-gray-400'>
            {loggedInUserDetails.email}
          </span>
        </div>
        <ul className='py-2' aria-labelledby='user-menu-button'>
          <li>
            <span
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer'
              onClick={handleUserSetting}
            >
              {t('userSettingDropdownOptionLabel')}
            </span>
          </li>
          <li>
            <button
              id='doubleDropdownButton'
              data-dropdown-toggle='doubleDropdown'
              data-dropdown-placement='right-start'
              type='button'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer'
              onClick={() => showLanguageSubMenu(!languageSubMenu)}
            >
              {t('changeLanguageLabel')}
              <span>
                <i className='bi bi-chevron-right'></i>
              </span>
            </button>
            <div
              id='doubleDropdown'
              className={`${
                !languageSubMenu ? 'hidden' : ''
              } z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 right-11 absolute mt-1`}
            >
              <ul
                className='py-2 text-sm text-gray-700 dark:text-gray-200'
                aria-labelledby='doubleDropdownButton'
              >
                <li>
                  <span
                    className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
                    onClick={() => handleLanguageChange('en')}
                  >
                    {t('languageEnglishLabel')}
                  </span>
                </li>
                <li>
                  <span
                    className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
                    onClick={() => handleLanguageChange('es')}
                  >
                    {t('languageSpanishLabel')}
                  </span>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <span
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer'
              onClick={() => showLogoutConfirmPopup(true)}
            >
              {t('signOutDropdownOptionLabel')}
            </span>
          </li>
        </ul>
      </div>
      <MemorizedConfirmPopup
        confirmPopup={logoutConfirmPopup}
        showConfirmPopup={showLogoutConfirmPopup}
        handleOperation={handleLogout}
        popupText={t('logoutConfirmPopupLabel')}
      />
    </div>
  );
};
export const MemorizedDropdown = memo(Dropdown);
export default Dropdown;
