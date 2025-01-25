import { StrictMode, lazy, Suspense } from 'react';
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
import AllUsers from './pages/user/AllUsers.jsx';
import GridPostList from './components/shared/GridPostList.jsx';
// lazy
const LazySavedPosts = lazy(() => import('./pages/posts/SavedPosts.jsx'));
const LazyCreatePost = lazy(() => import('./pages/posts/CreatePost.jsx'));
const LazyPostDetails = lazy(() => import('./pages/posts/PostDetails.jsx'));
const LazyEditPost = lazy(() => import('./pages/posts/EditPost.jsx'));
const LazyProfile = lazy(() => import('./pages/user/Profile.jsx'));
const LazyEditProfile = lazy(() => import('./pages/user/EditProfile.jsx'));

// loader
import Loader from './components/shared/Loader.jsx';

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
            element: (
              <Suspense fallback={<Loader />}>
                <LazySavedPosts />
              </Suspense>
            ),
          },
          {
            path: '/users',
            element: <AllUsers />,
          },
          {
            path: '/posts/create',
            element: (
              <Suspense fallback={<Loader />}>
                <LazyCreatePost />
              </Suspense>
            ),
          },
          {
            path: '/posts/:id/edit',
            element: (
              <Suspense fallback={<Loader />}>
                <LazyEditPost />
              </Suspense>
            ),
          },
          {
            path: '/posts/:id',
            element: (
              <Suspense fallback={<Loader />}>
                <LazyPostDetails />
              </Suspense>
            ),
          },
          {
            path: '/:username/profile',
            element: (
              <Suspense fallback={<Loader />}>
                <LazyProfile />
              </Suspense>
            ),
            children: [
              {
                path: '',
                index: true,
                element: <GridPostList />,
              },
              {
                path: 'posts/liked',
                element: <GridPostList />,
              },
              {
                path: 'posts/saved',
                element: <GridPostList />,
              },
            ],
          },
          {
            path: '/:username/profile/edit',
            element: (
              <Suspense fallback={<Loader />}>
                <LazyEditProfile />
              </Suspense>
            ),
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
