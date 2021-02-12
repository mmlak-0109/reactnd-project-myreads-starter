import React from 'react'
import BooksGrid from './BooksGrid';

const BookShelf = props => {

  const {bookshelf, books, onShelfChange} = props;
  const thisShelvesBooks = books.filter(book => book.shelf === bookshelf.key);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{bookshelf.name}</h2>
      <div className="bookshelf-books">
        <BooksGrid 
          books={thisShelvesBooks}
          onShelfChange={onShelfChange}
        />
      </div>
    </div>
  )
}

export default BookShelf