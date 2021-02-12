import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from "./Bookshelf"

const ListBooks = props => {

  const {bookShelves, books, onShelfChange} = props;

  console.log(books)

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {bookShelves.map(bookshelf => (
            <BookShelf
              key={bookshelf.key}
              bookshelf={bookshelf}
              books={books}
              onShelfChange={onShelfChange}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
      <Link to="/search">
        <button>Add a book</button>
      </Link>
      </div>
    </div>
  )
}

export default ListBooks