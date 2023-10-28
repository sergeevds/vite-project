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

class App extends Component<null, AppState> {
  state: AppState = {
    term: localStorage.getItem(LOCAL_STORAGE_KEY) || '',
    termForResults: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ term: event.target.value });
  };

  handleClick = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, this.state.term);
    this.setState({ termForResults: this.state.term });
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
