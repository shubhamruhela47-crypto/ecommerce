import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ➕ ADD TO CART
    addToCart: (state, action) => {
      const item = action.payload;

      const getId = (x) => x && (x.productId || x._id);
      const itemId = getId(item);

      const existingItem = state.cartItems.find((x) => getId(x) === itemId);

      if (existingItem) {
        state.cartItems = state.cartItems.map((x) =>
          getId(x) === itemId ? item : x,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // ❌ REMOVE FROM CART
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (x) => !(x && (x.productId || x._id) === idToRemove),
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    // 🧹 CLEAR CART
    clearCart: (state) => {
      state.cartItems = [];

      localStorage.removeItem("cartItems");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
