const useTitle = (pageTitle: string) => {
  document.title = `${pageTitle} - Task Manager`;
  return null;
};

export default useTitle;
