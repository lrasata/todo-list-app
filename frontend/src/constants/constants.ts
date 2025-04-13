export const API_BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;
export const API_TASKS_ENDPOINT= `${import.meta.env.VITE_BACKEND_API_URL}/api/tasks`;
export const API_SIGN_UP_ENDPOINT= `${import.meta.env.VITE_BACKEND_API_URL}/signup`;
export const API_LOGIN_ENDPOINT= `${import.meta.env.VITE_BACKEND_API_URL}/login`;

export const API_TASKS_DUE_TODAY= `${API_TASKS_ENDPOINT}?dueDate=today`;
export const API_TASKS_OVERDUE= `${API_TASKS_ENDPOINT}?dueDate=past&completed=false`;

export const SEARCH_QUERY_PARAMETER = 'search'