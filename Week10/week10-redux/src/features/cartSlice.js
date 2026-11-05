import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  // `name` is a label. It prefixes every action type this slice produces,
  // so the one below becomes the string 'cart/itemAdded'.
  name: "cart",

  // the shape this slice owns, before anything happens
  initialState: {
    items: [],
  },
  // Each function in here is a reducer: current state in, next state out.
  // Exactly the shape you wrote by hand in Week 08.
  reducers: {
    itemAdded(state, action) {
      const print = action.payload;
      const existing = state.items.find((item) => item.id === print.id);
      //if we already have that item in our cart,
      // but we click it again, we don't add a
      // new line, we only update the quantity
      // and return.
      if (existing) {
        existing.quantity = existing.quantity + 1;
        return;
      }
      //this directly mustates state, state because toolkit is using immer under the hood
      //when immer is used, all of the copying and setting is done behind the scenes for us
      state.items.push({ ...print, quantity: 1 });
    },

    quantityIncreased(state, action) {
      //the payload is just the id this time. An action carries whatever
      //reducer needs, and no more
      const item = state.items.find((item) => item.id === action.payload);

      if (item) {
        item.quantity = item.quantity + 1;
      }
    },

    quantityDecreased(state, action) {
      const item = state.items.find((item) => item.id === action.payload);

      if (!item) {
        return;
      }

      //going below one removes the row, which is what people expect
      if (item.quantity === 1) {
        state.items = state.items.filter(
          (entry) => entry.id !== action.payload,
        );
        return;
      }

      item.quantity = item.quantity - 1;
    },

    itemRemoved(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    cartCleared(state) {
      //no action needed: this one carries no information at all
      state.items = [];
    },
  },
});

// createSlice writes the action creators for us, one per reducer, with
// matching names. We just have to export them.
export const {
  itemAdded,
  quantityIncreased,
  quantityDecreased,
  itemRemoved,
  cartCleared,
} = cartSlice.actions;

// Selectors: small functions that know how to dig a value out of the store.
// They live next to the slice that owns the data, so if the shape of
//state.cart ever changes, this file is the only one that has to.
export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((running, item) => running + item.quantity, -0);

export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (running, item) => running + item.quantity * item.price,
    0,
  );

// and the reducer itself, which is what the store wants
export default cartSlice.reducer;
