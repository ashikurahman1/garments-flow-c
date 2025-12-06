import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayouts/RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
  },
]);
