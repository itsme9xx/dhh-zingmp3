import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    showLyrics: false,
    showDownload: false,
    isShowList: false,
    songtoday: "",
    songplay: "",
    volume: 0.4,
    loop: false,
    currenttimesong: 0,
    processtime: 0,
  },
  reducers: {
    toggleLyrics: (state) => {
      state.showLyrics = !state.showLyrics;
      state.showDownload = false;
    },
    toggleDownload: (state) => {
      state.showDownload = !state.showDownload;
      state.showLyrics = false;
    },
    toggleList: (state) => {
      state.isShowList = !state.isShowList;
    },
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
