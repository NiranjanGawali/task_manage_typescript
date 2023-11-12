import axios from 'axios';
import { UserData, UserType } from '../utility';

class UserService {
  private baseUrl = `${process.env.REACT_APP_BASE_URL}`;

  public async login(user: UserType): Promise<UserData | any> {
    try {
      const response = await axios.post<UserData>(
        `${this.baseUrl}/login`,
        user
      );

      if (response.status !== 200) {
        const error = new Error(
          `Request failed with status: ${response.status}. Message: ${response.statusText}`
        );
        throw error;
      }

      const userData = response.data;
      if (userData?.accessToken) {
        sessionStorage.setItem(
          'accessToken',
          JSON.stringify(userData?.accessToken)
        );
        sessionStorage.setItem('userId', JSON.stringify(userData?.user.id));
      }

      return response?.data;
    } catch (error: any) {
      console.error('Error while logging user:', error);
      throw error;
    }
  }

  public async register(user: UserType): Promise<UserData | any> {
    try {
      const response = await axios.post<UserData>(
        `${this.baseUrl}/register`,
        user
      );
      if (response.status !== 201) {
        const error = new Error(
          `Request failed with status: ${response.status}. Message: ${response.statusText}`
        );
        throw error;
      }

      const userData = response.data;
      if (userData?.accessToken) {
        sessionStorage.setItem(
          'accessToken',
          JSON.stringify(userData?.accessToken)
        );
        sessionStorage.setItem('userId', JSON.stringify(userData?.user.id));
      }

      return response?.data;
    } catch (error: any) {
      console.error('Error while logging user:', error);
      throw error;
    }
  }

  public async getUserDetails(id: string): Promise<UserType | any> {
    try {
      const userToken = await this.getSession();

      const response = await axios.get<UserType>(
        `${this.baseUrl}/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken.accessToken}`,
          },
        }
      );
      if (response.status !== 200) {
        const error = new Error(
          `Request failed with status: ${response.status}. Message: ${response.statusText}`
        );
        throw error;
      }

      const userData = response.data;
      return userData;
    } catch (error: any) {
      console.error('Error while fetching user details:', error);
      throw error;
    }
  }

  public async updateUser(user: UserType): Promise<UserData | any> {
    try {
      const userToken = await this.getSession();

      const response = await axios.put<UserData>(
        `${this.baseUrl}/600/users/${user.id}`,
        { password: user.password, email: user.email, name: user.name },
        {
          headers: {
            Authorization: `Bearer ${userToken.accessToken}`,
          },
        }
      );
      if (response.status !== 200) {
        const error = new Error(
          `Request failed with status: ${response.status}. Message: ${response.statusText}`
        );
        throw error;
      }
      return response?.data;
    } catch (error: any) {
      console.error('Error while registering user:', error);
      throw error;
    }
  }

  public async logout(): Promise<void> {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userId');
  }

  public getSession = async () => {
    const accessToken = JSON.parse(
      sessionStorage.getItem('accessToken') || 'null'
    );
    const userId = JSON.parse(sessionStorage.getItem('userId') || 'null');
    return { accessToken, userId };
  };
}

export default UserService;
