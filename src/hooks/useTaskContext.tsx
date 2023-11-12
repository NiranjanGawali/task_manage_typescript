import { useContext } from 'react';
import { TaskContext } from '../contexts';

const useTaskContext = () => {
  const context = useContext(TaskContext);
  return context;
};

export default useTaskContext;
