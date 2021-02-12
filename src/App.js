import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    myBooks: [],
    searchResults: [],
    hasError: false
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

    if (shelf === "None") {
      this.setState(prevState => ({
        myBooks: prevState.myBooks.filter(b => b.id !== book.id)
      }))
    } else {
      book.shelf = shelf;
      this.setState(prevState => ({
        myBooks: prevState.myBooks.filter(b => b.id !== book.id).concat(book)
      }))
    }
  };

  searchBooks = (query) => {
    if (query) {
      BooksAPI.search(query)
        .then(books => {
          if (books.error) {
            this.setState(
              {searchResults: []}
            );
          } else {
            this.setState(
              {searchResults: books}
            );
          }
      });
    } else {
      this.setState({searchResults: []});
    }
  };


  render() {
    const bookshelves = [
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
              bookShelves={bookshelves}
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
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp
