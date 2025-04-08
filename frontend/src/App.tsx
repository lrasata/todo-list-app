import MainLayout from "./pages/MainLayout.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import TasksPage from "./pages/TasksPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <ProtectedRoute><TasksPage /></ProtectedRoute>,
            },
            {path: 'login', element: <LoginPage />},
            {path: 'signup', element: <SignUpPage />},

        ],
    }
]);

const App = () => {
    return (<RouterProvider router={router}/>)
};

export default App;