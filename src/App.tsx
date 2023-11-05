import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';

import ErrorProneComponent from './components/ErrorProneComponent';
import SearchSection from './components/SearchSection';
import ResultSection from './components/ResultSection';
import AppErrorBoundary from './components/AppErrorBoundary';

function App() {
  const [people, setPeople] = React.useState({});

  return (
    <AppErrorBoundary>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '70vw' }}>
          <ErrorProneComponent />
          <SearchSection />
          <ResultSection onLoadSuccess={setPeople} people={people} />
        </div>
        <div style={{ width: '25vw' }}>
          <Outlet context={{ people }} />
        </div>
      </div>
    </AppErrorBoundary>
  );
}

export default memo(App);
