import { useEffect } from 'react';
import { MemorizedTask } from '../../components';
import { useTaskContext } from '../../hooks';
import { ErrorHandler } from '../../utility';
import { useTranslation } from 'react-i18next';

const Home = () => {
  // i18n translation
  const { t } = useTranslation();

  // context
  const { getTasks, taskList } = useTaskContext();

  const getTasksCall = async () => {
    try {
      await getTasks();
    } catch (err: any) {
      ErrorHandler(err);
    }
  };

  useEffect(() => {
    getTasksCall();
  }, []); // eslint-disable-line

  return (
    <main className='dark:bg-black'>
      <div className='flex flex-wrap mx-4 justify-center'>
        {taskList.length === 0 && (
          <div className='mt-20'>
            <h1 className='text-center text-2xl font-medium dark:text-white'>
              {t('noTasksFound')}
            </h1>
          </div>
        )}
        {taskList.length > 0 &&
          taskList.map((t) => (
            <div key={t.id} className='w-full sm:w-1/3 p-5'>
              <MemorizedTask key={t.title} task={t} />
            </div>
          ))}
      </div>
      {/* <div className='fixed bottom-20 right-20 mr-10 mb-10 p-5 bg-yellow-200 rounded-full'>
        ADD
      </div> */}
    </main>
  );
};

export default Home;
