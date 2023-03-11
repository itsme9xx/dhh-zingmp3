import axios from "axios";
import React from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerSlice } from "../Player/playerSlice";
import { moldallyricsSlice } from "./modallyricsSlice";

const ModalLyrics = () => {
  const dispatch = useDispatch();
  const activeSong = useSelector((state) => state.listsong.activesong);
  const lyrics = useSelector((state) => state.modal.lyrics);
  console.log(lyrics);

  useEffect(() => {
    axios
      .get(
        `https://serverzingmp3.vercel.app/api/lyric?id=${activeSong.encodeId}`
      )
      .then((res) => {
        // console.log(res.data.data.sentences);
        dispatch(
          moldallyricsSlice.actions.LyricsChange(res.data.data.sentences)
        );
      });
  }, [activeSong]);

  // console.log("modal", props);
  return (
    <div className="bg-third-color fixed top-10 left-[73px] xl:right-[396px] bottom-0 right-0 ">
      <div className="m-8 p-4 border-2 border-third-color flex gap-10 xl:translate-y-60 overflow-hidden 2xl:translate-x-[330px] border-none">
        <div className="w-[300px]">
          <div>
            <img src={activeSong?.thumbnailM} alt="" />
          </div>
          <div className="mt-4">
            <p className="font-bold">{activeSong.title}</p>
            <p className="text-[13px]">{activeSong.artistsNames}</p>
          </div>
        </div>
        {/* <div>{lyrics?.map((x) => x.words)}</div> */}
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
