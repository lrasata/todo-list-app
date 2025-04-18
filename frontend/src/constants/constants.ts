export const NODE_ENV = import.meta.env.VITE_NODE_ENV || 'development';
export const DOMAIN = import.meta.env.VITE_DOMAIN;
export const API_BACKEND_URL = import.meta.env.VITE_BACKEND_API_URL;
export const API_TASKS_ENDPOINT= `${import.meta.env.VITE_BACKEND_API_URL}/api/tasks`;
export const API_SIGN_UP_ENDPOINT= `${import.meta.env.VITE_BACKEND_API_URL}/signup`;
export const API_LOGIN_ENDPOINT= `${import.meta.env.VITE_BACKEND_API_URL}/login`;

export const API_TASKS_DUE_TODAY= `${API_TASKS_ENDPOINT}?dueDate=today`;
export const API_TASKS_OVERDUE= `${API_TASKS_ENDPOINT}?dueDate=past&completed=false`;

export const SEARCH_QUERY_PARAMETER = 'search';
export const DATE_QUERY_PARAMETER = 'filteredDate';

export const API_CATEGORIES_ENDPOINT= `${import.meta.env.VITE_BACKEND_API_URL}/api/categories`;

export const COLOUR_OPTIONS = [
    {
        name: "pink",
        value: "#FFD1DC"
    },
    {
        name: "blue",
        value: "#AEC6CF"
    },
    {
        name: "lavender",
        value: "#E6E6FA"
    },
    {
        name: "peach",
        value: "#FFE5B4"
    },
    {
        name: "yellow",
        value: "#FFFFB3"
    },
    {
        name: "green",
        value: "#AAF0D1"
    }
]