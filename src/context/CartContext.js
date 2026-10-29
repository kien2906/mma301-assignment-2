import React, { createContext, useEffect, useReducer, useState } from "react";
import { cartReducer, initialState } from "../reducers/cartReducer";
import { getCart, saveCart } from "../services/cartStorage";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await getCart();

      dispatch({
        type: "RESTORE_CART",
        payload: Array.isArray(savedCart) ? savedCart : [],
      });

      setIsLoaded(true);
    };

    loadCart();
  }, []);
  useEffect(() => {
    if (isLoaded) {
      saveCart(state.items);
    }
  }, [state.items, isLoaded]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
