import { useState } from "react";
import BookshelfChanger from "./BookshelfChanger";

const Book = ({ data, onUpdateBookshelf }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    const option = event.target.value;
    const currentShelf = data.shelf;
    console.log("🚀 ~ handleChange ~ currentShelf:", currentShelf);
    console.log("🚀 ~ handleChange ~ option:", option);

    if (currentShelf !== option) {
      onUpdateBookshelf(data, option);
      setSelectedOption(option);
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
            backgroundImage: `url(${data.imageLinks.thumbnail})`,
          }}
        ></div>
        <BookshelfChanger
          selectedOption={data.shelf}
          handleChange={handleChange}
        />
      </div>
      <span style={{ display: "none" }}>{data.id}</span>
      <div className="book-title">{data.title}</div>
      <div className="book-authors">{data.authors}</div>
    </div>
  );
};

export default Book;
