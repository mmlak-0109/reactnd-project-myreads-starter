import React from "react"
import Book from "./Book"

const BooksGrid = props => {
  const {books, onShelfChange} = props;

  return (
    <ol className="books-grid">
      {books.map(book => (
        <Book 
          key={book.id}
          book={book}
          onShelfChange={onShelfChange} 
        />
      ))}
    </ol>
  )
}

export default BooksGrid