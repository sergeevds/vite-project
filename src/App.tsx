import React, { useState, useCallback } from 'react';
import './App.css';

import AppErrorBoundary from './components/AppErrorBoundary';
import ErrorProneComponent from './components/ErrorProneComponent';
import SearchSection from './components/SearchSection';
import ResultSection from './components/ResultSection';

const LOCAL_STORAGE_KEY = 'searchTerm';

function App() {
  const [term, setTerm] = useState<string>(
    localStorage.getItem(LOCAL_STORAGE_KEY) || ''
  );
  const [termForResults, setTermForResults] = useState<string>(term);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTerm(event.target.value);
    },
    []
  );

  const handleClick = useCallback(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, term);
    setTermForResults(term.trim());
  }, [term]);

  return (
    <AppErrorBoundary>
      <ErrorProneComponent />
      <SearchSection
        term={term}
        handleChange={handleChange}
        handleClick={handleClick}
      />

      <ResultSection searchTerm={termForResults} />
    </AppErrorBoundary>
  );
}

export default App;
