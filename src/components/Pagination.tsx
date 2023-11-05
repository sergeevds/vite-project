import { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

const Pagination = ({
  next,
  prev,
}: {
  next: boolean;
  prev: boolean;
}): ReactNode => {
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
    <div style={{ display: 'flex', marginTop: '0.5em' }}>
      <button type="button" disabled={!prev} onClick={handlePrevClick}>
        Previous
      </button>
      <h3 style={{ margin: '0.5em' }}>{currentPage}</h3>
      <button type="button" disabled={!next} onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
