import React from 'react'
import * as BooksAPI from './BooksAPI';

class SearchBooksInput extends React.Component {
  state = {
    searchQuery: ''
  };

  handleQuery = (searchQuery) => {
    this.setState(
      {searchQuery: searchQuery},
    );
    this.props.onSearch(searchQuery);
  };

  render() {
    const {searchQuery} = this.state;
      return (
        <div className="search-books-input-wrapper">
          <input 
            type="text"
            placeholder="Search by title, author, or genre" 
            value={searchQuery}
            onChange={(event) => this.handleQuery(event.target.value)}
            autoFocus
          />
        </div>
      )
  }
}

export default SearchBooksInput