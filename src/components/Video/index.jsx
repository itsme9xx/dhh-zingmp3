import React from "react";
import { Search } from "../PlayList";
import { Player } from "react-tuby";
import "react-tuby/css/main.css";
import { useSelector } from "react-redux";

const Video = () => {
  const pickvideo = useSelector((state) => state?.search?.video);
  console.log(pickvideo);
  console.log(pickvideo["720p"]);

  return (
    <div className="m-8 ml-[var(--marginLeftCustom)] xl:mr-[var(--marginRightCustom)] mb-[200px] xl:mb-0   ">
      <Search />
      <div className="mt-10  ">
        <Player
          src={pickvideo["720p"]}
          dimensions={{ width: "100%", height: "80vh" }}
        />
      </div>
    </div>
  );
};

export default Video;
