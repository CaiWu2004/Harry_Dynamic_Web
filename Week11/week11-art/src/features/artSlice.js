import { createSlice, nanoid } from "@reduxjs/toolkit";

const artSlice = createSlice({
  name: "art",

  initialState: {
    searchTerm: "",
    data: [],
  },

  reducers: {
    //assumption ever reducer makes
    //whatever we want to change the value TO is arriving as action.payload
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },

    addArt(state, action) {
      //A slice can not see another slices states, the name and price live in formSlice and here is no way to reach them from here.
      // So the component reads them and sends in action.payload
      //So we will assum action.payload is {name: "modrian, comp 1", price: 500}
      //what about the unique id?
      state.data.push({
        id: nanoid(),
        name: action.payload.name,
        price: action.payload.price,
      });
    },
    //here we assume we recive the id of the item in delete via action.payload
    removeArt(state, action) {
      state.data = state.data.at.filter((item) => item.id != action.payload);
    },
  },
});

export const { changeSearchTerm, addArt, removeArt } = artSlice.actions;
export const artReducer = artSlice.reducer;
