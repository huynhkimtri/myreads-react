import "./App.css";
import { useState } from "react";
import * as BooksAPI from "./utils/BooksAPI";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "./pages/Main";
import Search from "./pages/Search";

function App() {
  let navigate = useNavigate();
  const [lstBook, setLstBook] = useState([]);

  useState(() => {
    const getAllListOfBook = async () => {
      const res = await BooksAPI.getAll();
      console.log("🚀 ~ getAllListOfBook ~ res:", res);
      setLstBook(res);
    };

    getAllListOfBook();
  }, []);

  const updateBookStatus = async (book, targetShelf) => {
    console.log("🚀 ~ updateBookStatus ~ targetShelf:", targetShelf);
    await BooksAPI.update(book, targetShelf);
    const updateLstBook = lstBook.map((b) =>
      b.id !== book.id ? b : Object.assign({}, b, { shelf: targetShelf })
    );
    console.log("🚀 ~ updateBookStatus ~ updateLstBook:", updateLstBook);
    setLstBook(updateLstBook);
    navigate("/");
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
        element={<Search onUpdateBookshelf={updateBookStatus} />}
      />
    </Routes>
  );
}

export default App;
