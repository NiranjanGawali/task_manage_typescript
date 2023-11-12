import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as v4uuid } from 'uuid';
import { useUserContext, useTitle } from '../hooks';
import { toast } from 'react-toastify';
import { MemorizedDarkMode } from '../components';
import { UserType, ErrorHandler } from '../utility';
import { useTranslation } from 'react-i18next';

const Register = () => {
  // Set page title
  useTitle('Register');

  // i18n translation
  const { t } = useTranslation();

  // navigate router
  const navigate = useNavigate();

  // contexts
  const { register } = useUserContext();

  // states
  const initialLoginForm: UserType = {
    id: '',
    name: '',
    email: '',
    password: '',
  };
  const [registerForm, setRegisterForm] = useState(initialLoginForm);

  // methods
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const response = await register(registerForm);
      if (response.email) {
        toast('User registered successfully!!!');
        navigate('/dashboard');
      }
    } catch (error: any) {
      ErrorHandler(error);
    }
  };

  const handleFormChange = (fieldName: string, value: string) => {
    setRegisterForm({ ...registerForm, [fieldName]: value, id: v4uuid() });
  };

  return (
    <main className='h-screen flex justify-center items-center'>
      <div className='m-auto w-full border p-5 rounded-lg shadow-lg sm:w-2/6 bg-slate-50 dark:bg-black'>
        <div className='flex justify-end'>
          <MemorizedDarkMode />
        </div>
        <form onSubmit={handleSubmit}>
          <div className='text-center mt-5 mb-8'>
            <h1 className='text-2xl font-medium text-gray-900 dark:text-white'>
              {t('registerWindowTitleLabel')}
            </h1>
          </div>
          <div className='mb-6'>
            <label
              htmlFor='name'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              {t('nameFormLabel')}
            </label>
            <input
              type='text'
              id='name'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder={t('nameFormPlaceholderLabel')}
              value={registerForm.name}
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
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder={t('emailFormPlaceholderLabel')}
              value={registerForm.email}
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
              value={registerForm.password}
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
                onClick={() => setRegisterForm(initialLoginForm)}
              >
                {t('clearButtonLabel')}
              </button>
            </div>
            <div className='text-center mt-5 text-sm underline font-bold text-blue-400 hover:text-blue-700 dark:hover:text-blue-100'>
              <Link to='/login' title='Go to login page'>
                {t('loginWindowTitleLabel')}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
