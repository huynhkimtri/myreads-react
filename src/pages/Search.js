import { useState } from "react";
import { Link } from "react-router-dom";
import Book from "../components/Book";
import * as BooksAPI from "../utils/BooksAPI";

const Search = ({ onUpdateBookshelf }) => {
  const [query, setQuery] = useState("");
  const [lstSearchBook, setLstSearchBook] = useState([]);

  useState(() => {
    const getLstSearchBook = async () => {
      if (query.length > 0) {
        const res = await BooksAPI.search(query, 10);
        console.log("🚀 ~ getLstSearchBook ~ res:", res);
        setLstSearchBook(res);
      }
    };

    getLstSearchBook();
  }, [query]);

  const updateQuery = (query) => {
    let q = query.trim();
    console.log("🚀 ~ updateQuery ~ q:", q);
    setQuery(q);
  };

  const clearQuery = () => {
    updateQuery("");
  };

  const lstFilteredBook =
    query === ""
      ? lstSearchBook
      : lstSearchBook.filter(
          (b) =>
            b.title.toLowerCase().includes(query.toLowerCase()) ||
            b.description.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={query}
            placeholder="Search by title, author, or ISBN"
            onChange={(event) => updateQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {lstFilteredBook &&
            lstFilteredBook.map((book) => (
              <Book
                key={book.id}
                data={book}
                onUpdateBookshelf={onUpdateBookshelf}
              />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
