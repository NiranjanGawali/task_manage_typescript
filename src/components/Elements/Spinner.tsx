import { memo } from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { useCommonContext } from '../../hooks';

const Spinner = () => {
  // contexts
  const { darkMode } = useCommonContext();

  return (
    <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50'>
      <div className='fixed top-0 left-0 w-screen h-screen bg-opacity-50 backdrop-filter backdrop-blur-sm z-50 pointer-events-none' />
      <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color={darkMode ? '#fff' : '#4fa94d'}
          ariaLabel='ball-triangle-loading'
          visible={true}
        />
      </div>
    </div>
  );
};

export const MemorizedSpinner = memo(Spinner);
export default Spinner;
