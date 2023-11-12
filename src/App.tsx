import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';

import ErrorProneComponent from './components/ErrorProneComponent';
import SearchSection, {
  LOCAL_STORAGE_SEARCH_TERM_KEY,
} from './components/SearchSection';
import PeopleRoute from './components/PeopleRoute';
import AppErrorBoundary from './components/AppErrorBoundary';
import { PeopleResponse } from './api/types';
import { SearchContext } from './context/SearchContext';

function App() {
  const [term, setTerm] = React.useState<string>(
    new URLSearchParams(location.search).get('term') ||
      localStorage.getItem(LOCAL_STORAGE_SEARCH_TERM_KEY) ||
      ''
  );

  const [peopleResponse, setPeopleResponse] = React.useState<PeopleResponse>({
    previous: '',
    next: '',
    results: [],
  });

  return (
    <AppErrorBoundary>
      <SearchContext.Provider value={{ term, setTerm }}>
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
      </SearchContext.Provider>
    </AppErrorBoundary>
  );
}

export default memo(App);
