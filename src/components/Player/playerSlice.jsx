import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    button: "",
    songtoday: "",
    songplay: "",
    volume: 0.4,
    loop: false,
    currenttimesong: 0,
    processtime: 0,
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

    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setLoop: (state, action) => {
      state.loop = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currenttimesong = action.payload;
    },
    setProcessTime: (state, action) => {
      state.processtime = action.payload;
    },
  },
});
