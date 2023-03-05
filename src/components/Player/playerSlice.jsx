import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    button: "",
    songtoday: "",
  },
  reducers: {
    modalChange: (state, action) => {
      state.button = action.payload;
    },
    showSongToday: (state, action) => {
      state.songtoday = action.payload;
    },
  },
});
