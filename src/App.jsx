import "./assets/Fontawesome_v6/css/all.css";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import PlayList from "./components/PlayList";
import RouterPage from "./routes";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const App = () => {
  return (
    <div className="">
      <SkeletonTheme baseColor="#374A57" highlightColor="#525252">
        <RouterPage></RouterPage>
      </SkeletonTheme>
    </div>
  );
};

export default App;
