// router.js

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
import ApprovedEmployeeList from "../Pages/ApprovedEmployeeList";
import UpgradePackage from "../Pages/UpgradePackage";
import PaymentSuccess from "../Pages/PaymentSuccess";
import EditAsset from "../Pages/EditAsset";
import EditProfile from "../Pages/EditProfile";
import EmployeeAssets from "../Pages/EmployeeAssets";
import MyHr from "../Pages/MyHr";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "/register",
                Component: Register,
            },
            {
                path: '/login',
                Component: Login,
            },
            {
                path: '/assets',
                Component: Assets,
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            { path: 'my-assets', Component: MyAssets },
            { path: 'add-asset', Component: AddAsset },
            { path: 'request-list', Component: RequestList },
            { path: 'approved-list', Component: ApprovedList },
            { path: 'employee-list', Component: ApprovedEmployeeList },
            { path: 'upgrade-package', Component: UpgradePackage },
            {
                path: 'payment-success',
                Component: PaymentSuccess,
            },
            {
                path:'edit-asset/:id',
                Component:EditAsset
            },
            {
                path:'edit-profile',
                Component:EditProfile
            },
            {
                path:'employee-assets',
                Component:EmployeeAssets
            },
            {
                path:'my-hr',
                Component:MyHr
            }
        ]
    }
]);
