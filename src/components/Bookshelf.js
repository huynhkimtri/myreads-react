import Book from "./Book";

const Bookshelf = ({ title, lstBook, onUpdateBookshelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {lstBook &&
            lstBook.map((book) => (
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

export default Bookshelf;
