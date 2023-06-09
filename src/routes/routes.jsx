import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BookList, Main } from "../pages";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route exact path="/books" element={<BookList />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
