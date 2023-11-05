import { ReactNode } from 'react';
import { useAsyncValue } from 'react-router-dom';
import Person from '../types/People';

const PersonCard = (): ReactNode => {
  const person = useAsyncValue() as Person;

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

export default PersonCard;
