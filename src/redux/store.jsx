import { configureStore } from "@reduxjs/toolkit";
import { navbarSlice } from "../components/Navbar/navbarSlice";

const store = configureStore({
  reducer: {
    navbar: navbarSlice.reducer,
  },
});

export default store;
