import axios from 'axios';
import { TaskDeleteSuccessStatus, TaskType } from '../utility';

class TaskService {
  private baseUrl = `${process.env.REACT_APP_BASE_URL}/600/tasks`;

  public async getTasks(): Promise<TaskType[] | any> {
    const userToken = await this.getSession();
    try {
      const response = await axios.get<TaskType[] | any>(
        `${this.baseUrl}?_sort=createdAt&_order=desc&userId=${userToken.userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken.accessToken}`,
          },
        }
      );
      return response?.data;
    } catch (error: any) {
      console.error('Error while fetching tasks:', error);
      throw error;
    }
  }

  public async createTask(task: TaskType): Promise<TaskType | any> {
    try {
      const userToken = await this.getSession();
      const userTask = { ...task, userId: userToken.userId };
      const response = await axios.post(`${this.baseUrl}`, userTask, {
        headers: {
          Authorization: `Bearer ${userToken.accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error while creating a task:', error);
      throw error;
    }
  }

  public async deleteTask(id: string): Promise<TaskDeleteSuccessStatus | any> {
    try {
      const response = await axios.delete(`${this.baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${(await this.getSession()).accessToken}`,
        },
      });
      return { status: response.status, statusText: response.statusText };
    } catch (error: any) {
      console.error('Error while deleting a task:', error);
      throw error;
    }
  }

  public async editTask(task: TaskType): Promise<TaskType | any> {
    try {
      const response = await axios.put(`${this.baseUrl}/${task.id}`, task, {
        headers: {
          Authorization: `Bearer ${(await this.getSession()).accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error while editing a task:', error);
      throw error;
    }
  }

  public async searchTask(q: string): Promise<TaskType[] | any> {
    try {
      const userToken = await this.getSession();

      const response = await axios.get(
        `${this.baseUrl}?q=${q}&userId=${userToken.userId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken.accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error('Error while searching a task:', error);
      throw error;
    }
  }

  public async getTaskById(id: string): Promise<TaskType | any> {
    try {
      const response = await axios.get(`${this.baseUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${(await this.getSession()).accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error while getting details of a task:', error);
      throw error;
    }
  }

  public getSession = async () => {
    const accessToken = JSON.parse(
      sessionStorage.getItem('accessToken') || 'null'
    );
    const userId = JSON.parse(sessionStorage.getItem('userId') || 'null');
    return { accessToken, userId };
  };
}

export default TaskService;
