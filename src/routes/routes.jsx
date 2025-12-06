import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayouts/RootLayout';
import HomePage from '../pages/HomePage/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
    ],
  },
]);
