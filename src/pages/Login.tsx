import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext, useTitle, useCommonContext } from '../hooks';
import { MemorizedDarkMode } from '../components';
import { ErrorHandler } from '../utility';
import { useTranslation } from 'react-i18next';

const Login = () => {
  // Set page title
  useTitle('Login');

  // Contexts
  const { setShowSpinner } = useCommonContext();

  // i18n translation
  const { t } = useTranslation();

  // Router navigate
  const navigate = useNavigate();

  // states
  const { login } = useUserContext();
  const initialLoginForm = {
    email: '',
    password: '',
  };
  const [loginForm, setLoginForm] = useState(initialLoginForm);

  // methods
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await login(loginForm);
      if (response.email) {
        navigate('/dashboard');
      }
    } catch (error: any) {
      ErrorHandler(error);
    }
  };

  const handleFormChange = (fieldName: string, value: string) => {
    setLoginForm({ ...loginForm, [fieldName]: value });
  };

  const handleGuestUser = async () => {
    try {
      setShowSpinner(true);
      const autDetails = {
        email: process.env.REACT_APP_GUEST_LOGIN,
        password: process.env.REACT_APP_GUEST_PASSWORD,
      };
      const response = await login(autDetails);
      if (response.email) {
        navigate('/dashboard');
      }
    } catch (error) {
      setShowSpinner(false);

      ErrorHandler(error);
    }
  };

  return (
    <main className='h-screen flex justify-center items-center'>
      <div className='m-auto w-full border p-5 rounded-2xl shadow-lg sm:w-2/6 bg-slate-50 dark:bg-black'>
        <div className='flex justify-end border-0'>
          <MemorizedDarkMode />
        </div>
        <form onSubmit={handleSubmit}>
          <div className='text-center mt-5 mb-8'>
            <h1 className='text-2xl font-medium text-gray-900 dark:text-white'>
              {t('loginWindowTitleLabel')}
            </h1>
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
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder={t('emailFormPlaceholderLabel')}
              value={loginForm.email}
              onChange={(e) => handleFormChange('email', e.target.value)}
              required
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
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder={t('passwordFormPlaceholderLabel')}
              value={loginForm.password}
              onChange={(e) => handleFormChange('password', e.target.value)}
              required
            />
          </div>
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
                onClick={() => setLoginForm(initialLoginForm)}
              >
                {t('clearButtonLabel')}
              </button>
            </div>
            <div className='m-auto mt-2'>
              <button
                type='button'
                className='py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-green-400 rounded-lg border border-gray-200 hover:bg-green-600 hover:text-black-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:text-black dark:border-gray-600 dark:hover:text-white dark:hover:bg-green-600'
                onClick={handleGuestUser}
              >
                {t('signInAsGuestButtonLabel')}
              </button>
            </div>
            <div className='text-center mt-5 text-sm underline font-bold text-blue-400 hover:text-blue-700'>
              <Link to='/register' title='Go to Register page'>
                {t('registerWindowTitleLabel')}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
