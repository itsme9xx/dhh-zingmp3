import { configureStore } from "@reduxjs/toolkit";
import { navbarSlice } from "../components/Navbar/navbarSlice";
import { playlistSlice } from "../components/PlayList/playlistSlice";
import { playerSlice } from "../components/Player/playerSlice";
import { listsongSlice } from "../components/ListSong/listsongSlice";
import { searchSlice } from "../components/Search/searchSlice";

const store = configureStore({
  reducer: {
    navbar: navbarSlice.reducer,
    playlist: playlistSlice.reducer,
    player: playerSlice.reducer,
    listsong: listsongSlice.reducer,
    search: searchSlice.reducer,
  },
});

export default store;
