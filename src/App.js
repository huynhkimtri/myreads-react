import "./App.css";
import { useState } from "react";
import Bookshelf from "./components/Bookshelf";
import * as BooksAPI from "./utils/BooksAPI";
import { CURRENTLY_READING, READ, WANT_TO_READ } from "./utils/constants";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [lstBook, setLstBook] = useState([]);

  const lstBookCurrentRead = lstBook.filter(
    (book) => CURRENTLY_READING === book.shelf
  );
  const lstBookWantToRead = lstBook.filter(
    (book) => WANT_TO_READ === book.shelf
  );
  const lstBookRead = lstBook.filter((book) => READ === book.shelf);

  const getAllListOfBook = async () => {
    const res = await BooksAPI.getAll();
    console.log("🚀 ~ getAllListOfBook ~ res:", res);
    setLstBook(res);
  };

  useState(() => {
    getAllListOfBook();
  }, []);

  const updateBookStatus = async (book, targetShelf) => {
    console.log("🚀 ~ updateBookStatus ~ targetShelf:", targetShelf);
    await BooksAPI.update(book, targetShelf);
    getAllListOfBook();
    navigate("/");
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
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
                  <Bookshelf
                    title="Currently Reading"
                    lstBook={lstBookCurrentRead}
                    onUpdateBookshelf={updateBookStatus}
                  />
                  <Bookshelf
                    title="Want to Read"
                    lstBook={lstBookWantToRead}
                    onUpdateBookshelf={updateBookStatus}
                  />
                  <Bookshelf
                    title="Read"
                    lstBook={lstBookRead}
                    onUpdateBookshelf={updateBookStatus}
                  />
                </div>
                <div className="open-search">
                  <a onClick={() => setShowSearchpage(!showSearchPage)}>
                    Add a book
                  </a>
                </div>
              </div>
            )}
          </div>
        }
      />
    </Routes>
  );
}

export default App;
