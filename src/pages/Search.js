import { useState } from "react";
import { Link } from "react-router-dom";
import Book from "../components/Book";
import * as BooksAPI from "../utils/BooksAPI";
import { MAX_RESULT } from "../utils/constants";
import { debounce } from "../utils/debounce";

const Search = ({ lstBook, onUpdateBookshelf }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [lstSearchBookResults, setLstSearchBookResults] = useState([]);

  const handleSearchInputChange = (value) => {
    const query = value.trim();
    setSearchQuery(query);
    if (query.length > 0) {
      debouncedSearchResults(query);
    } else {
      setLstSearchBookResults([]);
    }
  };

  const handleSearchBook = async (searchQuery) => {
    const res = await BooksAPI.search(searchQuery, MAX_RESULT);
    console.log("🚀 ~ getLstSearchBook ~ res:", res);
    setLstSearchBookResults(res);
  };

  const debouncedSearchResults = debounce(handleSearchBook, 300); // 300ms delay

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={searchQuery}
            placeholder="Search by title, author, or ISBN"
            onChange={(event) => handleSearchInputChange(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {lstSearchBookResults.length > 0 &&
            lstSearchBookResults.map((book) => (
              <Book
                key={book.id}
                lstBook={lstBook}
                book={book}
                onUpdateBookshelf={onUpdateBookshelf}
              />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
