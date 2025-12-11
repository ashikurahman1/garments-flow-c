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
import PrivateRouter from './PrivateRouter';
import AdminRoute from './AdminRoute';
import ManagerRoute from './ManagerRoute';
import BuyerRoute from './BuyerRoute';

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
        element: (
          <PrivateRouter>
            <ProductDetails></ProductDetails>
          </PrivateRouter>
        ),
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
    element: (
      <PrivateRouter>
        <DashboardLayout></DashboardLayout>
      </PrivateRouter>
    ),
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
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: 'all-products',
        element: (
          <AdminRoute>
            <AdminAllProducts></AdminAllProducts>
          </AdminRoute>
        ),
      },
      {
        path: 'all-orders',
        element: (
          <AdminRoute>
            <AllOrders></AllOrders>
          </AdminRoute>
        ),
      },

      // Manager Routes Only
      {
        path: 'add-product',
        element: (
          <ManagerRoute>
            <AddProduct></AddProduct>
          </ManagerRoute>
        ),
      },
      {
        path: 'approved-orders',
        element: (
          <ManagerRoute>
            <ApprovedOrders></ApprovedOrders>
          </ManagerRoute>
        ),
      },
      {
        path: 'pending-orders',
        element: (
          <ManagerRoute>
            <PendingOrders></PendingOrders>
          </ManagerRoute>
        ),
      },
      {
        path: 'manage-products',
        element: (
          <ManagerRoute>
            <ManageProducts></ManageProducts>
          </ManagerRoute>
        ),
      },
      // Buyer Routes
      {
        path: 'my-orders',
        element: (
          <BuyerRoute>
            <MyOrdersPage></MyOrdersPage>
          </BuyerRoute>
        ),
      },
      {
        path: 'track-order',
        element: (
          <BuyerRoute>
            <TrackOrderPage></TrackOrderPage>
          </BuyerRoute>
        ),
      },
    ],
  },
]);
