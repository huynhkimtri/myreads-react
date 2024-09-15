import BookshelfChanger from "./BookshelfChanger";

const Book = ({ data }) => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${data.imageLinks.thumbnail})`,
          }}
        ></div>
        <BookshelfChanger />
      </div>
      <span style={{ display: "none" }}>{data.id}</span>
      <div className="book-title">{data.title}</div>
      <div className="book-authors">{data.authors}</div>
    </div>
  );
};

export default Book;
