import React, { memo } from 'react';
import { BallTriangle } from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color='#4fa94d'
        ariaLabel='ball-triangle-loading'
        visible={true}
      />
    </div>
  );
};

export const MemorizedSpinner = memo(Spinner);
export default Spinner;
