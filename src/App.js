import React from 'react';
import { Route } from 'react-router-dom';
import { debounce } from 'throttle-debounce';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    myBooks: [],
    searchResults: [],
    searchReturnedBooks: true
  };

  componentDidMount = () => {
    BooksAPI.getAll()
      .then(books => {
        this.setState(() => ({
          myBooks: books
        }))
      });
  };

  resetSearch = () => {
    this.setState(
      {searchResults: []}
    );
  };

  changeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf);

    if (shelf === "none") {
      this.setState(prevState => ({
        myBooks: prevState.myBooks.filter(b => b.id !== book.id)
      }));
    } else {
      book.shelf = shelf;
      this.setState(prevState => ({
        myBooks: prevState.myBooks.filter(b => b.id !== book.id).concat(book)
      }));
    }
  };

  searchBooks = debounce(300, false, query => {
    if (query) {
      BooksAPI.search(query)
        .then(books => {
          // when books aren't returned
          if (books.error) {
            this.setState(
              {searchResults: [],
               searchReturnedBooks: false}
            );
          } else {
            this.setState(
              {searchResults: books,
               searchReturnedBooks: true}
            );
          }
      });
    } else {
      // reset when query empty
      this.setState(
        {searchResults: [],
         searchReturnedBooks: true});
    }
  });


  render() {
    const bookShelves = [
      {key: 'currentlyReading', name: 'Currently Reading'},
      {key: 'wantToRead', name: 'Want to Read'},
      {key: 'read', name: 'Read'}
    ];

    return (
      <div className="app">
        <Route
          exact
          path='/'
          render={() => (
            <ListBooks
              bookShelves={bookShelves}
              books={this.state.myBooks}
              onShelfChange={this.changeBookShelf}
            />
          )}
        />
        <Route
          exact
          path='/search'
          render={() => (
            <SearchBooks
              onResetSearch={this.resetSearch}
              onSearch={this.searchBooks}
              searchResults={this.state.searchResults}
              books={this.state.myBooks}
              onShelfChange={this.changeBookShelf}
              searchReturnedBooks={this.state.searchReturnedBooks}
            />
          )}
        />
      </div>
    )
  };
}

export default BooksApp
