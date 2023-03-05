import { configureStore } from "@reduxjs/toolkit";
import { navbarSlice } from "../components/Navbar/navbarSlice";
import { playlistSlice } from "../components/PlayList/playlistSlice";

const store = configureStore({
  reducer: {
    navbar: navbarSlice.reducer,
    playlist: playlistSlice.reducer,
  },
});

export default store;
