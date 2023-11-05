import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';
import { action as searchAction } from './components/SearchSection.tsx';

import './index.css';
import { loader as peopleLoader } from './components/ResultSection.tsx';
import { PersonCard } from './components/PersonCard.tsx';

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
    shouldRevalidate: ({ currentUrl, currentParams, nextUrl, nextParams }) => {
      console.log('shouldRevalidate >>>', {
        currentUrl,
        currentParams,
        nextUrl,
        nextParams,
      });

      return (
        currentUrl.searchParams.get('term') !== nextUrl.searchParams.get('term')
      );
    },
    children: [
      {
        path: 'people/:personId',
        element: <PersonCard />,
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
