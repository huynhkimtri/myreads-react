const BookshelfChanger = ({ selectedOption, handleChange }) => {
  return (
    <div className="book-shelf-changer">
      <select value={selectedOption} onChange={handleChange}>
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
