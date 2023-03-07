import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    video: "",
  },
  reducers: {
    videoChange: (state, action) => {
      state.video = action.payload;
    },
  },
});
