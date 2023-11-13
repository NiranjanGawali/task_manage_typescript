import { FormEvent, memo, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useTaskContext, useCommonContext } from '../../hooks';
import { v4 as v4uuid } from 'uuid';
import { ErrorHandler } from '../../utility';
import { useTranslation } from 'react-i18next';

type AddTaskProps = {
  isOpen: boolean;
  closeModal: any;
};

const AddTask = ({ isOpen, closeModal }: AddTaskProps) => {
  // i18n translation
  const { t } = useTranslation();

  // contexts
  const { createTask, editTask } = useTaskContext();
  const { showToaster, editableTask, setShowSpinner } = useCommonContext();

  // states
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let initialObject = {
    title: editableTask ? editableTask.title : '',
    description: editableTask ? editableTask.description : '',
  };
  const [taskForm, setTaskForm] = useState(initialObject);

  useEffect(() => {
    if (editableTask) {
      setTaskForm({
        title: editableTask.title,
        description: editableTask.description,
      });
    } else {
      setTaskForm({
        title: '',
        description: '',
      });
    }
  }, [editableTask]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Modal custom style
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.40  )',
    },
    content: {
      height: windowWidth < 768 ? '500px' : '500px',
      width: windowWidth < 768 ? '300px' : '350px',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
      zIndex: 100,
    },
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setShowSpinner(true);

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();
      if (editableTask) {
        editTask({
          ...editableTask,
          title: taskForm.title,
          description: taskForm.description,
        });
        showToaster('Task edited successfully !!!');
      } else {
        createTask({ ...taskForm, id: v4uuid(), createdAt: formattedDate });
        showToaster('Task added successfully !!!');
      }
      closeModal();
      setTaskForm(initialObject);
      setTimeout(() => {
        setShowSpinner(false);
      }, 1000);
    } catch (error: any) {
      ErrorHandler(error);
      setShowSpinner(false);
    }
  };

  const handleCloseModal = () => {
    setTaskForm(initialObject);
    closeModal();
  };

  const isFormEmpty = taskForm.title === '' || taskForm.description === '';

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel='Add Task Popup'
      ariaHideApp={false}
      style={customStyles}
    >
      <div className={`bg-white dark:bg-slate-900 p-6`}>
        <h2 className='text-center text-lg font-bold underline mb-4 dark:text-slate-100 text-black'>
          {!editableTask ? t('addTaskButtonLabel') : t('editTaskButtonLabel')}
          {/* {t('addTaskButtonLabel')} */}
        </h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='mb-6'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              {t('titleFormLabel')}
            </label>
            <input
              type='text'
              id='base-input'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              value={taskForm.title}
              onChange={(e) =>
                setTaskForm({ ...taskForm, title: e?.target.value })
              }
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              {t('descriptionFormLabel')}
            </label>
            <textarea
              id='base-input'
              rows={9}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              value={taskForm.description}
              onChange={(e) =>
                setTaskForm({ ...taskForm, description: e?.target.value })
              }
              required
            ></textarea>
          </div>
          <div className='flex justify-around my-3'>
            <button
              type='button'
              className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
              onClick={handleCloseModal}
            >
              {t('closeButtonLabel')}
            </button>
            <button
              type='submit'
              className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:cursor-not-allowed'
              disabled={isFormEmpty}
            >
              {t('submitButtonLabel')}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export const MemorizedAddTask = memo(AddTask);
export default AddTask;
