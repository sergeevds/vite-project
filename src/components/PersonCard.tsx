import { Link, useLocation } from 'react-router-dom';

export const PersonCard = () => {
  const location = useLocation();
  return (
    <div>
      <Link to={`/${location.search}`}>
        <h2>Close X</h2>
      </Link>
      <h1>PERSON CARD !!!</h1>
    </div>
  );
};
