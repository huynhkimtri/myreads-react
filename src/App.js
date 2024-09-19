import "./App.css";
import { useEffect, useState } from "react";
import * as BooksAPI from "./utils/BooksAPI";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "./pages/Main";
import Search from "./pages/Search";

function App() {
  let navigate = useNavigate();
  const [lstBook, setLstBook] = useState([]);

  useEffect(() => {
    const getAllListOfBook = async () => {
      const res = await BooksAPI.getAll();
      console.log("🚀 ~ getAllListOfBook ~ res:", res);
      setLstBook(res);
    };

    getAllListOfBook();
  }, []);

  const updateBookStatus = async (book, newShelf) => {
    console.log("🚀 ~ updateBookStatus ~ book:", book);
    console.log("🚀 ~ updateBookStatus ~ newShelf:", newShelf);
    await BooksAPI.update(book, newShelf);

    // Check if the book already exists
    const index = lstBook.findIndex((b) => b.id === book.id);

    if (index !== -1) {
      // If it exists, update the book
      const updatedLstBooks = [...lstBook];
      updatedLstBooks[index] = { ...book, newShelf };
      console.log("🚀 ~ If it exists, update the book:", updatedLstBooks);
      setLstBook(updatedLstBooks);
    } else {
      // If it doesn't exist, add the new book
      console.log([...lstBook, book]);
      console.log("🚀 ~ If it doesn't exist, add the new book:", [
        ...lstBook,
        book,
      ]);
      setLstBook([...lstBook, book]);
    }
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Main lstBook={lstBook} onUpdateBookshelf={updateBookStatus} />
        }
      />
      <Route
        path="/search"
        element={
          <Search lstBook={lstBook} onUpdateBookshelf={updateBookStatus} />
        }
      />
    </Routes>
  );
}

export default App;
