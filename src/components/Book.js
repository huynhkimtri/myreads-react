import { Link } from "react-router-dom";

const Book = ({ lstBook, book, onUpdateBookshelf }) => {
  const handleShelfChange = (newShelf) => {
    if (newShelf !== book.shelf) {
      onUpdateBookshelf(book, newShelf);
    }
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks?.thumbnail})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            value={lstBook.find((b) => b.id === book.id)?.shelf || "none"}
            onChange={(e) => handleShelfChange(e.target.value)}
          >
            <option value="moveto" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <span style={{ display: "none" }}>{book.id}</span>
      <div className="book-title">
        <Link to={`/book/${book.id}`}>{book.title}</Link>
      </div>
      <div className="book-authors">
        {book.authors ? book.authors.join(", ") : ["Unknown Author"]}
      </div>
    </div>
  );
};

export default Book;
