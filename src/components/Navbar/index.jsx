import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { navbarSlice } from "./navbarSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ModalLyrics from "../ModalLyrics";

const Navbar = () => {
  const location = useLocation();
  // console.log(location);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(JSON.parse(localStorage.theme || true));
  const [showModal, setShowModal] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const handle = () => {
    setShowModal(!showModal);
    setIsActive(!isActive);
  };

  const dispatch = useDispatch();
  const a = useSelector((state) => state.player.button);
  const b = useSelector((state) => state.player.songtoday);

  console.log("a", a);
  console.log("b", b);

  const handleMode = (x) => {
    setTheme(x);
    localStorage.setItem("theme", x);
    dispatch(navbarSlice.actions.themeChange(x));
  };

  const handleLogin = () => {
    navigate("/login");
  };

  document.body.classList = theme ? "dark" : "light";

  return (
    <div className=" flex flex-col p-4 bg-secondary-color  h-screen items-center border-r-[0.5px]  border-border-color gap-5 pt-12 fixed">
      <div
        className={`${
          theme ? "bg-light-title-color" : "bg-third-color"
        } rounded-full w-10 h-10 -color  flex justify-center items-center cursor-pointer  `}
        onClick={() => handleMode(true)}
        title="Dark Mode"
      >
        <i className="fa-sharp fa-solid fa-moon-stars text-primary-color  "></i>
      </div>
      <div
        className={`${
          theme ? "bg-third-color" : "bg-light-title-color"
        } rounded-full w-10 h-10  flex justify-center items-center cursor-pointer `}
        onClick={() => handleMode(false)}
        title="Light Mode"
      >
        <i className="fa-solid fa-brightness text-primary-color  "></i>
      </div>
      <div
        className={`rounded-full w-10 h-10  flex justify-center items-center cursor-pointer   ${
          location.pathname === "/" ? "bg-light-title-color " : "bg-third-color"
        }`}
        title="Home"
        onClick={() => {
          navigate("/");
        }}
      >
        <i className="fa-sharp fa-solid fa-house text-primary-color "></i>
      </div>
      <div
        className="rounded-full w-10 h-10 bg-light-title-color flex justify-center items-center cursor-pointer "
        title="Play"
      >
        {b ? (
          <i className="fa-sharp fa-solid fa-play text-primary-color "></i>
        ) : (
          <div className="lds-roller -top-[6px] -left-[6px]">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
      </div>
      <div
        className={`${
          a === true || isActive ? "bg-light-title-color" : "bg-third-color"
        } rounded-full w-10 h-10  flex justify-center items-center cursor-pointer  `}
        title="Player"
        onClick={() => {
          handle();
        }}
      >
        <i className="fa-sharp fa-solid fa-music text-primary-color"></i>
      </div>
      {showModal && <ModalLyrics song={b} />}
      <div
        className="rounded-full w-10 h-10 bg-light-title-color flex justify-center items-center cursor-pointer "
        onClick={handleLogin}
        title="Account"
      >
        <i className="fa-solid fa-user-music text-primary-color"></i>
      </div>
    </div>
  );
};

export default Navbar;
