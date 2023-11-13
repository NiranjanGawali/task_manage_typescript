import { Link, useParams } from 'react-router-dom';
import oceanImage from './../../../src/assets/images/ocean-unsplash.jpg';
import { memo, useEffect, useState } from 'react';
import { useCommonContext, useTaskContext, useTitle } from '../../hooks';
import { MemorizedSpinner } from '../../components';
import { ErrorHandler } from '../../utility';
import { useTranslation } from 'react-i18next';
import LoadingSkeleton, { SkeletonTheme } from 'react-loading-skeleton';

interface TaskTypeParam {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

const TaskDetails = () => {
  // i18n translation
  const { t } = useTranslation();

  // contexts
  const { getTaskById } = useTaskContext();
  const { darkMode } = useCommonContext();

  // router params
  const { id } = useParams();

  // states
  const [task, setTask] = useState<TaskTypeParam | null>(null);
  const [loading, setLoading] = useState(true);

  // Set page title
  useTitle(task?.title ? task.title : 'Task Details');

  // methods
  const fetchTask = async () => {
    if (id) {
      try {
        let data = await getTaskById(id);
        setTask(data);
      } catch (err: any) {
        ErrorHandler(err);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchTask();
    }, 1000);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]); // eslint-disable-line

  return (
    <main>
      <div>{!task && <MemorizedSpinner />}</div>
      <div className='flex mt-20 h-96'>
        <div className='flex-grow w-1/2'>
          <div className='h-full'>
            <div className='w-full h-full'>
              {loading ? (
                <SkeletonTheme
                  baseColor={darkMode ? '#202020' : ''}
                  highlightColor={darkMode ? '#444' : ''}
                >
                  <LoadingSkeleton className='w-full h-full dark:bg-gray-800' />
                </SkeletonTheme>
              ) : (
                <img
                  className='h-full w-full object-cover rounded-lg'
                  src={oceanImage}
                  alt='Ocean'
                />
              )}
            </div>
          </div>
        </div>
        <div className='flex-grow p-4 w-1/2 bg-slate-50 dark:bg-black rounded-lg'>
          <div className='h-96 overflow-auto'>
            {loading ? (
              <SkeletonTheme
                baseColor={darkMode ? '#202020' : ''}
                highlightColor={darkMode ? '#444' : ''}
              >
                <LoadingSkeleton className='dark:bg-gray-800' height={40} />
                <LoadingSkeleton className='dark:bg-gray-800' height={260} />
                <LoadingSkeleton className='dark:bg-gray-800' height={30} />
              </SkeletonTheme>
            ) : (
              <>
                <h2 className='text-2xl font-bold text-slate-900 dark:text-white'>
                  {task?.title}
                </h2>
                <p className='text-base text-slate-900 dark:text-white mt-2'>
                  {task?.description}
                </p>
                <span className='flex justify-end pr-2 underline mt-5 mb-4 cursor-pointer text-slate-900 dark:text-white'>
                  {task?.createdAt
                    ? new Date(task?.createdAt).toLocaleString()
                    : ''}
                </span>
              </>
            )}
          </div>
          <Link
            to='/dashboard'
            className='flex items-center justify-center mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          >
            {t('backToTaskListLabel')}
          </Link>
        </div>
      </div>
    </main>
  );
};

export const memorizedTaskDetails = memo(TaskDetails);
export default TaskDetails;
