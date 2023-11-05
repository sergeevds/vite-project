import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';

import ErrorProneComponent from './components/ErrorProneComponent';
import SearchSection from './components/SearchSection';
import PeopleRoute from './components/PeopleRoute';
import AppErrorBoundary from './components/AppErrorBoundary';
import { PeopleResponse } from './api/types';

function App() {
  const [peopleResponse, setPeopleResponse] = React.useState<PeopleResponse>({
    previous: '',
    next: '',
    results: [],
  });

  return (
    <AppErrorBoundary>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '70vw' }}>
          <ErrorProneComponent />
          <SearchSection />
          <PeopleRoute
            onLoadSuccess={setPeopleResponse}
            people={peopleResponse}
          />
        </div>
        <div style={{ width: '25vw' }}>
          <Outlet />
        </div>
      </div>
    </AppErrorBoundary>
  );
}

export default memo(App);
