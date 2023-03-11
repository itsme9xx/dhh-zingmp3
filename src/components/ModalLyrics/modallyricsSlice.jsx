import { createSlice } from "@reduxjs/toolkit";

export const moldallyricsSlice = createSlice({
  name: "modal",
  initialState: {
    lyrics: "",
  },
  reducers: {
    LyricsChange: (state, action) => {
      // => {type : 'navbar/themeChange'}
      state.lyrics = action.payload;
    },
  },
});
