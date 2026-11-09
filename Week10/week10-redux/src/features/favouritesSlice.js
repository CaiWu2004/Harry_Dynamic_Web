import { createSlice } from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    ids: [],
  },
  reducers: {
    favouriteToggled(state, action) {
      const id = action.payload;
      const index = state.ids.indexOf(id);

      if (index === -1) {
        state.ids.push(id);
      } else {
        state.ids.splice(index, 1);
      }
    },
  },
});

export const { favouriteToggled } = favouritesSlice.actions;

export const selectFavouriteIds = (state) => state.favourites.ids;
export const selectFavouriteCount = (state) => state.favourites.ids.length;

export default favouritesSlice.reducer;
