import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    button: "",
    songtoday: "",
    songplay: "",
  },
  reducers: {
    modalChange: (state, action) => {
      state.button = action.payload;
    },
    showSongToday: (state, action) => {
      state.songtoday = action.payload;
    },
    songPlay: (state, action) => {
      state.songplay = action.payload;
    },
  },
});
