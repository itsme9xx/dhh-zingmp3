import { configureStore } from "@reduxjs/toolkit";
import { navbarSlice } from "../components/Navbar/navbarSlice";
import { playlistSlice } from "../components/PlayList/playlistSlice";
import { playerSlice } from "../components/Player/playerSlice";

const store = configureStore({
  reducer: {
    navbar: navbarSlice.reducer,
    playlist: playlistSlice.reducer,
    player: playerSlice.reducer,
  },
});

export default store;
