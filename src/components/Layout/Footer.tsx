import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className='bg-white shadow dark:bg-gray-800'>
      <div className='w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
        <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          ©2023
          <Link to='/' className='hover:underline'>
            {t('applicationTitle')}
          </Link>
          {t('RightsReserveFooterLabel')}
        </span>
        <ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
          <li>
            <Link to='/' className='mr-4 hover:underline md:mr-6 '>
              {t('AboutFooterLabel')}
            </Link>
          </li>
          <li>
            <Link to='/' className='mr-4 hover:underline md:mr-6'>
              {t('PrivacyPolicyFooterLabel')}
            </Link>
          </li>
          <li>
            <Link to='/' className='mr-4 hover:underline md:mr-6'>
              {t('LicensingFooterLabel')}
            </Link>
          </li>
          <li>
            <Link to='/' className='hover:underline'>
              {t('ContactingFooterLabel')}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export const MemorizedFooter = memo(Footer);
export default Footer;
