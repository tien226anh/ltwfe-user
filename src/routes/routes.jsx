import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BookList } from "../pages";
import BookDetail from "../pages/BookDetail";

const Router = () => (
  <BrowserRouter>
    <Routes>
      {/* <Route exact path="/" element={<Main />} /> */}
      <Route exact path="/" element={<BookList />} />
      <Route exact path="/books/:id" element={<BookDetail />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
