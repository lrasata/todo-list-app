import MainLayout from "./pages/MainLayout.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Homepage from "./pages/Homepage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {index: true, element: <Homepage />},
            {path: 'login', element: <LoginPage />},
            {path: 'signup', element: <SignUpPage />}
        ],
    }
]);

const App = () => {
    return (<RouterProvider router={router}/>)
};

export default App;