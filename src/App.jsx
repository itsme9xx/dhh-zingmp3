import "./assets/Fontawesome_v6/css/all.css";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import PlayList from "./components/PlayList";
import RouterPage from "./routes";

const App = () => {
  return (
    <div className="flex">
      <RouterPage></RouterPage>
    </div>
  );
};

export default App;
