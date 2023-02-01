import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import AddTask from "../Pages/AddTask";
import Details from "../Pages/Details";
import EditTask from "../Pages/EditTask";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Tasks from "../Pages/Tasks";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/tasks',
                element: <Tasks />
            },
            {
                path: '/add-task',
                element: <AddTask />
            },
            {
                path: '/details/:id',
                element: <Details />
            },
            {
                path: '/edit-task/:id',
                element: <EditTask />
            },
        ]
    }
])