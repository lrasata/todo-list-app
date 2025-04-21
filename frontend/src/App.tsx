import MainLayout from "./pages/MainLayout.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import DueTodayTaskContainer from "./containers/DueTodayTaskContainer.tsx";
import AllTaskContainer from "./containers/AllTaskContainer.tsx";
import OverdueTaskContainer from "./containers/OverdueTaskContainer.tsx";
import TaskCategoryContainer from "./containers/TaskCategoryContainer.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <ProtectedRoute><DueTodayTaskContainer /></ProtectedRoute>,
            },
            {
                path: 'all-tasks',
                element: <ProtectedRoute><AllTaskContainer /></ProtectedRoute>,
            },
            {
                path: 'overdue-tasks',
                element: <ProtectedRoute><OverdueTaskContainer /></ProtectedRoute>,
            },
            {
                path: 'task-category',
                element: <ProtectedRoute><TaskCategoryContainer /></ProtectedRoute>
            },
            {path: 'login', element: <LoginPage />},
            // {path: 'signup', element: <SignUpPage />}, // for safety reason, only known user can login

        ],
    }
]);

const App = () => {
    return (<RouterProvider router={router}/>)
};

export default App;