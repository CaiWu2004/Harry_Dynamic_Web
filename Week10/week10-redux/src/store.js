import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import uiReducer from "./features/uiSlice";
import favouritesReducer from "./features/favouritesSlice";

// One store for the whole application. `reducer` is a map: each key becomes
// a top-level slice of state, so our cart lives at state.cart.

//Two keys, two slices, one store. state.cart is owned entirely by the cart
//slice and state.ui entirely by the ui slice: neither can reach the other.
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
    favourites: favouritesReducer,
  },
});
