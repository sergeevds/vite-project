import { ReactNode, Suspense } from 'react';
import {
  Await,
  Link,
  defer,
  useLoaderData,
  useLocation,
} from 'react-router-dom';

import { getPerson } from '../api/swap';
import Spinner from './Spinner';
import Person from '../types/People';
import PersonCard from './PersonCard';

export async function loader({ params }: { params: { personId: number } }) {
  const person = getPerson(params.personId);
  return defer({ person });
}

const PersonRoute = (): ReactNode => {
  const location = useLocation();
  const data = useLoaderData() as { person: Person };

  return (
    <div>
      <Link to={`/${location.search}`}>
        <h2>Close X</h2>
      </Link>
      <Suspense fallback={<Spinner />}>
        <Await
          resolve={data.person}
          errorElement={<p>Something went wrong while person fetching</p>}
        >
          <PersonCard />
        </Await>
      </Suspense>
    </div>
  );
};

export default PersonRoute;
