import React, { Suspense } from 'react';
import { getPeople } from '../api/swap';
import People from '../types/People';
import Spinner from './Spinner';
import {
  Await,
  NavLink,
  defer,
  useLoaderData,
  useLocation,
  useNavigation,
} from 'react-router-dom';

export async function loader({
  request,
}: {
  request: Request;
  params: { personId?: string };
}) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('term');
  const people = getPeople(searchTerm || '');
  // const people = [{ name: 'test', height: 'test', mass: 'test' }];
  return defer({ people });
}

function ResultSection() {
  const location = useLocation();
  const { state } = useNavigation();
  const data = useLoaderData() as { people: People[] };

  if (state === 'loading') {
    return <Spinner />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={data.people} errorElement={<p>Error fetched!</p>}>
        {(people: People[]) =>
          !people ? (
            <h1>ERROR !!!</h1>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {people.length === 0 ? (
                <h2>No Results</h2>
              ) : (
                people.map((person) => (
                  <NavLink to={`/people/1${location.search}`} key={person.name}>
                    {person.name} {person.height || 'N/A'} cm /{' '}
                    {person.mass || 'N/A'} kg
                  </NavLink>
                ))
              )}
            </div>
          )
        }
      </Await>
    </Suspense>
  );
}

export default ResultSection;
