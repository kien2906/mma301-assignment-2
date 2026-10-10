export const initialState = {
  items: [],
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((p) =>
          p.id === action.payload.id ? { ...p, quantity: p.quantity + 1 } : p,
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((p) =>
          p.id === action.payload.id
            ? { ...p, quantity: Math.max(1, p.quantity - 1) }
            : p,
        ),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((p) => p.id !== action.payload.id),
      };
    case "RESTORE_CART":
      return {
        ...state,
        items: action.payload,
      };
  }
};
