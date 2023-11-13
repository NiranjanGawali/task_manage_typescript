const baseUrl = process.env.REACT_APP_BASE_URL;

// User service constants
export const LOGIN_API_PATH = `${baseUrl}/login`;
export const REGISTER_API_PATH = `${baseUrl}/register`;
export const GET_USER_DETAILS = `${baseUrl}/600/users`;
export const UPDATE_USER_DETAILS = `${baseUrl}/600/users`;

// Task service constants
export const GET_TASKS_PATH = `${baseUrl}/600/tasks?_sort=createdAt&_order=desc`;
export const TASK_PATH = `${baseUrl}/600/tasks`;
