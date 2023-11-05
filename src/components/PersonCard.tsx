import React, { Suspense } from 'react';
import {
  Await,
  Link,
  defer,
  useAsyncValue,
  useLoaderData,
  useLocation,
  useNavigation,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { getPerson } from '../api/swap';
import Spinner from './Spinner';
import People from '../types/People';

export async function loader({ params }: { params: { personId: number } }) {
  const person = getPerson(params.personId);
  // const people = [{ name: 'test', height: 'test', mass: 'test' }];
  return defer({ person });
}

export const PersonCard = () => {
  const location = useLocation();
  const data = useLoaderData();
  //   const { people } = useOutletContext();
  const params = useParams();

  //   const selected = people.find((item) => item.url === location.pathname);

  //   const url = new URL(request.url);
  //   const searchTerm = url.searchParams.get('term');

  console.log('PersonCard >>>', { location, params });
  return (
    <div>
      <Link to={`/${location.search}`}>
        <h2>Close X</h2>
      </Link>
      <Suspense fallback={<Spinner />}>
        <Await resolve={data.person} errorElement={<p>Error fetched!</p>}>
          <PersonSection />
        </Await>
      </Suspense>
    </div>
  );
};

const PersonSection = () => {
  const person = useAsyncValue() as People;

  return (
    !!person && (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>Name: {person.name}</span>
        <span>Height: {person.height}</span>
        <span>Mass: {person.mass}</span>
        <span>Gender: {person.gender}</span>
        <span>Hair Color: {person.hair_color}</span>
      </div>
    )
  );
};
