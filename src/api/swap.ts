import People from '../types/People';

const SWAPI_BASE_URL = 'https://swapi.dev/api';
export const SWAPI_PEOPLE_URL = `${SWAPI_BASE_URL}/people`;

export async function getPeople(searchTerm: string): Promise<People[]> {
  const url = searchTerm
    ? `${SWAPI_PEOPLE_URL}/?search=${searchTerm}`
    : SWAPI_PEOPLE_URL;
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}
