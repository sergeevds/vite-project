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
  useSearchParams,
} from 'react-router-dom';
import PeopleList from './PeopleList';

export async function loader({
  request,
}: {
  request: Request;
  params: { personId?: string };
}) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('term');
  const page = url.searchParams.has('page')
    ? +url.searchParams.get('page')!
    : 1;

  console.warn('PEOPLE LOADER >>>', { searchTerm, page });
  const people = getPeople(searchTerm || '', page);
  // const people = [{ name: 'test', height: 'test', mass: 'test' }];
  return defer({ people });
}

function ResultSection({ onLoadSuccess, people }) {
  const { state } = useNavigation();
  const data = useLoaderData() as { people: People[] };

  if (state === 'loading') {
    return <Spinner />;
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={data.people} errorElement={<p>Error fetched!</p>}>
        <PeopleList onLoadSuccess={onLoadSuccess} />
      </Await>
      <Pagination next={!!people.next} prev={!!people.previous} />
    </Suspense>
  );
}

const Pagination = ({ next, prev }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.has('page') ? +searchParams.get('page')! : 1;

  const handleNextClick = () => {
    const newSearchParams = {
      ...searchParams,
      term: searchParams.get('term') || '',
      page: currentPage + 1,
    };
    setSearchParams(newSearchParams);
  };

  const handlePrevClick = () => {
    const newSearchParams = {
      ...searchParams,
      term: searchParams.get('term') || '',
      page: currentPage - 1,
    };
    setSearchParams(newSearchParams);
  };

  return (
    <div style={{ display: 'flex' }}>
      {prev && (
        <button type="button" onClick={handlePrevClick}>
          Previous
        </button>
      )}
      <h3>{currentPage}</h3>
      {next && (
        <button type="button" onClick={handleNextClick}>
          Next
        </button>
      )}
    </div>
  );
};

export default ResultSection;
