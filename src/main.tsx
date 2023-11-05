import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import { action as searchAction } from './components/SearchSection.tsx';

import './index.css';
import { loader as peopleLoader } from './components/PeopleRoute.tsx';
import PersonRoute, {
  loader as personLoader,
} from './components/PersonRoute.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: (
      <div>
        <h1>NOT FOUND</h1>
      </div>
    ),
    action: searchAction,
    loader: peopleLoader,
    shouldRevalidate: ({ currentUrl, nextUrl }) => {
      return (
        currentUrl.searchParams.get('term') !==
          nextUrl.searchParams.get('term') ||
        currentUrl.searchParams.get('page') !== nextUrl.searchParams.get('page')
      );
    },
    children: [
      {
        path: 'people/:personId',
        element: <PersonRoute />,
        loader: personLoader,
        action: searchAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
