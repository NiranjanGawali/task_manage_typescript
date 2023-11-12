import { ReactNode, createContext, useState } from 'react';
import { CommonContextValues, TaskType } from '../utility';
import { toast } from 'react-toastify';

const initialCommonContextValue: CommonContextValues = {
  showToaster: () => {},
  editableTask: null,
  setEditableTask: () => {},
  popupStatus: false,
  updatePopupStatus: () => {},
};

const CommonContext = createContext<CommonContextValues>(
  initialCommonContextValue
);

const CommonContextProvider = ({ children }: { children: ReactNode }) => {
  const [editableTask, setEditableTask] = useState<TaskType | null>(null);
  const [popupStatus, updatePopupStatus] = useState(false);

  const showToaster = (msg: string) => {
    toast(msg, { autoClose: 1000, position: 'top-right' });
  };

  const value = {
    showToaster,
    editableTask,
    setEditableTask,
    popupStatus,
    updatePopupStatus,
  };
  return (
    <CommonContext.Provider value={value}>{children}</CommonContext.Provider>
  );
};

export { CommonContext, CommonContextProvider };
