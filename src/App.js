import "./App.css";
import { useState } from "react";
import Bookshelf from "./components/Bookshelf";
import * as BooksAPI from "./utils/BooksAPI";
import { CURRENTLY_READING, READ, WANT_TO_READ } from "./utils/constants";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [lstBook, setLstBook] = useState([]);

  const lstBookCurrentRead = lstBook.filter(
    (book) => CURRENTLY_READING === book.shelf
  );
  const lstBookWantToRead = lstBook.filter(
    (book) => WANT_TO_READ === book.shelf
  );
  const lstBookRead = lstBook.filter((book) => READ === book.shelf);

  useState(() => {
    const getAllListOfBook = async () => {
      const res = await BooksAPI.getAll();
      console.log("🚀 ~ getAllListOfBook ~ res:", res);
      setLstBook(res);
    };

    getAllListOfBook();
  }, []);

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Bookshelf title="Currently Reading" lstBook={lstBookCurrentRead} />
            <Bookshelf title="Want to Read" lstBook={lstBookWantToRead} />
            <Bookshelf title="Read" lstBook={lstBookRead} />
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
