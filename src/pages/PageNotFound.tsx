import { useTranslation } from 'react-i18next';
import { useTitle } from '../hooks';

const PageNotFound = () => {
  const { t } = useTranslation();

  // Set page title
  useTitle('Page not found');

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>{t('pageNotFoundStatusCodeLabel')}</h1>
      <p className='text-xl'>{t('pageNotFoundLabel')}</p>
    </div>
  );
};

export default PageNotFound;
