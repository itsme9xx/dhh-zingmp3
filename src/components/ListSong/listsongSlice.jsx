import { createSlice } from "@reduxjs/toolkit";

export const listsongSlice = createSlice({
  name: "listsong",
  initialState: {
    song: "",
    listsongmenu: "",
    src: "",
    click: "",
    checkloading: "",
    songactive: "",
    activesong: "",
  },
  reducers: {
    songChange: (state, action) => {
      state.song = action.payload.song;
      state.click = action.payload.click;
    },
    listsongChange: (state, action) => {
      state.listsongmenu = action.payload;
    },
    checkLoading: (state, action) => {
      state.checkloading = action.payload;
    },
    srcChange: (state, action) => {
      state.src = action.payload;
    },
    activeSongChange: (state, action) => {
      state.activesong = action.payload;
    },
  },
});
