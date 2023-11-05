import People from '../types/People';
import { transformURLsArray } from './utils';

const SWAPI_BASE_URL = 'https://swapi.dev/api';
export const SWAPI_PEOPLE_URL = `${SWAPI_BASE_URL}/people`;

export async function getPeople(searchTerm: string, page: number): Promise<People[]> {
  const url = searchTerm
    ? `${SWAPI_PEOPLE_URL}/?search=${searchTerm}&page=${page}`
    : `${SWAPI_PEOPLE_URL}/?page=${page}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log('response >>>', {res: transformURLsArray(data.results, ['url'])})
  return {
    ...data,
    results: transformURLsArray(data.results, ['url'])
  };
}

export async function getPerson(personId: number): Promise<People> {
  const url = `${SWAPI_PEOPLE_URL}/${personId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}