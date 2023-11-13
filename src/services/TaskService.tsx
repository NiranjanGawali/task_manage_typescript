import {
  TASK_PATH,
  GET_TASKS_PATH,
  TaskDeleteSuccessStatus,
  TaskType,
} from '../utility';
import axios from './../http-common';

class TaskService {
  private baseUrl = `${process.env.REACT_APP_BASE_URL}/600/tasks`;

  public async getTasks(): Promise<TaskType[] | any> {
    const userId = await this.getSession();
    try {
      const response = await axios.get<TaskType[] | any>(
        `${GET_TASKS_PATH}&userId=${userId}`
      );
      return response?.data;
    } catch (error: any) {
      console.error('Error while fetching tasks:', error);
      throw error;
    }
  }

  public async createTask(task: TaskType): Promise<TaskType | any> {
    try {
      const userId = await this.getSession();
      const userTask = { ...task, userId: userId };
      const response = await axios.post(TASK_PATH, userTask);
      return response.data;
    } catch (error: any) {
      console.error('Error while creating a task:', error);
      throw error;
    }
  }

  public async deleteTask(id: string): Promise<TaskDeleteSuccessStatus | any> {
    try {
      const response = await axios.delete(`${TASK_PATH}/${id}`);
      return { status: response.status, statusText: response.statusText };
    } catch (error: any) {
      console.error('Error while deleting a task:', error);
      throw error;
    }
  }

  public async editTask(task: TaskType): Promise<TaskType | any> {
    try {
      const response = await axios.put(`${TASK_PATH}/${task.id}`, task);
      return response.data;
    } catch (error: any) {
      console.error('Error while editing a task:', error);
      throw error;
    }
  }

  public async searchTask(q: string): Promise<TaskType[] | any> {
    try {
      const userId = await this.getSession();
      const response = await axios.get(`${TASK_PATH}?q=${q}&userId=${userId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error while searching a task:', error);
      throw error;
    }
  }

  public async getTaskById(id: string): Promise<TaskType | any> {
    try {
      const response = await axios.get(`${TASK_PATH}/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Error while getting details of a task:', error);
      throw error;
    }
  }

  public getSession = async () => {
    const userId = JSON.parse(sessionStorage.getItem('userId') || 'null');
    return userId;
  };
}

export default TaskService;
