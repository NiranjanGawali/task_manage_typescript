import { ReactNode, createContext, useState } from 'react';
import { TaskService } from '../services';
import { TaskContextValues, TaskType } from '../utility';

const initialTaskState: TaskType = {
  id: '',
  title: '',
  description: '',
  createdAt: '',
  userId: '',
};

const initialTaskContextValue: TaskContextValues = {
  taskList: [initialTaskState],
  setTaskList: () => {},
  createTask: async (task: TaskType) => {},
  deleteTask: async (id: string) => {},
  editTask: async (task: TaskType) => {},
  getTasks: async () => {},
  searchTask: async (q: string) => {},
  getTaskById: async (id: string) => initialTaskState,
};

const TaskContext = createContext<TaskContextValues>(initialTaskContextValue);

const taskService = new TaskService();

const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const [taskList, setTaskList] = useState<TaskType[]>([]);

  const getTasks = async () => {
    try {
      const taskData = await taskService.getTasks();
      taskData ? setTaskList(taskData) : setTaskList([]);
    } catch (error) {
      setTaskList([]);
      throw error;
    }
  };

  const createTask = async (task: TaskType) => {
    try {
      const taskCreationResponse = await taskService.createTask(task);
      setTaskList([taskCreationResponse, ...taskList]);
    } catch (error) {
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const deleteResponse = await taskService.deleteTask(id);
      if (deleteResponse.statusText === 'OK') {
        const updatedTaskList = taskList.filter((task) => task.id !== id);
        setTaskList(updatedTaskList);
      }
    } catch (error) {
      throw error;
    }
  };

  const editTask = async (task: TaskType) => {
    try {
      const taskResponse = await taskService.editTask(task);
      if (taskResponse) {
        // getTasks();
        const updatedTaskList = [...taskList];
        for (const singleTask of updatedTaskList) {
          if (singleTask.id === task.id) {
            singleTask.title = task.title;
            singleTask.description = task.description;
          }
        }
        setTaskList(updatedTaskList);
      }
    } catch (error) {
      throw error;
    }
  };

  const searchTask = async (searchParameter: string) => {
    try {
      const taskResponse = await taskService.searchTask(searchParameter);
      setTaskList(taskResponse);
    } catch (error) {
      throw error;
    }
  };

  const getTaskById = async (id: string) => {
    try {
      return await taskService.getTaskById(id);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    taskList,
    setTaskList,
    createTask,
    deleteTask,
    editTask,
    getTasks,
    searchTask,
    getTaskById,
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export { TaskContext, TaskContextProvider };
