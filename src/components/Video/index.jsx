import React from "react";
import { Search } from "../PlayList";
import { Player } from "react-tuby";
import "react-tuby/css/main.css";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const Video = () => {
  const pickvideo = useSelector((state) => state?.search?.video);

  const srcList = useMemo(() => {
    if (!pickvideo) return undefined;
    return Object.entries(pickvideo)
      .filter(([_key, value]) => value !== "")
      .map(([key, value]) => {
        return {
          quality: key,
          url: value,
        };
      });
  }, [pickvideo]);
  return (
    <div className=" py-8 ml-2  ssm:ml-[var(--marginLeftCustom)] xl:mr-[var(--marginRightCustom)] mb-[200px] xl:mb-0  ">
      <Search />
      {srcList && (
        <div className="mt-10 pr-10 xl:pr-0  ">
          <Player
            src={srcList}
            dimensions={{ width: "100%", height: "80vh" }}
          />
        </div>
      )}
    </div>
  );
};

export default Video;
