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

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
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
  },
]);
