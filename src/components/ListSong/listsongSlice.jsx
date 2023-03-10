import { createSlice } from "@reduxjs/toolkit";

export const listsongSlice = createSlice({
  name: "listsong",
  initialState: {
    song: "",
    listsongmenu: "",
    src: "",
    checkloading: "",
    songactive: "",
    activesong: "",
    currentsongindex: 0,
  },
  reducers: {
    songChange: (state, action) => {
      state.song = action.payload;
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
    currentSongIndexChange: (state, action) => {
      state.currentsongindex = action.payload;
    },
  },
});
