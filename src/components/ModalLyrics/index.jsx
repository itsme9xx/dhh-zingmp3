import axios from "axios";
import React from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerSlice } from "../Player/playerSlice";
import { moldallyricsSlice } from "./modallyricsSlice";
import { Lrc } from "react-lrc";

const ModalLyrics = () => {
  const dispatch = useDispatch();
  const activeSong = useSelector((state) => state.listsong.activesong);
  const lyrics = useSelector((state) => state.modal.lyrics);

  // Lấy API lời bài hát
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://serverzingmp3.vercel.app/api/lyric?id=${activeSong.encodeId}`
  //     )
  //     .then((res) => {
  //       dispatch(moldallyricsSlice.actions.LyricsChange(res.data.data.file));
  //     });
  // }, [activeSong]);

  return (
    <div className="bg-third-color fixed top-10 left-[73px] xl:right-[398px] bottom-[174px] right-0  text-light-title-color  xl:bottom-0  ">
      <div className="m-8 p-4 border-2 border-third-color flex gap-10 xl:translate-y-60 overflow-hidden 2xl:translate-x-[330px] border-none">
        <div className="w-[240px]">
          <div>
            <img src={activeSong?.thumbnailM} alt="" />
          </div>
          <div className="mt-4">
            <p className="font-bold">{activeSong.title}</p>
            <p className="text-[13px]">{activeSong.artistsNames}</p>
          </div>
        </div>
        {/* <div>
          <Lrc
            lrc={lyrics}
            lineRenderer={({ active, index, line: { content } }) => {
              let color = "black";
              if (index === currentLineIndex) {
                color = "green";
              } else if (index === currentLineIndex - 1) {
                color = "yellow";
              } else if (index === currentLineIndex + 1) {
                color = "blue";
              }

              return <Line style={{ color }}>{content}</Line>;
            }}
            currentMillisecond={10}
          />
        </div> */}
        <div>Lyrics Here Coming soon</div>
      </div>
      <div
        className="absolute right-10 top-4 cursor-pointer w-10 h-10 rounded-full bg-lighter-text-color flex justify-center items-center"
        onClick={() => {
          dispatch(playerSlice.actions.modalChange(false));
        }}
      >
        <i className="fa-regular fa-xmark"></i>
      </div>
    </div>
  );
};

export default ModalLyrics;
