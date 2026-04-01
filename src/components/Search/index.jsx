import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ListSongLoading } from "../ListLoading";
import { listsongSlice } from "../ListSong/listsongSlice";
import { Search } from "../PlayList";
import { searchSlice } from "./searchSlice";
import { message } from "antd";
import { formatTime } from "../../utils/FormatTime";
import { info } from "autoprefixer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faPlay } from "@fortawesome/free-solid-svg-icons";

const serverAPI = import.meta.env.VITE_SERVERAPI;

const SearchPage = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const [searchSong, setSearchSong] = useState();
  const [youtubeSongs, setYoutubeSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("baihat");

  const navigate = useNavigate();
  const activeSong = useSelector((state) => state.listsong.activesong);

  const info = () => {
    message.warning("Bài hát này chỉ dành cho tài khoản VIP!", 2);
  };
  const infoVideo = () => {
    message.success("Video đang load ! Vui lòng chờ chút <3", 2);
  };

  const handleVideo = (x) => {
    infoVideo();
    axios.get(`${serverAPI}/api/video?id=${x.encodeId}`).then((res) => {
      navigate(`/video/${x.encodeId}`);
      dispatch(
        searchSlice.actions.videoChange(res?.data?.data?.streaming?.mp4)
      );
    });
  };

  const handleClickSong = (x, index) => {
    if (x.streamingStatus == 2) {
      info();
      return;
    }
    dispatch(listsongSlice.actions.currentSongIndexChange(index));
    dispatch(listsongSlice.actions.activeSongChange(x));
    // Click song hiển thị ra thông tin bài hát bên Player
    dispatch(listsongSlice.actions.songChange(x));
    dispatch(listsongSlice.actions.checkLoading(true));
    axios.get(`${serverAPI}/api/song?id=${x?.encodeId}`).then((res) => {
      res.data.msg !== "Success"
        ? (message.warning("Server bị chặn"),
          dispatch(listsongSlice.actions.checkLoading("")))
        : (dispatch(listsongSlice.actions.checkLoading(false)),
          dispatch(listsongSlice.actions.srcChange(res?.data?.data?.[128])));
    });
  };
  useEffect(() => {
    if (!param?.keyword) return;
    if (type === "baihat") {
      setIsLoading(true);
      axios
        .get(`${serverAPI}/api/search?keyword=${param.keyword}`)
        .then((res) => {
          setSearchSong(res.data.data);
          setIsLoading(false);
        });
    }
  }, [param, type]);
  const handleClickBaiHat = () => {
    setType("baihat");
  };
  const handleClickYoutube = async () => {
    setType("youtube");
  };

  useEffect(() => {
    if (type !== "youtube") return;
    if (!param?.keyword) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${serverAPI}/api/youtube?keyword=${param.keyword}`
        );
        setYoutubeSongs(res.data.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [param, type]);

  const list = type === "baihat" ? searchSong?.songs : youtubeSongs;
  return (
    <div className="py-8 ml-2  ssm:ml-[var(--marginLeftCustom)] xl:mr-[var(--marginRightCustom)] mb-[200px] xl:mb-0 ">
      <Search />
      <div className="mt-12">
        {isLoading ? (
          <div>
            <Skeleton width={200} height={40} />
            <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-10">
              <div className="flex items-center gap-4  border-b border-b-border-color pb-4">
                {/* <i className="fa-sharp fa-solid fa-music text-lighter-text-color "></i> */}
                <FontAwesomeIcon
                  className="text-lighter-text-color"
                  icon={faMusic}
                />
                <Skeleton height={60} width={60} />
                <Skeleton
                  width={200}
                  height={40}
                  style={{ display: "flex", alignItems: "flex-start" }}
                />
              </div>
              <div className="flex items-center gap-4 border-b border-b-border-color pb-4">
                {/* <i className="fa-sharp fa-solid fa-music text-lighter-text-color "></i> */}
                <FontAwesomeIcon
                  className="text-lighter-text-color"
                  icon={faMusic}
                />
                <Skeleton height={60} width={60} />
                <Skeleton
                  width={200}
                  height={40}
                  style={{ display: "flex", alignItems: "flex-start" }}
                />
              </div>
              <div className="flex items-center gap-4 border-b border-b-border-color pb-4">
                {/* <i className="fa-sharp fa-solid fa-music text-lighter-text-color "></i> */}
                <FontAwesomeIcon
                  className="text-lighter-text-color"
                  icon={faMusic}
                />
                <Skeleton height={60} width={60} />
                <Skeleton
                  width={200}
                  height={40}
                  style={{ display: "flex", alignItems: "flex-start" }}
                />
              </div>
              <div className="flex items-center gap-4 border-b border-b-border-color pb-4">
                {/* <i className="fa-sharp fa-solid fa-music text-lighter-text-color "></i> */}
                <FontAwesomeIcon
                  className="text-lighter-text-color"
                  icon={faMusic}
                />
                <Skeleton height={60} width={60} />
                <Skeleton
                  width={200}
                  height={40}
                  style={{ display: "flex", alignItems: "flex-start" }}
                />
              </div>
              <div className="flex items-center gap-4 border-b border-b-border-color pb-4">
                {/* <i className="fa-sharp fa-solid fa-music text-lighter-text-color "></i> */}
                <FontAwesomeIcon
                  className="text-lighter-text-color"
                  icon={faMusic}
                />
                <Skeleton height={60} width={60} />
                <Skeleton
                  width={200}
                  height={40}
                  style={{ display: "flex", alignItems: "flex-start" }}
                />
              </div>
              <div className="flex items-center gap-4 border-b border-b-border-color pb-4">
                {/* <i className="fa-sharp fa-solid fa-music text-lighter-text-color "></i> */}
                <FontAwesomeIcon
                  className="text-lighter-text-color"
                  icon={faMusic}
                />
                <Skeleton height={60} width={60} />
                <Skeleton
                  width={200}
                  height={40}
                  style={{ display: "flex", alignItems: "flex-start" }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-evenly items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleClickBaiHat}
              >
                {/* <i className="fa-solid fa-music text-2xl text-[rgb(19,176,201)] mb-4"></i> */}
                <FontAwesomeIcon
                  className="text-2xl text-[rgb(19,176,201)] mb-4"
                  icon={faMusic}
                />
                <p
                  className={`text-2xl font-semibold mb-4 cursor-pointer ${
                    type === "baihat"
                      ? "text-[rgb(19,176,201)]"
                      : "text-gray-400"
                  }`}
                >
                  Bài hát
                </p>
              </div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleClickYoutube}
              >
                <i className="fa-brands fa-youtube text-2xl text-red-500 mb-4"></i>
                <p
                  className={`text-2xl font-semibold mb-4 ${
                    type === "youtube" ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  Youtube
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 cursor-pointer">
              {list?.map((x, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      activeSong?.encodeId === x?.encodeId && "activeSong"
                    } flex justify-between  border-b border-b-border-color items-center  text-lighter-text-color font-semibold hover:bg-third-color`}
                    onClick={() => {
                      handleClickSong(x, index);
                    }}
                  >
                    <div className="flex px-4 py-4 gap-4 items-center">
                      <div className="">
                        {/* <i className="fa-sharp fa-solid fa-music text-[14px]"></i> */}
                        <FontAwesomeIcon
                          className="text-[14px]"
                          icon={faMusic}
                        />
                      </div>
                      <div>
                        <img
                          src={x?.thumbnail}
                          className="w-[50px] rounded-md"
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="line-clamp-1 text-light-title-color">
                          {x?.title}
                        </p>
                        <p className="line-clamp-1 font-medium text-[14px]">
                          {x?.artistsNames}
                        </p>
                      </div>
                    </div>
                    <div className="px-4 ">
                      <p className="line-clamp-1 font-medium text-[14px]">
                        {typeof x?.duration === "number"
                          ? formatTime(x.duration)
                          : x?.duration}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="mt-12">
        {isLoading ? (
          <div>
            <Skeleton width={200} height={40} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-10 mt-4 overflow-hidden">
              <Skeleton width={230} height={230} />
              <Skeleton width={230} height={230} />
              <Skeleton width={230} height={230} />
              <Skeleton width={230} height={230} />
              <Skeleton width={230} height={230} />
            </div>
          </div>
        ) : (
          <>
            <p className="text-2xl font-semibold mb-6 text-light-title-color ">
              Playlists
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4  cursor-pointer">
              {searchSong?.playlists?.map((x, index) => (
                <div
                  key={index}
                  className="flex mb-10"
                  onClick={() => {
                    navigate(`/playlist/${x.encodeId}`);
                  }}
                >
                  <div className=" ">
                    <div className="overflow-hidden">
                      <img
                        src={x.thumbnailM}
                        className="hover:scale-125 duration-1000 transition-all overflow-hidden  "
                        alt=""
                      />
                    </div>
                    <p className="line-clamp-1 text-lg text-light-title-color font-semibold mt-2 mb-1 ">
                      {x.title}
                    </p>
                    <p className="line-clamp-2 text-lighter-text-color text-[14px]">
                      {x.sortDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-12">
        {isLoading ? (
          <div>
            <Skeleton width={200} height={40} />
            <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4  3xl:grid-cols-5 gap-10 mt-4 overflow-hidden">
              <Skeleton width={230} height={230} />
              <Skeleton width={230} height={230} />
              <Skeleton width={230} height={230} />
              <Skeleton width={230} height={230} />
              <Skeleton width={230} height={230} />
            </div>
          </div>
        ) : (
          <>
            <p className="text-2xl font-semibold mb-6 text-light-title-color">
              Top MV
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 cursor-pointer  ">
              {searchSong?.videos?.map((x, index) => (
                <div
                  key={index}
                  className="flex mb-10 overflow-hidden"
                  onClick={() => {
                    handleVideo(x);
                  }}
                >
                  <div className=" ">
                    <div className=" relative hover:scale-110 duration-1000 transition-all overflow-hidden hover:brightness-50  ">
                      <div className="absolute w-[40px] h-[40px] flex justify-center items-center border-2 border-white  rounded-full top-[42%] left-[42%] z-10 ">
                        {/* <i className="fa-duotone fa-play text-white"></i> */}
                        <FontAwesomeIcon className="text-white" icon={faPlay} />
                      </div>
                      <img src={x.thumbnailM} className="" alt="" />
                    </div>

                    <p className="line-clamp-1 text-lg text-light-title-color font-semibold mt-2 mb-1 ">
                      {x.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
