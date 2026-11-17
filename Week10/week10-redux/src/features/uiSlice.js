import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartIsVisible: false,
    colourFilter: "all",
    favouritesOnly: false,
  },
  reducers: {
    filterChanged(state, action) {
      state.colourFilter = action.payload;
    },
    favouritesOnlyToggled(state) {
      state.favouritesOnly = !state.favouritesOnly;
    },
  },
});

export const { filterChanged, favouritesOnlyToggled } = uiSlice.actions;

export const selectColourFilter = (state) => state.ui.colourFilter;
export const selectFavouritesOnly = (state) => state.ui.favouritesOnly;
export default uiSlice.reducer;
