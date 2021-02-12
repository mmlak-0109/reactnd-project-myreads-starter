import React from 'react';
import { Link } from 'react-router-dom';
import SearchBooksInput from './SearchBooksInput'
import BooksGrid from "./BooksGrid";

const SearchBooks = props => {
  const {onResetSearch, onSearch, searchResults, books, onShelfChange} = props;
  
  const updatedShelfBooks = searchResults.map(book => {
    books.map(b => {
      if (b.id === book.id) {
        book.shelf = b.shelf;
      }
      return b;
    });
    return book;
  });

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search" onClick={onResetSearch}>Close</button>
        </Link>
        <SearchBooksInput onSearch={onSearch} />
      </div>
      <div className="search-books-results">
        <BooksGrid 
          books={updatedShelfBooks} 
          onShelfChange={onShelfChange}
        />
      </div>
    </div>
  )
}

export default SearchBooks