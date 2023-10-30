import { Component } from 'react';
import './App.css';

import AppErrorBoundary from './components/AppErrorBoundary';
import ErrorProneComponent from './components/ErrorProneComponent';
import SearchSection from './components/SearchSection';
import ResultSection from './components/ResultSection';

const LOCAL_STORAGE_KEY = 'searchTerm';

type AppState = Readonly<{
  term: string;
  termForResults: string;
}>;

type AppProps = Readonly<object>;

class App extends Component<AppProps, AppState> {
  state: AppState = {
    term: localStorage.getItem(LOCAL_STORAGE_KEY) || '',
    termForResults: localStorage.getItem(LOCAL_STORAGE_KEY) || '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ term: event.target.value });
  };

  handleClick = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, this.state.term);
    this.setState({ termForResults: this.state.term.trim() });
  };

  render() {
    return (
      <AppErrorBoundary>
        <ErrorProneComponent />
        <SearchSection
          term={this.state.term}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
        />
        <ResultSection searchTerm={this.state.termForResults} />
      </AppErrorBoundary>
    );
  }
}
export default App;
