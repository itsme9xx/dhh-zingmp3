import "./assets/Fontawesome_v6/css/all.css";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import PlayList from "./components/PlayList";
import RouterPage from "./routes";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styled from "styled-components";

export const ButtonIcon = styled.button`
  background-color: var(--primary-color);
  width: 40px;
  height: 40px;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-item: center;
  &:hover {
    border-radius: 9999px;
    border-color: var(--third-color);
    background-color: var(--third-color);
  }
`;
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
