import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    theme: "",
  },
  reducers: {
    themeChange: (state, action) => {
      // => {type : 'navbar/themeChange'}
      state.theme = action.payload;
    },
  },
});
