import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Suspense, lazy } from "react";
import Spinner from "./components/Spinner.tsx";

const MainLayout = lazy(() => import("./pages/MainLayout.tsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.tsx"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute.tsx"));
const DueTodayTaskContainer = lazy(() => import("./containers/DueTodayTaskContainer.tsx"));
const AllTaskContainer = lazy(() => import("./containers/AllTaskContainer.tsx"));
const OverdueTaskContainer = lazy(() => import("./containers/OverdueTaskContainer.tsx"));
const TaskCategoryContainer = lazy(() => import("./containers/TaskCategoryContainer.tsx"));

const router = createBrowserRouter([
    {
        path: '/',
        element: <Suspense fallback={<Spinner />}><MainLayout /> </Suspense>,
        errorElement:<Suspense fallback={<Spinner />}> <ErrorPage /></Suspense>,
        children: [
            {
                index: true,
                element: <Suspense fallback={<Spinner />}><ProtectedRoute><DueTodayTaskContainer /></ProtectedRoute></Suspense>,
            },
            {
                path: 'all-tasks',
                element: <Suspense fallback={<Spinner />}><ProtectedRoute><AllTaskContainer /></ProtectedRoute></Suspense>,
            },
            {
                path: 'overdue-tasks',
                element: <Suspense fallback={<Spinner />}><ProtectedRoute><OverdueTaskContainer /></ProtectedRoute></Suspense>,
            },
            {
                path: 'task-category',
                element: <Suspense fallback={<Spinner />}><ProtectedRoute><TaskCategoryContainer /></ProtectedRoute></Suspense>
            },
            {path: 'login', element: <Suspense fallback={<Spinner />}><LoginPage /></Suspense>},
            // {path: 'signup', element: <SignUpPage />}, // for safety reason, only known user can login

        ],
    }
]);

const App = () => {
    return (<RouterProvider router={router}/>)
};

export default App;