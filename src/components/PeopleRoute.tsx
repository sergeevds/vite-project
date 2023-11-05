import { ReactNode, Suspense } from 'react';
import { Await, defer, useLoaderData, useNavigation } from 'react-router-dom';

import { getPeople } from '../api/swap';
import Person from '../types/People';
import Spinner from './Spinner';
import PeopleList from './PeopleList';
import { PeopleResponse } from '../api/types';
import Pagination from './Pagination';
import { LOCAL_STORAGE_SEARCH_TERM_KEY } from './SearchSection';

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const searchTerm =
    url.searchParams.get('term') ||
    localStorage.getItem(LOCAL_STORAGE_SEARCH_TERM_KEY) ||
    '';
  const page = url.searchParams.has('page')
    ? +url.searchParams.get('page')!
    : 1;

  const people = getPeople(searchTerm, page);
  return defer({ people });
}

function PeopleRoute({
  onLoadSuccess,
  people,
}: {
  onLoadSuccess: (response: PeopleResponse) => void;
  people: PeopleResponse;
}): ReactNode {
  const { state } = useNavigation();
  const data = useLoaderData() as { people: Person[] };

  if (state === 'loading') {
    return <Spinner />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Await
        resolve={data.people}
        errorElement={<p>Something went wrong while people fetching</p>}
      >
        <PeopleList onLoadSuccess={onLoadSuccess} />
      </Await>
      <Pagination next={!!people.next} prev={!!people.previous} />
    </Suspense>
  );
}

export default PeopleRoute;
