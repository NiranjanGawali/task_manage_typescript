const useThrottle = (callback: any, delay: number = 1000) => {
  let shouldWait = false;

  return (...args: any) => {
    if (shouldWait) return;
    callback(...args);
    shouldWait = true;
    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
};

export default useThrottle;
