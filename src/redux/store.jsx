import { configureStore } from "@reduxjs/toolkit";
import { navbarSlice } from "../components/Navbar/navbarSlice";
import { playlistSlice } from "../components/PlayList/playListSlice";

const store = configureStore({
  reducer: {
    navbar: navbarSlice.reducer,
    playlist: playlistSlice.reducer,
  },
});

export default store;
