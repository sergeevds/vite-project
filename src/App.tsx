import React, { memo } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useNavigation,
} from 'react-router-dom';

import './App.css';

import ErrorProneComponent from './components/ErrorProneComponent';
import SearchSection from './components/SearchSection';
import ResultSection from './components/ResultSection';
import AppErrorBoundary from './components/AppErrorBoundary';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation();

  return (
    <AppErrorBoundary>
      <div style={{ display: 'flex' }}>
        <div style={{ minWidth: '90%' }}>
          <ErrorProneComponent />
          <SearchSection />
          {/* {navigate.state === 'loading' ? <h1>Loading...</h1> : null} */}
          <ResultSection />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </AppErrorBoundary>
  );
}

export default memo(App);
