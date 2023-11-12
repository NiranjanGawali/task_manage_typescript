import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserType, ErrorHandler } from '../utility';
import { useUserContext, useCommonContext, useTitle } from '../hooks';
import { useTranslation } from 'react-i18next';

const UserDetails = () => {
  // i18n translation
  const { t } = useTranslation();

  // navigate router
  const navigate = useNavigate();
  const { state } = useLocation();

  const { loggedInUserDetails } = state;

  // Context
  const { updateUser } = useUserContext();
  const { showToaster } = useCommonContext();

  // states
  const [userDetails, setUserDetails] = useState<UserType>({
    ...loggedInUserDetails,
    password: '',
    confirmPassword: '',
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const handleFormChange = (fieldName: string, value: string) => {
    setUserDetails({ ...userDetails, [fieldName]: value });
  };

  // Set page title
  useTitle(userDetails.name ? userDetails.name : 'User Details');

  // methods
  const handleClearForm = () => {
    setUserDetails({
      ...userDetails,
      name: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (userDetails.password !== userDetails.confirmPassword) {
        setPasswordsMatch(false);
        return;
      }
      const result = await updateUser(userDetails);
      if (result) {
        setUserDetails({ ...userDetails, password: '', confirmPassword: '' });
        showToaster('User details updated successfully !!!');
        navigate('/dashboard');
      }
    } catch (error: any) {
      ErrorHandler(error);
    }
  };

  return (
    <main className='flex justify-center items-center p-10 bg-red border-red-100'>
      <div className='m-auto w-full border p-5 rounded-2xl shadow-lg sm:w-2/6 bg-slate-50 dark:bg-black'>
        <form onSubmit={handleUpdate}>
          <div className='mb-6'>
            <label
              htmlFor='name'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              {t('nameFormLabel')}
            </label>
            <input
              type='name'
              id='name'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
              placeholder={t('nameFormPlaceholderLabel')}
              value={userDetails.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
              required
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              {t('emailFormLabel')}
            </label>
            <input
              type='email'
              id='email'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
              placeholder={t('emailFormPlaceholderLabel')}
              value={userDetails.email}
              disabled={true}
              readOnly
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              {t('passwordFormLabel')}
            </label>
            <input
              type='password'
              id='password'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
              placeholder={t('passwordFormPlaceholderLabel')}
              value={userDetails.password}
              onChange={(e) => handleFormChange('password', e.target.value)}
              required
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='repeat-password'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              {t('repeatPasswordFormLabel')}
            </label>
            <input
              type='password'
              id='confirmPassword'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light'
              placeholder={t('confirmPasswordFormPlaceholderLabel')}
              value={userDetails.confirmPassword}
              required
              onChange={(e) =>
                handleFormChange('confirmPassword', e.target.value)
              }
            />
          </div>
          {!passwordsMatch && (
            <p className='text-red-500'>{t('passwordDoNotMatchLabel')}</p>
          )}
          <div className='flex flex-col'>
            <div className='flex justify-around'>
              <button
                type='submit'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
              >
                {t('submitButtonLabel')}
              </button>

              <button
                type='button'
                className='py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                onClick={handleClearForm}
              >
                {t('clearButtonLabel')}
              </button>
            </div>
            <div className='text-center mt-5 text-sm underline font-bold text-blue-400 hover:text-blue-700'>
              <Link to='/dashboard' title='Go to main page'>
                {t('goToMainPageLabel')}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UserDetails;
