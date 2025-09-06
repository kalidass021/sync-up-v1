import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './redux/appStore.js';
import './index.css';
import App from './App.jsx';

// public routes
const LazyAuthLayout = lazy(() => import('./pages/auth/AuthLayout.jsx'));
const LazySignupForm = lazy(() => import('./pages/auth/forms/SignupForm.jsx'));
const LazySigninForm = lazy(() => import('./pages/auth/forms/SigninForm.jsx'));

// private routes
const LazyPageLayout = lazy(() => import('./pages/PageLayout.jsx'));
const LazyHome = lazy(() => import('./pages/Home.jsx'));
const LazyExplore = lazy(() => import('./pages/posts/Explore.jsx'));
const LazyAllUsers = lazy(() => import('./pages/user/AllUsers.jsx'));
const LazySavedPosts = lazy(() => import('./pages/posts/SavedPosts.jsx'));
const LazyCreatePost = lazy(() => import('./pages/posts/CreatePost.jsx'));
const LazyPostDetails = lazy(() => import('./pages/posts/PostDetails.jsx'));
const LazyEditPost = lazy(() => import('./pages/posts/EditPost.jsx'));
const LazyProfile = lazy(() => import('./pages/user/Profile.jsx'));
const LazyEditProfile = lazy(() => import('./pages/user/EditProfile.jsx'));
const LazyGridPostList = lazy(() => import('./components/posts/GridPostList.jsx'));

// loader
import Loader from './components/shared/Loader.jsx';

// error page
import ErrorDisplay from './pages/ErrorDisplay.jsx';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        // private routes
        path: '',
        element: <LazyPageLayout />,
        children: [
          {
            path: '/',
            element: <LazyHome />,
          },
          {
            path: '/explore',
            element: <LazyExplore />,
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
            element: <LazyAllUsers />,
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
                element: <LazyGridPostList />,
              },
              {
                path: 'posts/liked',
                element: <LazyGridPostList />,
              },
              {
                path: 'posts/saved',
                element: <LazyGridPostList />,
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
        element: <LazyAuthLayout />,
        children: [
          {
            path: '/signup',
            element: <LazySignupForm />,
          },
          {
            path: '/signin',
            element: <LazySigninForm />,
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
