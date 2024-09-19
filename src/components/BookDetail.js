import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function getBookDetail() {
      const res = await BooksAPI.get(id);
      setBook(res);
    }

    getBookDetail();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-detail">
      <div className="book-title">
        <h1>Title: {book.title}</h1>
      </div>
      <div className="book-authors">
        <h2>
          Authors: {book.authors ? book.authors.join(", ") : ["Unknown Author"]}
        </h2>
      </div>
      <div className="book-info">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks?.thumbnail})`,
          }}
        ></div>
        <div>
          <p>Publisher: {book.publisher}</p>
          <p>Published date: {book.publishedDate}</p>
          <p>
            Categories:{" "}
            {book.categories
              ? book.categories.join(", ")
              : ["Unknown category"]}
          </p>
          <p>{book.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
