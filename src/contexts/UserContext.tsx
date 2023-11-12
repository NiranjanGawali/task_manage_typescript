import { ReactNode, createContext, useState } from 'react';
import { UserService } from '../services';
import { UserContextValue, UserData, UserType } from '../utility';

const userInitialState: UserType = {
  id: '',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const initialState: UserData = {
  accessToken: '',
  user: userInitialState,
};

const initialStateContextValue: UserContextValue = {
  login: () => Promise.resolve(userInitialState),
  register: () => Promise.resolve(userInitialState),
  logout: () => Promise.resolve(),
  getUserDetails: () => Promise.resolve(userInitialState),
  updateUser: () => Promise.resolve(userInitialState),
  userData: initialState,
};

const UserContext = createContext<UserContextValue>(initialStateContextValue);
const userService = new UserService();

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>(initialState);

  const register = async (user: UserType): Promise<UserType> => {
    try {
      const receivedUserData: UserData = await userService.register(user);
      return receivedUserData.user;
    } catch (error) {
      throw error;
    }
  };

  const login = async (user: UserType): Promise<UserType> => {
    try {
      const receivedUserData: UserData = await userService.login(user);
      return receivedUserData.user;
    } catch (error) {
      throw error;
    }
  };

  const getUserDetails = async (id: string): Promise<UserType> => {
    const receivedUserData = await userService.getUserDetails(id);
    setUserData({ ...userData, user: receivedUserData });
    return receivedUserData;
  };

  const logout = async () => {
    await userService.logout();
    setUserData(initialState);
  };

  const updateUser = async (user: UserType) => {
    const receivedUserData = await userService.updateUser(user);
    setUserData({ ...userData, user: receivedUserData });
    return receivedUserData;
  };

  const value: UserContextValue = {
    register,
    login,
    logout,
    userData,
    getUserDetails,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContextProvider, UserContext };
