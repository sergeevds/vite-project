import React, { Suspense, useEffect } from 'react';
import { getPeople } from '../api/swap';
import People from '../types/People';
import Spinner from './Spinner';
import { NavLink, useAsyncValue } from 'react-router-dom';

function PeopleList({ onLoadSuccess }) {
  const value = useAsyncValue();

  useEffect(() => {
    onLoadSuccess(value);
  }, [onLoadSuccess, value]);

  return !value ? (
    <h1>ERROR !!!</h1>
  ) : (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {value.results.length === 0 ? (
        <h2>No Results</h2>
      ) : (
        value.results.map((person) => (
          <NavLink to={`${person.url}${location.search}`} key={person.name}>
            {person.name} {person.height || 'N/A'} cm / {person.mass || 'N/A'}{' '}
            kg
          </NavLink>
        ))
      )}
    </div>
  );
}

export default PeopleList;
