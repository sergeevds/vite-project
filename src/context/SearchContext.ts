import { createContext } from 'react';

import { LOCAL_STORAGE_SEARCH_TERM_KEY } from '../components/SearchSection';

type SearchContextType = {
  term: string;
  setTerm: (term: string) => void;
};

export const SearchContext = createContext<SearchContextType>({
  term: localStorage.getItem(LOCAL_STORAGE_SEARCH_TERM_KEY) || '',
  setTerm: () => {},
});
