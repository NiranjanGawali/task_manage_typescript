import { useContext } from 'react';
import { UserContext } from '../contexts';

const useUserContext = () => {
  const context = useContext(UserContext);
  return context;
};

export default useUserContext;
