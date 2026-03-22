import axios from "axios";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dbPromise } from "../../utils/db";
import { formatTime } from "../../utils/FormatTime";
import { listsongSlice } from "../ListSong/listsongSlice";
import { playerSlice } from "../Player/playerSlice";

const ListDownload = () => {
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();
  const activeSong = useSelector((state) => state.listsong.activesong);
  const currentUrlRef = useRef(null);

  useEffect(() => {
    const getSongs = async () => {
      const db = await dbPromise;
      const allSongs = await db.getAll("songs");
      setSongs(allSongs);
    };

    getSongs();
  }, []);

  const handleDelete = async (song, index) => {
    try {
      const db = await dbPromise;

      await db.delete("songs", song.encodeId);

      setSongs((prev) =>
        prev.filter((item) => item.encodeId !== song.encodeId)
      );

      if (activeSong?.encodeId === song.encodeId) {
        dispatch(listsongSlice.actions.songChange(null));
        dispatch(listsongSlice.actions.srcChange(""));
        dispatch(listsongSlice.actions.activeSongChange(null));
      }
    } catch (err) {
      console.error("Delete song error:", err);
    }
  };
  const handlePlay = (song, index) => {
    const { blob, ...safesong } = song;

    // dispatch(listsongSlice.actions.currentSongIndexChange(index));
    dispatch(listsongSlice.actions.activeSongChange(safesong));
    //Click song hiển thị ra thông tin bài hát bên Player
    dispatch(listsongSlice.actions.songChange(safesong)); //
    dispatch(listsongSlice.actions.listsongChange(safesong));
    if (blob) {
      dispatch(listsongSlice.actions.checkLoading(true));
      dispatch(listsongSlice.actions.srcChange(""));
      if (currentUrlRef.current) {
        URL.revokeObjectURL(currentUrlRef.current);
      }
      const url = URL.createObjectURL(blob);
      currentUrlRef.current = url;
      setTimeout(() => {
        dispatch(listsongSlice.actions.srcChange(url));
        dispatch(listsongSlice.actions.checkLoading(false));
      }, 50);
    }
  };

  return (
    <div className="bg-third-color fixed top-8 ssm:left-[73px]  xl:right-[398px] bottom-[174px] right-0  text-light-title-color  xl:bottom-0  ">
      <h2 className="text-xl flex justify-center mt-6 pb-6 text-[rgb(19,176,201)] border-b-2">
        Nhạc đã tải
      </h2>
      <div
        className="absolute right-10 top-4 cursor-pointer w-10 h-10 rounded-full bg-lighter-text-color flex justify-center items-center -mr-6 ssm:mr-0"
        onClick={() => {
          dispatch(playerSlice.actions.toggleDownload(false));
        }}
      >
        <i className="fa-regular fa-xmark"></i>
      </div>
      <div className="mx-4 flex justify-between py-5 border-b border-b-border-color px-2 text-lighter-text-color text-base font-semibold">
        <div>
          <i className="fa-sharp fa-solid fa-award"></i>
          <span className="ml-4">BÀI HÁT</span>
        </div>

        <div>
          <p>THỜI GIAN</p>
        </div>
        <div>
          <p>THAO TÁC</p>
        </div>
      </div>
      <div className="h-[calc(100vh-308px)] overflow-y-auto overflow-x-hidden">
        {songs.map((song, index) => {
          return (
            <div
              className={`${
                activeSong?.encodeId === song?.encodeId && "bg-blue-300"
              } mx-4 px-1 py-2  hover:bg-blue-100 flex items-center  gap-4 border-b-[0.1px] border-b-border-color text-lighter-text-color text-base font-semibold cursor-pointer `}
              key={index}
              id={index}
              onClick={() => {
                handlePlay(song, index);
              }}
            >
              <div className="flex gap-4 items-center  w-[48%] ">
                <i className="fa-sharp fa-solid fa-music text-[14px]"></i>
                <div className="  rounded-lg  relative">
                  <img
                    src={song?.thumbnailM}
                    className=" max-w-[60px]  "
                    alt=""
                  />
                </div>

                <div>
                  <p className="line-clamp-1 text-light-title-color">
                    {song?.title}
                  </p>
                  <p className="font-medium line-clamp-2 text-[14px]">
                    {song?.artistsNames}
                  </p>
                </div>
              </div>
              <div className=" w-[46%]">
                <span className="font-medium text-[15px]">
                  {formatTime(song.duration)}
                </span>
              </div>
              <div
                className=" ml-4 "
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(song, index);
                }}
              >
                <i className="fa-solid fa-trash"></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListDownload;
