import MainLayout from "./pages/MainLayout.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import TaskPage from "./pages/TaskPage.tsx";
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
                element: <ProtectedRoute><TaskPage path="/"/></ProtectedRoute>,
            },
            {
                path: 'all-tasks',
                element: <ProtectedRoute><TaskPage path="all-tasks"/></ProtectedRoute>,
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