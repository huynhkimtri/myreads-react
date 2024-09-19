const BookshelfChanger = ({ lstBook, book, handleShelfChange }) => {
  return (
    <div className="book-shelf-changer">
      <select
        value={lstBook.find((b) => b.id === book.id)?.shelf || "none"}
        onChange={(e) => handleShelfChange(book.id, e.target.value)}
      >
        <option value="none" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export default BookshelfChanger;
