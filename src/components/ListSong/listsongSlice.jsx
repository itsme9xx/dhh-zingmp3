import { createSlice } from "@reduxjs/toolkit";

export const listsongSlice = createSlice({
  name: "listsong",
  initialState: {
    song: "",
    listsongmenu: "",
  },
  reducers: {
    songChange: (state, action) => {
      state.song = action.payload;
    },
    listsongChange: (state, action) => {
      state.listsongmenu = action.payload;
    },
  },
});
