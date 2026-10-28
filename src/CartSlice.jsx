import { createSlice } from '@reduxjs/toolkit';

// Each cart entry is { name, image, cost, quantity }. Plant names are unique, so the name is the key.
export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    // Add a plant to the cart. Adding one that is already there bumps its quantity.
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    // Remove a plant from the cart entirely. The payload is the plant name.
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
    // Set a plant's quantity. Anything below 1 removes it.
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      if (quantity < 1) {
        state.items = state.items.filter((item) => item.name !== name);
        return;
      }
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

// Total number of plants in the cart (sum of quantities) - drives the navbar badge.
export const selectTotalQuantity = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

// Total price of everything in the cart.
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.cost * item.quantity, 0);

export default CartSlice.reducer;
