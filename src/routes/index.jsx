import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import PlayList from "../components/PlayList";
import Login from "../pages/Login";
import AuthProvider from "../context/AuthProvider";
import ListSong from "../components/ListSong";
import SearchPage from "../components/Search";
import Video from "../components/Video";


const RouterPage = () => {
  return (
    <AuthProvider>
      <Navbar></Navbar>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            <>
              <PlayList></PlayList>
            </>
          }
        ></Route>
        <Route path="/playlist/:keyword" element={<ListSong />}></Route>
        <Route path="/search/:keyword" element={<SearchPage />} />
        <Route path="/video/:keyword" element={<Video />} />
      </Routes>
      
      <Player></Player>
    </AuthProvider>
  );
};
export default RouterPage;
