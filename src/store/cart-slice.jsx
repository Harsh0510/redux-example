import { createSlice } from "@reduxjs/toolkit";

let cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalQuantity: 0 },
  reducers: {
    addItemToCart(state, action) {
      let newItem = action.payload;
      let existingCartItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingCartItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingCartItem.quantity++;
        existingCartItem.totalPrice =
          existingCartItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      let id = action.payload;
      let existingCartItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingCartItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingCartItem.quantity--;
        existingCartItem.totalPrice =
          existingCartItem.totalPrice - existingCartItem.price;
      }
    },
  },
});

export let cartActions = cartSlice.actions;

export default cartSlice;
