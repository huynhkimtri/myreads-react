const Bookshelf = ({ title }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          <li>Book 1</li>
          <li>Book 2</li>
        </ol>
      </div>
    </div>
  );
};

export default Bookshelf;
