import React from 'react';
import { getPeople } from '../api/swap';
import People from '../types/People';
import Spinner from './Spinner';

type ResultSectionProps = Readonly<{
  searchTerm: string;
}>;

type ResultSectionState = Readonly<{
  results: People[];
  loading: boolean;
}>;

class ResultSection extends React.Component<
  ResultSectionProps,
  ResultSectionState
> {
  state: ResultSectionState = {
    results: [],
    loading: false,
  };

  async componentDidUpdate(prevProps: ResultSectionProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.setState({ loading: true });
      const newResults = await getPeople(this.props.searchTerm);
      this.setState({ results: newResults, loading: false });
    }
  }

  render() {
    const isEmptyResults =
      this.state.results.length === 0 && !!this.props.searchTerm;

    return this.state.loading ? (
      <Spinner />
    ) : isEmptyResults ? (
      <h2>No Results for {this.props.searchTerm}</h2>
    ) : (
      <>
        <h2>
          {this.props.searchTerm ? (
            <>Results for {this.props.searchTerm}</>
          ) : (
            <>Click Search or Enter to run search</>
          )}
        </h2>
        <ul>
          {this.state.results.map((person) => (
            <li key={person.name}>
              {person.name} {person.height || 'N/A'} cm / {person.mass || 'N/A'}{' '}
              kg
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default ResultSection;
