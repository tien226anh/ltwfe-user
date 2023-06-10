import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BookCart, BookList } from "../pages";
import BookDetail from "../pages/BookDetail";
import { Navigator } from "../layout";
import Login from "../pages/Login";

const Router = () => (
  <BrowserRouter>
    <Navigator />
    <Routes>
      <Route exact path="/" element={<BookList />} />
      <Route exact path="/books/:id" element={<BookDetail />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/cart" element={<BookCart />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
