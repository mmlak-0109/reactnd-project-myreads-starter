import React from 'react'
import BookShelfChanger from './BookShelfChanger'

const Book = props => {
  const {book, onShelfChange} = props;

  return (
    <li>
      <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${
              // use API included image if available, else use replacement
              book.imageLinks
                ? book.imageLinks.thumbnail
                : 'icons/No_image_available_450_x_600.svg' //from https://commons.wikimedia.org/wiki/File:No_image_available_450_x_600.svg
              })`}}>
        </div>
        <BookShelfChanger 
          book={book} 
          shelf={book.shelf} 
          onShelfChange={onShelfChange} 
        />
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{
        // return "Unknown" when "authors" is missing from any books
        book.authors ? book.authors.join(', ') : "Unknown"
        }
      </div>
      </div>
    </li>
  )
}

export default Book