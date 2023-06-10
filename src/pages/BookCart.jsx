import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { deleteFromCart, getCart } from "../services/api";
import { IconButton } from "@mui/material";
import { Delete } from "../icons";
import { useNavigate } from "react-router-dom";

const BookCart = () => {
  const navigateTo = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await getCart();
      setCart(response.data.cart); // Assuming the cart data is returned as an array in the "cart" property
    } catch (error) {
      console.log("Error fetching cart data:", error);
    }
  };

  const handleClick = (book_id) => {
    navigateTo(`/books/${book_id}`);
  };

  const handleDeleteFromCart = async (bookId) => {
    try {
      await deleteFromCart(bookId);
      fetchCartData(); // Fetch updated cart data after deletion
    } catch (error) {
      console.log("Error deleting book from cart:", error);
    }
  };

  return (
    <>
      {cart.map((book) => (
        <CartWrapper key={book.id}>
          <img src={`http://localhost:8000/${book.cover}`} alt="BookCover" />
          <div className="cart-details">
            <h3>{book.title}</h3>
            <p>{book.booksnum}</p>
          </div>
          <IconButton
            onClick={() => handleDeleteFromCart(book.book_id)}
            aria-label="Delete"
          >
            <Delete />
          </IconButton>
          <button onClick={() => handleClick(book.book_id)}>
            View Details
          </button>
        </CartWrapper>
      ))}
    </>
  );
};

const CartWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid hsl(var(--divider));
  border-radius: 4px;

  img {
    width: 80px;
    height: 120px;
    object-fit: cover;
    border-radius: 4px;
  }

  .cart-details {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.5rem;

    h3 {
      font-size: 1.2rem;
      font-weight: bold;
    }

    p {
      font-size: 1rem;
    }
  }
`;

export default BookCart;
