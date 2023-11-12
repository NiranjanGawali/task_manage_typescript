import { useEffect } from 'react';
import { useThrottle } from '../../hooks';

function Throttling() {
  // Its demo throttling functionality not related to application.
  function handleMouseMove(aa: string) {
    console.log('api call to do some actions => ', aa);
  }

  const demoFun = useThrottle(handleMouseMove, 1000);

  useEffect(() => {
    const handleMouseMoveWithThrottle = (event: MouseEvent) => {
      demoFun('hello');
    };

    window.addEventListener('mousemove', handleMouseMoveWithThrottle);

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveWithThrottle);
    };
  }, [demoFun]);

  return <div></div>;
}

export default Throttling;
