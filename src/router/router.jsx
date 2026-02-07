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
import HRRoute from "./HRRoute";
import EmployeeRouter from "./EmployeeRouter";
import PaymentHistory from "../Pages/PaymentHistory";
import Profile from "../Pages/Profile";
import DashboardAnalytics from "../Pages/DashboardAnalytics";
import DashboardHome from "../Pages/DashboardHome";

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
            // ✅ Fix: Only HR should see the Analytics by default
            {
                index: true,
                element: <DashboardHome></DashboardHome>
            },
            { 
                path: 'my-assets', 
                element: <HRRoute><MyAssets /></HRRoute> 
            },
            { 
                path: 'add-asset', 
                element: <HRRoute><AddAsset /></HRRoute>
            },
            { 
                path: 'request-list',
                element: <HRRoute><RequestList /></HRRoute>
            },
            { 
                path: 'approved-list', 
                element: <HRRoute><ApprovedList /></HRRoute> 
            },
            { 
                path: 'employee-list', 
                element: <HRRoute><ApprovedEmployeeList /></HRRoute> 
            },
            { 
                path: 'upgrade-package', 
                element: <HRRoute><UpgradePackage /></HRRoute> 
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess,
            },
            {
                path: 'edit-asset/:id',
                element: <HRRoute><EditAsset /></HRRoute>
            },
            {
                path: 'payment-history',
                element: <HRRoute><PaymentHistory /></HRRoute>
            },
            {
                path: 'edit-profile',
                Component: EditProfile
            },
            {
                path: 'profile',
                Component: Profile
            },
            // ✅ Employee Specific Routes
            {
                path: 'employee-assets',
                element: <EmployeeRouter><EmployeeAssets /></EmployeeRouter>
            },
            {
                path: 'my-hr',
                element: <EmployeeRouter><MyHr /></EmployeeRouter>
            }
        ]
    }
]);