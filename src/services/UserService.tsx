import {
  GET_USER_DETAILS,
  LOGIN_API_PATH,
  REGISTER_API_PATH,
  UPDATE_USER_DETAILS,
  UserData,
  UserType,
} from '../utility';
import axios from './../http-common';

class UserService {
  public async login(user: UserType): Promise<UserData | any> {
    try {
      const response = await axios.post<UserData>(LOGIN_API_PATH, user);

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
      const response = await axios.post<UserData>(REGISTER_API_PATH, user);
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
      const response = await axios.get<UserType>(`${GET_USER_DETAILS}/${id}`);
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
      const response = await axios.put<UserData>(
        `${UPDATE_USER_DETAILS}/${user.id}`,
        { password: user.password, email: user.email, name: user.name }
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
}

export default UserService;
