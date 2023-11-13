import { useEffect, useState } from 'react';
import { MemorizedSpinner, MemorizedTask } from '../../components';
import { useCommonContext, useTaskContext, useTitle } from '../../hooks';
import { ErrorHandler } from '../../utility';
import { useTranslation } from 'react-i18next';

const Tasks = () => {
  // i18n translation
  const { t } = useTranslation();

  // Set page title
  useTitle('Home');

  // States
  const [loading, setLoading] = useState(true);

  // context
  const { getTasks, taskList } = useTaskContext();
  const { setShowSpinner } = useCommonContext();

  const getTasksCall = async () => {
    try {
      await getTasks();
    } catch (err: any) {
      ErrorHandler(err);
    }
  };

  useEffect(() => {
    getTasksCall();
    setTimeout(() => {
      setLoading(false);
      setShowSpinner(false);
    }, 2000);
  }, []); // eslint-disable-line

  return (
    <main>
      <div className='flex flex-wrap mx-4 justify-center'>
        {taskList.length === 0 && (
          <div className='mt-20'>
            {!loading && (
              <h1 className='text-center text-2xl font-medium dark:text-white'>
                {t('noTasksFound')}
              </h1>
            )}
            {loading && <MemorizedSpinner />}
          </div>
        )}
        {taskList.length > 0 &&
          taskList.map((t) => (
            <div key={t.id} className='w-full md:w-1/3 sm:w-1/2 p-5'>
              <MemorizedTask key={t.title} task={t} />
            </div>
          ))}
      </div>
    </main>
  );
};

export default Tasks;
