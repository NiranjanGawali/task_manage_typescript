import { useContext } from 'react';
import { CommonContext } from '../contexts';

const useCommonContext = () => {
  const context = useContext(CommonContext);
  return context;
};

export default useCommonContext;
