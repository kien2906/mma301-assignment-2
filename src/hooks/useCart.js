import React, { useContext } from "react";
import CartContext from "../context/CartContext";

const useCart = () => {
  const { state, dispatch } = useContext(CartContext);

  const addCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  };

  const increaseQuantity = (id) => {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: { id },
    });
  };

  const decreaseQuantity = (id) => {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: { id },
    });
  };

  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  };

  const totalPrice = state.items.reduce((sum, item) => {
    return sum + item.quantity * item.price;
  }, 0);

  const totalItems = state.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return {
    items: state.items,
    addCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
    totalItems,
  };
};

export default useCart;
