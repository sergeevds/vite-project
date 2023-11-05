import Person from '../types/People';

export type PeopleResponse = {
  next: string;
  previous: string;
  results: Person[];
};
