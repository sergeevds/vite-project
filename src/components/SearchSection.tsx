import React from 'react';

type SearchSectionProps = Readonly<{
  term: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: () => void;
}>;

type SearchSectionState = Readonly<{
  term: string;
}>;

class SearchSection extends React.Component<
  SearchSectionProps,
  SearchSectionState
> {
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.handleClick();
  };

  render() {
    return (
      <div>
        <div>
          <h3>Search for Star Wars characters</h3>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search ..."
            onChange={this.props.handleChange}
            value={this.props.term}
          />
          <button onClick={this.props.handleClick}>Search</button>
        </form>
      </div>
    );
  }
}

export default SearchSection;
