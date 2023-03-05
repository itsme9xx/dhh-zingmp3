import { createSlice } from "@reduxjs/toolkit";

export const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    list: "",
  },
  reducers: {
    listChange: (state, action) => {
      state.list = action.payload;
    },
    homeChange: (state, action) => {
      state.list = action.payload;
    },
  },
});
