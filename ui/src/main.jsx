import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './redux/appStore.js';
import './index.css';
import App from './App.jsx';

// public routes
import AuthLayout from './pages/auth/AuthLayout.jsx';
import SignupForm from './pages/auth/forms/SignupForm.jsx';
import SigninForm from './pages/auth/forms/SigninForm.jsx';

// private routes
import PageLayout from './pages/PageLayout.jsx';
import Home from './pages/Home.jsx';
import Explore from './pages/posts/Explore.jsx';
import SavedPosts from './pages/posts/SavedPosts.jsx';
import LikedPosts from './pages/posts/LikedPosts.jsx';
import AllUsers from './pages/user/AllUsers.jsx';
import CreatePost from './pages/posts/CreatePost.jsx';
import EditPost from './pages/posts/EditPost.jsx';
import PostDetails from './pages/posts/PostDetails.jsx';
import Profile from './pages/user/Profile.jsx';
import EditProfile from './pages/user/EditProfile.jsx';

// error page
import ErrorDisplay from './components/ErrorDisplay.jsx';

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
          },
          {
            path: '/explore',
            element: <Explore />,
          },
          {
            path: '/posts/saved',
            element: <SavedPosts />,
          },
          {
            path: '/posts/liked',
            element: <LikedPosts />,
          },
          {
            path: '/users',
            element: <AllUsers />,
          },
          {
            path: '/posts/create',
            element: <CreatePost />,
          },
          {
            path: '/posts/:id/edit',
            element: <EditPost />,
          },
          {
            path: '/posts/:id',
            element: <PostDetails />,
          },
          {
            path: '/:username/profile',
            element: <Profile />,
          },
          {
            path: '/:username/profile/edit',
            element: <EditProfile />,
          },
        ],
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
    errorElement: <ErrorDisplay />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);
