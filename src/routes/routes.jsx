import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayouts/RootLayout';
import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import AboutUs from '../pages/AboutUs/AboutUs';
import Contact from '../pages/Contact/Contact';
import AllProducts from '../pages/Products/Products';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout';
import MyDashboard from '../pages/Dashboard/MyDashboard/MyDashboard';
import ManageUsers from '../pages/Dashboard/AdminRoutes/ManageUsers/ManageUsers';
import AllOrders from '../pages/Dashboard/AdminRoutes/AllOrders/AllOrders';
import AdminAllProducts from '../pages/Dashboard/AdminRoutes/AllProducts/AllProducts';
import AddProduct from '../pages/Dashboard/ManagerRoutes/AddProduct/AddProduct';
import ProfilePage from '../pages/Dashboard/ProfilePage/ProfilePage';
import ApprovedOrders from '../pages/Dashboard/ManagerRoutes/ApprovedOrders/ApprovedOrders';
import PendingOrders from '../pages/Dashboard/ManagerRoutes/PendingOrders/PendingOrders';
import ManageProducts from '../pages/Dashboard/ManagerRoutes/ManageProducts/ManageProducts';
import MyOrdersPage from '../pages/Dashboard/BuyerRoutes/MyOrdersPage/MyOrdersPage';
import TrackOrderPage from '../pages/Dashboard/BuyerRoutes/TrackOrderPage/TrackOrderPage';
import NotFound from '../pages/NotFound/NotFound';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    errorElement: <NotFound />,
    hydrateFallbackElement: <LoadingSpinner />,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'about-us',
        Component: AboutUs,
      },
      {
        path: 'all-products',
        Component: AllProducts,
      },
      // Private Route
      {
        path: 'products/:id',
        Component: ProductDetails,
      },
      {
        path: 'contact',
        Component: Contact,
      },
      {
        path: 'login',
        Component: LoginPage,
      },
      {
        path: 'register',
        Component: RegisterPage,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        index: true,
        Component: MyDashboard,
      },
      {
        path: 'profile',
        Component: ProfilePage,
      },
      // Admin Routes Only
      {
        path: 'manage-users',
        Component: ManageUsers,
      },
      {
        path: 'all-products',
        Component: AdminAllProducts,
      },
      {
        path: 'all-orders',
        Component: AllOrders,
      },

      // Manager Routes Only
      {
        path: 'add-product',
        element: <AddProduct></AddProduct>,
      },
      {
        path: 'approved-orders',
        element: <ApprovedOrders></ApprovedOrders>,
      },
      {
        path: 'pending-orders',
        element: <PendingOrders></PendingOrders>,
      },
      {
        path: 'manage-products',
        element: <ManageProducts></ManageProducts>,
      },
      // Buyer Routes
      {
        path: 'my-orders',
        element: <MyOrdersPage></MyOrdersPage>,
      },
      {
        path: 'track-order',
        element: <TrackOrderPage></TrackOrderPage>,
      },
    ],
  },
]);
