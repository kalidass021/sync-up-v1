import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import loadable from '@loadable/component';
import appStore from './redux/appStore.js';
import './index.css';
import App from './App.jsx';
import Loader from './components/shared/Loader.jsx'; // loader
import ErrorDisplay from './pages/ErrorDisplay.jsx'; // error page

// public routes
const LoadableAuthLayout = loadable(
  () => import('./pages/auth/AuthLayout.jsx'),
  { fallback: <Loader /> }
);
const LoadableSignupForm = loadable(
  () => import('./pages/auth/forms/SignupForm.jsx'),
  { fallback: <Loader /> }
);
const LoadableSigninForm = loadable(
  () => import('./pages/auth/forms/SigninForm.jsx'),
  { fallback: <Loader /> }
);

// private routes
const LoadablePageLayout = loadable(() => import('./pages/PageLayout.jsx'), {
  fallback: <Loader />,
});
const LoadableHome = loadable(() => import('./pages/Home.jsx'), {
  fallback: <Loader />,
});
const LoadableExplore = loadable(() => import('./pages/posts/Explore.jsx'), {
  fallback: <Loader />,
});
const LoadableAllUsers = loadable(() => import('./pages/user/AllUsers.jsx'), {
  fallback: <Loader />,
});
const LoadableSavedPosts = loadable(
  () => import('./pages/posts/SavedPosts.jsx'),
  { fallback: <Loader /> }
);
const LoadableCreatePost = loadable(
  () => import('./pages/posts/CreatePost.jsx'),
  { fallback: <Loader /> }
);
const LoadablePostDetails = loadable(
  () => import('./pages/posts/PostDetails.jsx'),
  { fallback: <Loader /> }
);
const LoadableEditPost = loadable(() => import('./pages/posts/EditPost.jsx'), {
  fallback: <Loader />,
});
const LoadableProfile = loadable(() => import('./pages/user/Profile.jsx'), {
  fallback: <Loader />,
});
const LoadableEditProfile = loadable(
  () => import('./pages/user/EditProfile.jsx'),
  { fallback: <Loader /> }
);
const LoadableGridPostList = loadable(
  () => import('./components/posts/GridPostList.jsx'),
  { fallback: <Loader /> }
);

// preload home page early
LoadableHome.preload();

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        // private routes
        path: '',
        element: <LoadablePageLayout />,
        children: [
          {
            path: '/',
            element: <LoadableHome />,
          },
          {
            path: '/explore',
            element: <LoadableExplore />,
          },
          {
            path: '/posts/saved',
            element: <LoadableSavedPosts />,
          },
          {
            path: '/users',
            element: <LoadableAllUsers />,
          },
          {
            path: '/posts/create',
            element: <LoadableCreatePost />,
          },
          {
            path: '/posts/:id/edit',
            element: <LoadableEditPost />,
          },
          {
            path: '/posts/:id',
            element: <LoadablePostDetails />,
          },
          {
            path: '/:username/profile',
            element: <LoadableProfile />,
            children: [
              {
                path: '',
                index: true,
                element: <LoadableGridPostList />,
              },
              {
                path: 'posts/liked',
                element: <LoadableGridPostList />,
              },
              {
                path: 'posts/saved',
                element: <LoadableGridPostList />,
              },
            ],
          },
          {
            path: '/:username/profile/edit',
            element: <LoadableEditProfile />,
          },
        ],
      },
      {
        // public routes
        path: '',
        element: <LoadableAuthLayout />,
        children: [
          {
            path: '/signup',
            element: <LoadableSignupForm />,
          },
          {
            path: '/signin',
            element: <LoadableSigninForm />,
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
