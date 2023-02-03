import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import PlayList from "../components/PlayList";
import Login from "../pages/Login";
import AuthProvider from "../context/AuthProvider";

const RouterPage = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            <>
              <Navbar></Navbar>
              <PlayList></PlayList>
              <Player></Player>
            </>
          }
          xxxxxxxxxxxxxxxxxx
        ></Route>
      </Routes>
    </AuthProvider>
  );
};
export default RouterPage;
