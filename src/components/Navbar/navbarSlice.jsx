import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    theme: "",

    isPlay: true,
  },
  reducers: {
    themeChange: (state, action) => {
      // => {type : 'navbar/themeChange'}
      state.theme = action.payload;
    },

    iconPlayChange: (state, action) => {
      state.isPlay = action.payload;
    },
  },
});
