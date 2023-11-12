import { toast } from 'react-toastify';

const ErrorHandler = (error: any): void => {
  if (error) {
    const errorMsg = error?.response?.data
      ? error.response.data
      : error.message;

    toast.error(errorMsg);
  }
};

export default ErrorHandler;
