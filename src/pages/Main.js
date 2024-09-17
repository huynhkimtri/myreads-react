import { Link } from "react-router-dom";
import Bookshelf from "../components/Bookshelf";
import { CURRENTLY_READING, READ, WANT_TO_READ } from "../utils/constants";

const Main = ({ lstBook, onUpdateBookshelf }) => {
  const lstBookCurrentRead = lstBook.filter(
    (book) => CURRENTLY_READING === book.shelf
  );

  const lstBookWantToRead = lstBook.filter(
    (book) => WANT_TO_READ === book.shelf
  );

  const lstBookRead = lstBook.filter((book) => READ === book.shelf);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <Bookshelf
          title="Currently Reading"
          lstBook={lstBookCurrentRead}
          onUpdateBookshelf={onUpdateBookshelf}
        />
        <Bookshelf
          title="Want to Read"
          lstBook={lstBookWantToRead}
          onUpdateBookshelf={onUpdateBookshelf}
        />
        <Bookshelf
          title="Read"
          lstBook={lstBookRead}
          onUpdateBookshelf={onUpdateBookshelf}
        />
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default Main;
