import React, { useCallback } from 'react';

type SearchSectionProps = Readonly<{
  term: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
}>;

function SearchSection(props: SearchSectionProps) {
  const { handleClick } = props;

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleClick();
    },
    [handleClick]
  );

  return (
    <div>
      <div>
        <h3>Search for Star Wars characters</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search ..."
          onChange={props.handleChange}
          value={props.term}
        />
        <button onClick={props.handleClick}>Search</button>
      </form>
    </div>
  );
}

export default SearchSection;
