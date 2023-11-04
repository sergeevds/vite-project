import React, { useEffect } from 'react';
import { getPeople } from '../api/swap';
import People from '../types/People';
import Spinner from './Spinner';

type ResultSectionProps = Readonly<{
  searchTerm: string;
}>;

function ResultSection(props: ResultSectionProps) {
  const { searchTerm } = props;
  const [results, setResults] = React.useState<People[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const loadResults = async (term : string) => {
    setLoading(true);
    const newResults = await getPeople(term);
    setResults(newResults);
    setLoading(false);
  };

  useEffect(() => {
    loadResults(searchTerm);
  }, [searchTerm]);

  const isEmptyResults = results.length === 0 && !!props.searchTerm;

  return loading ? (
    <Spinner />
  ) : isEmptyResults ? (
    <h2>No Results for {props.searchTerm}</h2>
  ) : (
    <>
      <h2>
        {props.searchTerm ? (
          <>Results for {props.searchTerm}</>
        ) : (
          <>Click Search or Enter to run search</>
        )}
      </h2>
      <ul>
        {results.map((person) => (
          <li key={person.name}>
            {person.name} {person.height || 'N/A'} cm / {person.mass || 'N/A'}{' '}
            kg
          </li>
        ))}
      </ul>
    </>
  );
}

export default ResultSection;
