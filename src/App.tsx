import Navbar from "./components/Navbar";
import Player from "./components/Player";
import PlayList from "./components/PlayList";
import "./assets/Fontawesome_v6/css/all.css";

const App: React.FC = () => {
  return (
    <div className="flex">
      <Navbar></Navbar>
      <PlayList></PlayList>
      <Player></Player>
    </div>
  );
};

export default App;
