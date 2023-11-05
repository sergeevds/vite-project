import { ReactNode, useEffect } from 'react';
import { NavLink, useAsyncValue } from 'react-router-dom';

import { PeopleResponse } from '../api/types';

function PeopleList({
  onLoadSuccess,
}: {
  onLoadSuccess: (response: PeopleResponse) => void;
}): ReactNode {
  const value = useAsyncValue() as PeopleResponse;

  useEffect(() => {
    onLoadSuccess(value);
  }, [onLoadSuccess, value]);

  return !value ? (
    <h1>Something went wrong while people fetching</h1>
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {value.results.length === 0 ? (
        <h2>No Results</h2>
      ) : (
        value.results.map((person) => (
          <NavLink to={`${person.url}${location.search}`} key={person.name}>
            {person.name}
          </NavLink>
        ))
      )}
    </div>
  );
}

export default PeopleList;
