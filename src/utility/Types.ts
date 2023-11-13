// User specific types

type UserType = {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

type UserData = {
  accessToken: string;
  user: UserType;
};

type UserContextValue = {
  register: (user: UserType) => Promise<UserType>;
  login: (user: UserType) => Promise<UserType>;
  logout: () => Promise<void>;
  getUserDetails: (id: string) => Promise<UserType>;
  updateUser: (user: UserType) => Promise<UserType>;
  userData: UserData;
};

// Task specific types

type TaskType = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  userId?: string;
};

type TaskContextValues = {
  taskList: TaskType[];
  createTask: (task: TaskType) => void;
  deleteTask: (id: string) => void;
  editTask: (task: TaskType) => void;
  getTasks: () => void;
  searchTask: (q: string) => void;
  getTaskById: (id: string) => Promise<TaskType>;
};

type TaskDeleteSuccessStatus = {
  status: number;
  statusText: string;
};

// Common context specific type

type CommonContextValues = {
  showToaster: (message: string) => void;
  editableTask: TaskType | null;
  setEditableTask: (task: TaskType | null) => void;
  popupStatus: boolean;
  updatePopupStatus: (popupStatus: boolean) => void;
  darkMode: boolean;
  setDarkMode: (darkModeValue: boolean) => void;
};

// ConfirmPopup type
type ConfirmDeleteProps = {
  confirmPopup: boolean;
  showConfirmPopup: (isOpen: boolean) => void;
  handleOperation: () => void;
  popupText: string;
};

// Task component types
type TaskProps = {
  task: TaskType;
};

// Language management
type LanguageResource = {
  [key: string]: string;
};

type LanguageContextValue = {
  language: string;
  resource: LanguageResource;
};

export type {
  UserType,
  UserData,
  TaskType,
  TaskContextValues,
  TaskDeleteSuccessStatus,
  UserContextValue,
  CommonContextValues,
  ConfirmDeleteProps,
  TaskProps,
  LanguageResource,
  LanguageContextValue,
};
