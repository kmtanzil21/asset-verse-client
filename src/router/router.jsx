import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import DashboardLayout from "../Pages/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import MyAssets from "../Pages/MyAssets";
import AddAsset from "../Pages/AddAsset";
import Assets from "../Pages/Assets";
import RequestList from "../Pages/RequestList";
import ApprovedList from "../Pages/ApprovedList";

export const router= createBrowserRouter([
    {
        path: '/',
        Component:RootLayout,
        children:[
            {
                index: true,
                Component:Home
            },
            {
                path:"/register",
                Component: Register
            },
            {
                path:'/login',
                Component:Login
            },
            {
                path:'/assets',
                Component:Assets
            }
        ]
    },
    {
        path:'/dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children:[
            {
                path:'my-assets',
                Component:MyAssets
            },
            {
                path:'add-asset',
                Component: AddAsset
            },
            {
                path:'request-list',
                Component: RequestList
            },
            {
                path:'approved-list',
                Component:ApprovedList
            }
        ]


    }
])