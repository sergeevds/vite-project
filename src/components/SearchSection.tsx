import React, { useCallback } from 'react';
import { redirect, useFetcher, useLocation } from 'react-router-dom';

export const LOCAL_STORAGE_SEARCH_TERM_KEY = 'term';

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const url = new URL(request.url);
  const newTerm = (formData.get('term') as string) || '';
  localStorage.setItem(LOCAL_STORAGE_SEARCH_TERM_KEY, newTerm);
  return redirect(`${url.pathname}?term=${newTerm}`);
}

function SearchSection() {
  const location = useLocation();
  const fetcher = useFetcher();

  const [term, setTerm] = React.useState<string>(
    new URLSearchParams(location.search).get('term') ||
      localStorage.getItem(LOCAL_STORAGE_SEARCH_TERM_KEY) ||
      ''
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTerm(event.target.value);
    },
    []
  );
  return (
    <div>
      <fetcher.Form
        id="search-form"
        role="search"
        method="post"
        action={location.pathname}
      >
        <input
          name="term"
          type="text"
          placeholder="Search ..."
          onChange={handleChange}
          value={term}
        />
        <button type="submit">Search</button>
      </fetcher.Form>
    </div>
  );
}

export default SearchSection;
