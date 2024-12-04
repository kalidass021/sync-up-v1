import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

// public routes
import AuthLayout from './pages/auth/AuthLayout.jsx';
import SignupForm from './pages/auth/forms/SignupForm.jsx';
import SigninForm from './pages/auth/forms/SigninForm.jsx';

// private routes
import PageLayout from './pages/PageLayout.jsx';
import Home from './pages/Home.jsx';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        // private routes
        path: '',
        element: <PageLayout />,
        children: [
          {
            path: '/',
            element: <Home />,
          }
        ]
      },
      {
        // public routes
        path: '',
        element: <AuthLayout />,
        children: [
          {
            path: '/signup',
            element: <SignupForm />,
          },
          {
            path: '/signin',
            element: <SigninForm />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
);
