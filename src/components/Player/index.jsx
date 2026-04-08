import axios from "axios";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import ModalLyrics from "../ModalLyrics";
import { useSelector } from "react-redux";
import { playerSlice } from "./playerSlice";
import { useDispatch } from "react-redux";
import { listsongSlice } from "../ListSong/listsongSlice";
import { useRef } from "react";
import { message } from "antd";
import { navbarSlice } from "../Navbar/navbarSlice";
import { formatTime } from "../../utils/FormatTime";
import { formatTimeToSecond } from "../../utils/FormatTimeToSecond";
import { ButtonIcon } from "../../App";
import ListDownload from "../ListDownload";
import { dbPromise } from "../../utils/db";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faVolumeXmark,
  faVolumeLow,
  faVolumeHigh,
  faBackwardStep,
  faForwardStep,
  faShuffle,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";

const serverAPI = import.meta.env.VITE_SERVERAPI;

const Player = () => {
  const dispatch = useDispatch();
  const [showPopUp, setShowPopUp] = useState(false);
  const [showSuffle, setShowSuffle] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [playSong, setPlaySong] = useState();
  const [volumeValue, setVolumeValue] = useState(0.4);
  const [offlineSongs, setOfflineSongs] = useState([]);
  const audioRef = useRef(null);
  const currentUrlRef = useRef(null);
  const showList = useSelector((state) => state.player.isShowList);
  const toggleListSong = useSelector((state) => state.listsong.listsongmenu);
  const rendersongdefault = useSelector((state) => state.playlist.list);
  const pickSong = useSelector((state) => state.listsong.song);
  const src1 = useSelector((state) => state.listsong.src);
  const checkLoading = useSelector((state) => state.listsong.checkloading);
  const isPlay = useSelector((state) => state.navbar.isPlay);
  const activeSong = useSelector((state) => state.listsong.activesong);
  const currentSongIndex = useSelector(
    (state) => state.listsong.currentsongindex
  );
  const isLoop = useSelector((state) => state.player.loop);
  const volume = useSelector((state) => state.player.volume);
  const currentTime = useSelector((state) => state.player.currenttimesong);
  const showLyrics2 = useSelector((state) => state.player.showLyrics);
  const showDownload = useSelector((state) => state.player.showDownload);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const calledRef = useRef(false);
  const detailListRef = useRef(false);
  const duration = pickSong?.duration ?? toggleListSong?.items?.[0]?.duration;
  const displayDuration =
    typeof duration === "number" ? formatTime(duration) : duration || "00:00";

  const checkDownloaded = async (encodeId) => {
    const db = await dbPromise;
    const song = await db.get("songs", encodeId);
    return !!song;
  };
  useEffect(() => {
    const loadOfflineSongs = async () => {
      const db = await dbPromise;
      const songs = await db.getAll("songs");
      setOfflineSongs(songs);
    };

    if (showDownload) {
      loadOfflineSongs();
      dispatch(listsongSlice.actions.currentSongIndexChange(0));
    }
  }, [showDownload]);
  useEffect(() => {
    const check = async () => {
      if (pickSong?.encodeId || pickSong?.videoId) {
        const result = await checkDownloaded(
          pickSong.encodeId || pickSong?.videoId
        );
        setIsDownloaded(result);
      }
    };

    check();
  }, [pickSong]);

  const handleVolume = (e) => {
    setVolumeValue(e.target.value);
    dispatch(playerSlice.actions.setVolume(e.target.value));
  };
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);
  const element = document.getElementsByClassName("activeSong");
  const scrollToActiveSong = () => {
    for (let i = 0; i < element.length; i++) {
      if (element.length == 1) {
        element[0].scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      } else
        element[i].scrollIntoView({
          block: "nearest",
          inline: "nearest",
        });
    }
  };

  useEffect(() => {
    scrollToActiveSong();
  }, [currentSongIndex, pickSong, showList]);

  useEffect(() => {
    checkLoading === false &&
      (audioRef.current?.load(),
      audioRef.current?.play(),
      dispatch(navbarSlice.actions.iconPlayChange(false)));
  }, [checkLoading]);

  useEffect(() => {
    if (!src1 || !audioRef.current) return;
    const audio = audioRef.current;

    audio
      .play()
      .then(() => {
        dispatch(navbarSlice.actions.iconPlayChange(false));
      })
      .catch((err) => console.log(err));
  }, [src1]);

  useEffect(() => {
    if (detailListRef.current) return;
    detailListRef.current = true;
    setIsLoading(true);
    axios
      .get(
        `${serverAPI}/api/detailplaylist?id=${
          rendersongdefault
            ? rendersongdefault
            : localStorage.getItem("defaultSong")
        }`
      )
      .then((res) => {
        dispatch(playerSlice.actions.showSongToday(res?.data?.data?.song));
        dispatch(listsongSlice.actions.listsongChange(res?.data?.data?.song));
        dispatch(
          listsongSlice.actions.activeSongChange(
            res?.data?.data?.song?.items?.[0]
          )
        );
        setIsLoading(false);
      });
  }, [rendersongdefault]);

  useEffect(() => {
    isPlay === false ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlay]);

  useEffect(() => {
    const id = toggleListSong?.items?.[0]?.encodeId;
    if (!id || calledRef.current) return;
    calledRef.current = true;
    axios.get(`${serverAPI}/api/song?id=${id}`).then((res) => {
      setPlaySong(res.data);
    });
  }, [toggleListSong]);

  const handleShowSongButton = () => {
    setShowPopUp(!showPopUp);
  };
  const handleShuffleButton = async () => {
    const list = showDownload ? offlineSongs : toggleListSong?.items;
    if (!list || list.length === 0) return;
    let tempIndex;
    do {
      tempIndex = Math.floor(Math.random() * list.length);
    } while (tempIndex === currentSongIndex);

    const song = list[tempIndex];
    const { blob, thumbnailBlob, ...safeSong } = song;

    dispatch(listsongSlice.actions.songChange(safeSong));
    dispatch(listsongSlice.actions.activeSongChange(safeSong));
    dispatch(listsongSlice.actions.currentSongIndexChange(tempIndex));

    // OFFLINE
    if (showDownload) {
      if (song.blob) {
        const url = URL.createObjectURL(song.blob);
        dispatch(listsongSlice.actions.srcChange(url));
      }
      return;
    }

    // ONLINE
    if (song.streamingStatus === 2) {
      info();
      return;
    }
    dispatch(listsongSlice.actions.checkLoading(true));
    try {
      if (song?.videoId) {
        const userAgent = navigator.userAgent;
        const isIphone = /iPhone|iPad|iPod/i.test(userAgent);
        if (isIphone) {
          message.loading("Đang load nhạc, vui lòng chờ...", 6);
          const apiUrl = `${serverAPI}/api/audio?videoId=${song?.videoId}`;
          dispatch(listsongSlice.actions.checkLoading(false));
          dispatch(listsongSlice.actions.srcChange(apiUrl));
        } else {
          const hideLoading = message.loading(
            "Đang load nhạc, vui lòng chờ...",
            0
          );
          const res = await axios.get(
            `${serverAPI}/api/audio?videoId=${song?.videoId}`
          );
          if (res.status !== 200) {
            message.warning("Server bị chặn");
            dispatch(listsongSlice.actions.checkLoading(""));
            return;
          }
          hideLoading();
          message.success("Đã load xong");
          dispatch(listsongSlice.actions.checkLoading(false));
          dispatch(listsongSlice.actions.srcChange(res?.data?.audioUrl));
        }
        return;
      }
      const res = await axios.get(`${serverAPI}/api/song?id=${song?.encodeId}`);
      if (res.data.msg !== "Success") {
        message.warning("Server bị chặn");
        dispatch(listsongSlice.actions.checkLoading(""));
        return;
      }
      dispatch(listsongSlice.actions.checkLoading(false));
      dispatch(listsongSlice.actions.srcChange(res?.data?.data?.[128]));
    } catch (error) {
      console.error(err);
      message.error("Lỗi server");
      dispatch(listsongSlice.actions.checkLoading(""));
    }
  };

  const handlePrevSong = async () => {
    const list = showDownload ? offlineSongs : toggleListSong?.items;
    if (!list || list.length === 0) return;

    let prevIndex =
      currentSongIndex === 0 ? list.length - 1 : currentSongIndex - 1;

    const song = list[prevIndex];
    const { blob, thumbnailBlob, ...safeSong } = song;

    dispatch(listsongSlice.actions.songChange(safeSong));
    dispatch(listsongSlice.actions.activeSongChange(safeSong));
    dispatch(listsongSlice.actions.currentSongIndexChange(prevIndex));

    // OFFLINE
    if (showDownload) {
      if (song.blob) {
        const url = URL.createObjectURL(song.blob);
        dispatch(listsongSlice.actions.srcChange(url));
      }
      return;
    }

    // ONLINE
    dispatch(listsongSlice.actions.checkLoading(true));

    try {
      if (song?.videoId) {
        const userAgent = navigator.userAgent;
        const isIphone = /iPhone|iPad|iPod/i.test(userAgent);
        if (isIphone) {
          message.loading("Đang load nhạc, vui lòng chờ...", 6);
          const apiUrl = `${serverAPI}/api/audio?videoId=${song?.videoId}`;
          dispatch(listsongSlice.actions.checkLoading(false));
          dispatch(listsongSlice.actions.srcChange(apiUrl));
        } else {
          const hideLoading = message.loading(
            "Đang load nhạc, vui lòng chờ...",
            0
          );
          const res = await axios.get(
            `${serverAPI}/api/audio?videoId=${song?.videoId}`
          );
          if (res.status !== 200) {
            message.warning("Server bị chặn");
            dispatch(listsongSlice.actions.checkLoading(""));
            return;
          }
          hideLoading();
          message.success("Đã load xong");
          dispatch(listsongSlice.actions.checkLoading(false));
          dispatch(listsongSlice.actions.srcChange(res?.data?.audioUrl));
        }
        return;
      }
      const res = await axios.get(`${serverAPI}/api/song?id=${song?.encodeId}`);
      if (res.data.msg !== "Success") {
        message.warning("Server bị chặn");
        dispatch(listsongSlice.actions.checkLoading(""));
        return;
      }
      dispatch(listsongSlice.actions.checkLoading(false));
      dispatch(listsongSlice.actions.srcChange(res?.data?.data?.[128]));
    } catch (error) {
      console.error(err);
      message.error("Lỗi server");
      dispatch(listsongSlice.actions.checkLoading(""));
    }
  };

  const handleNextSong = async () => {
    const list = showDownload ? offlineSongs : toggleListSong?.items;
    if (!list || list.length === 0) return;
    let nextIndex =
      currentSongIndex === list.length - 1 ? 0 : currentSongIndex + 1;
    const song = list[nextIndex];
    const { blob, thumbnailBlob, ...safeSong } = song;

    dispatch(listsongSlice.actions.songChange(safeSong));
    dispatch(listsongSlice.actions.activeSongChange(safeSong));
    dispatch(listsongSlice.actions.currentSongIndexChange(nextIndex));

    // OFFLINE
    if (showDownload) {
      if (song.blob) {
        const url = URL.createObjectURL(song.blob);
        dispatch(listsongSlice.actions.srcChange(url));
      }
      return;
    }

    // ONLINE
    dispatch(listsongSlice.actions.checkLoading(true));
    try {
      if (song?.videoId) {
        const userAgent = navigator.userAgent;
        const isIphone = /iPhone|iPad|iPod/i.test(userAgent);
        if (isIphone) {
          message.loading("Đang load nhạc, vui lòng chờ...", 6);
          const apiUrl = `${serverAPI}/api/audio?videoId=${song.videoId}`;
          dispatch(listsongSlice.actions.checkLoading(false));
          dispatch(listsongSlice.actions.srcChange(apiUrl));
        } else {
          const hideLoading = message.loading(
            "Đang load nhạc, vui lòng chờ...",
            0
          );
          const res = await axios.get(
            `${serverAPI}/api/audio?videoId=${song?.videoId}`
          );

          if (res.status !== 200) {
            message.warning("Server bị chặn");
            dispatch(listsongSlice.actions.checkLoading(""));
            return;
          }
          hideLoading();
          message.success("Đã load xong");
          dispatch(listsongSlice.actions.checkLoading(false));
          dispatch(listsongSlice.actions.srcChange(res?.data?.audioUrl));
        }
        return;
      }
      const res = await axios.get(`${serverAPI}/api/song?id=${song?.encodeId}`);
      if (res.data.msg !== "Success") {
        message.warning("Server bị chặn");
        dispatch(listsongSlice.actions.checkLoading(""));
        return;
      }
      dispatch(listsongSlice.actions.checkLoading(false));
      dispatch(listsongSlice.actions.srcChange(res?.data?.data?.[128]));
    } catch (error) {
      console.error(err);
      message.error("Lỗi server");
      dispatch(listsongSlice.actions.checkLoading(""));
    }
  };

  const handleRepeatButton = () => {
    setShowRepeat(!showRepeat);
    dispatch(playerSlice.actions.setLoop(!showRepeat));
  };

  const info = () => {
    message.warning("Bài hát này chỉ dành cho tài khoản VIP!", 2);
  };

  const handleDownload = async () => {
    const hideLoading = message.loading("Đang tải nhạc, vui lòng chờ...", 0);

    try {
      let response;

      if (pickSong?.videoId) {
        response = await fetch(
          `${serverAPI}/api/download?videoId=${pickSong.videoId}`
        );
      } else {
        response = await fetch(src1);
      }

      if (!response.ok) {
        throw new Error("Server lỗi");
      }

      const blob = await response.blob();

      let imageBlob = null;
      try {
        const imageRes = await fetch(pickSong.thumbnail);
        imageBlob = await imageRes.blob();
      } catch (imgErr) {
        console.error("Không tải được thumbnail:", imgErr);
      }

      // Lưu vào IndexedDB
      const db = await dbPromise;
      await db.put("songs", {
        encodeId: pickSong.encodeId || pickSong.videoId,
        title: pickSong?.title || "Không tiêu đề",
        thumbnailM: pickSong?.thumbnail,
        thumbnailBlob: imageBlob,
        artistsNames: pickSong?.artistsNames || null,
        channel: pickSong?.channel || null,
        blob: blob,
        album: pickSong?.album?.title || null,
        duration: pickSong?.duration,
      });

      setIsDownloaded(true);
      hideLoading();
      message.success("Đã tải xong và lưu vào thư viện!");
    } catch (err) {
      hideLoading();
      console.error("Download Error:", err);
      message.error(
        "Tải nhạc thất bại. Có thể do kết nối mạng hoặc server bị chặn."
      );
    }
  };
  const PopUp = () => {
    return (
      <div className="cursor-pointer absolute  -translate-x-[55px] -translate-y-16 w-28  z-20 mb-10 ">
        <h2
          className="bg-third-color py-2 px-4 rounded-lg hover:brightness-110"
          onClick={() => {
            setShowLyrics(true);
            dispatch(playerSlice.actions.toggleLyrics(true));
          }}
        >
          Lời bài hát
        </h2>
        <div className="clipPath absolute w-3 h-3 right-0 bg-third-color -translate-y-[4px]  border-r-red-100 border-b-red-300 "></div>
        <h2
          className={`bg-third-color py-2 px-4 rounded-lg mt-2  ${
            isDownloaded
              ? "opacity-50 cursor-not-allowed"
              : "hover:brightness-110"
          }`}
          onClick={() => {
            if (isDownloaded) return;
            handleDownload();
          }}
        >
          {isDownloaded ? "Đã tải" : "Tải xuống"}
        </h2>

        <div className="clipPath absolute w-3 h-3 right-0 bg-third-color -translate-y-[4px]" />
      </div>
    );
  };
  useEffect(() => {
    if (!("mediaSession" in navigator)) return;

    const audio = audioRef.current;
    if (!audio) return;

    const updateMetadata = () => {
      const song = pickSong || toggleListSong?.items?.[0];
      const imageUrl = song?.thumbnailBlob
        ? URL.createObjectURL(song?.thumbnailBlob)
        : song?.thumbnailM;
      if (!song) return;

      navigator.mediaSession.metadata = new MediaMetadata({
        title: song?.title || "Unknown",
        artist: song?.artistsNames || song?.channel || "Unknown",
        album: song?.album?.title || "Unknown",
        artwork: [
          {
            src: song?.thumbnailM || song?.thumbnail || imageUrl,
            sizes: "512x512",
            type: "image/jpeg",
          },
        ],
      });
    };

    updateMetadata();

    audio.addEventListener("loadedmetadata", updateMetadata);
    const updatePosition = () => {
      if (
        audio.paused ||
        !("setPositionState" in navigator.mediaSession) ||
        !audio.duration ||
        isNaN(audio.duration)
      )
        return;

      navigator.mediaSession.setPositionState({
        duration: audio.duration,
        playbackRate: audio.playbackRate,
        position: audio.currentTime,
      });
    };

    audio.addEventListener("timeupdate", updatePosition);

    navigator.mediaSession.setActionHandler("play", () => {
      audio.play();
      dispatch(navbarSlice.actions.iconPlayChange(false));
    });

    navigator.mediaSession.setActionHandler("pause", () => {
      audio.pause();
      dispatch(navbarSlice.actions.iconPlayChange(true));
    });

    navigator.mediaSession.setActionHandler("nexttrack", handleNextSong);
    navigator.mediaSession.setActionHandler("previoustrack", handlePrevSong);

    navigator.mediaSession.setActionHandler("seekto", (details) => {
      if (!details.seekTime) return;
      audio.currentTime = details.seekTime;
    });

    return () => {
      audio.removeEventListener("loadedmetadata", updateMetadata);
      audio.removeEventListener("timeupdate", updatePosition);
    };
  }, [pickSong, toggleListSong, currentSongIndex]);

  return (
    <div className=" fixed xl:top-0 xl:right-0 bottom-0 xl:border-l-2  text-light-title-color xl:flex flex-col justify-between border-border-color w-full xl:w-[400px] bg-secondary-color xl:bg-transparent  border-t z-50 h-auto xl:h-screen">
      <div className="m-8 mb-0 p-4 border-2 border-third-color hidden xl:block ">
        {isLoading ? (
          <Skeleton height={290} />
        ) : (
          <img
            src={
              pickSong?.thumbnailM ||
              pickSong?.thumbnail ||
              toggleListSong?.items?.[0]?.thumbnailM ||
              toggleListSong?.items?.[0]?.thumbnail
            }
            className="w-full"
            alt=""
          />
        )}

        <div className="mt-4">
          <p className="font-bold">
            {pickSong?.title || toggleListSong?.items?.[0]?.title || (
              <Skeleton height={20} style={{ marginBottom: 10 }} />
            )}
          </p>
          <p className="text-[13px]">
            {pickSong?.artistsNames ||
              pickSong?.channel ||
              toggleListSong?.items?.[0]?.artistsNames || (
                <Skeleton height={20} />
              )}
          </p>
        </div>
      </div>
      <div className="m-8 mt-4  ">
        <div className=" justify-between items-center  mb-8 -mx-8 cursor-pointer  text-xs flex ssm:hidden     ">
          <h2
            className="bg-third-color py-2 px-2 rounded-lg hover:brightness-110 flex-shrink-0"
            onClick={() => {
              setShowLyrics(true);
              dispatch(playerSlice.actions.toggleLyrics(true));
            }}
          >
            Lời bài hát
          </h2>
          <div className="flex-1 min-w-0 mx-4 text-center">
            <p className="font-bold ">
              {pickSong?.title || toggleListSong?.items?.[0]?.title || (
                <Skeleton height={20} style={{ marginBottom: 10 }} />
              )}
            </p>
            <p className="text-[13px]">
              {pickSong?.artistsNames ||
                pickSong?.channel ||
                toggleListSong?.items?.[0]?.artistsNames || (
                  <Skeleton height={20} />
                )}
            </p>
          </div>
          <h2
            className={`bg-third-color py-2 px-4 rounded-lg mt-2 flex-shrink-0 ${
              isDownloaded
                ? "opacity-50 cursor-not-allowed"
                : "hover:brightness-110"
            }`}
            onClick={() => {
              if (isDownloaded) return;
              handleDownload();
            }}
          >
            {isDownloaded ? "Đã tải" : "Tải xuống"}
          </h2>
        </div>
        <div className="  justify-between items-center mx-4 mb-8 ssm:flex hidden   ">
          <div className=" w-8 h-8 hover:bg-third-color hover:rounded-full flex justify-center items-center cursor-pointer relative group z-20 ">
            {/* Low volume */}
            {volume == 0 ? (
              // <i className="fa-solid fa-volume-xmark"></i>
              <FontAwesomeIcon icon={faVolumeXmark} />
            ) : volume <= 0.3 && volumeValue > 0 ? (
              // <i className="fa-duotone fa-volume-low "></i>
              <FontAwesomeIcon icon={faVolumeLow} />
            ) : volume <= 0.7 && volumeValue > 0.3 ? (
              <i className="fa-solid fa-volume"></i>
            ) : (
              // <i className="fa-solid fa-volume-high"></i>
              <FontAwesomeIcon icon={faVolumeHigh} />
            )}
            <input
              onChange={handleVolume}
              min="0"
              max="1"
              step="0.01"
              value={volume}
              type="range"
              className="volumeButton absolute -translate-y-12 h-[60px]  w-10  opacity-0 group-hover:opacity-100   "
            />
          </div>
          {showList && (
            <div className="absolute bottom-[310px] top-0 left-0 right-0 bg-secondary-color  overflow-y-scroll scrollbar-hide z-10 flex-shrink-0    ">
              {showDownload
                ? offlineSongs.map((x, index) => {
                    return (
                      <div
                        key={index}
                        className={`${
                          activeSong?.encodeId
                            ? activeSong?.encodeId === x?.encodeId &&
                              "activeSong"
                            : activeSong?.videoId == x?.videoId && "activeSong"
                        } flex p-4 border-b border-border-color items-center cursor-pointer hover:bg-third-color `}
                        onClick={() => {
                          const { blob, thumbnailBlob, ...safex } = x;
                          dispatch(
                            listsongSlice.actions.currentSongIndexChange(index)
                          );
                          dispatch(
                            listsongSlice.actions.activeSongChange(safex)
                          );
                          dispatch(listsongSlice.actions.songChange(safex));
                          dispatch(listsongSlice.actions.listsongChange(safex));
                          if (x.blob) {
                            dispatch(listsongSlice.actions.checkLoading(true));
                            dispatch(listsongSlice.actions.srcChange(""));
                            if (currentUrlRef.current) {
                              URL.revokeObjectURL(currentUrlRef.current);
                            }
                            const url = URL.createObjectURL(x.blob);
                            currentUrlRef.current = url;
                            setTimeout(() => {
                              dispatch(listsongSlice.actions.srcChange(url));
                              dispatch(
                                listsongSlice.actions.checkLoading(false)
                              );
                            }, 50);
                          }
                        }}
                      >
                        <div>
                          <img
                            src={x?.thumbnail ?? x?.thumbnailM}
                            style={{ marginRight: 10 }}
                            className="max-w-[60px]"
                            alt=""
                          />
                        </div>
                        <div>
                          <p className="font-bold line-clamp-1"> {x?.title}</p>
                          <p className="text-[13px] line-clamp-1 font-medium">
                            {x?.artistsNames}
                          </p>
                        </div>
                      </div>
                    );
                  })
                : toggleListSong?.items?.map((x, index) => {
                    return (
                      <div
                        className={`${
                          activeSong?.encodeId
                            ? activeSong?.encodeId === x?.encodeId &&
                              "activeSong"
                            : activeSong?.videoId == x?.videoId && "activeSong"
                        } flex p-4 border-b border-border-color items-center cursor-pointer hover:bg-third-color `}
                        key={index}
                        onClick={async () => {
                          dispatch(
                            listsongSlice.actions.currentSongIndexChange(index)
                          );
                          dispatch(listsongSlice.actions.songChange(x));
                          dispatch(listsongSlice.actions.activeSongChange(x));
                          if (x.streamingStatus == 2) {
                            info();
                            return;
                          }
                          dispatch(listsongSlice.actions.checkLoading(true));
                          try {
                            if (x?.videoId) {
                              const res = await axios.get(
                                `${serverAPI}/api/audio?videoId=${x?.videoId}`
                              );
                              if (res.status !== 200) {
                                message.warning("Server bị chặn");
                                dispatch(
                                  listsongSlice.actions.checkLoading("")
                                );
                                return;
                              }
                              dispatch(
                                listsongSlice.actions.checkLoading(false)
                              );
                              dispatch(
                                listsongSlice.actions.srcChange(
                                  res?.data?.audioUrl
                                )
                              );
                              return;
                            }
                            const res = await axios.get(
                              `${serverAPI}/api/song?id=${x?.encodeId}`
                            );
                            if (res.data.msg !== "Success") {
                              message.warning("Server bị chặn");
                              dispatch(listsongSlice.actions.checkLoading(""));
                              return;
                            }
                            dispatch(listsongSlice.actions.checkLoading(false));
                            dispatch(
                              listsongSlice.actions.srcChange(
                                res?.data?.data?.[128]
                              )
                            );
                          } catch (error) {
                            console.error(err);
                            message.error("Lỗi server");
                            dispatch(listsongSlice.actions.checkLoading(""));
                          }
                        }}
                      >
                        <div>
                          <img
                            src={x?.thumbnail}
                            style={{ marginRight: 10 }}
                            className="max-w-[60px]"
                            alt=""
                          />
                        </div>
                        <div>
                          <p className="font-bold line-clamp-1"> {x?.title}</p>
                          <p className="text-[13px] line-clamp-1 font-medium">
                            {x?.artistsNames}
                          </p>
                        </div>
                      </div>
                    );
                  })}
            </div>
          )}
          <button
            className="bg-third-color hover:border-none hover:brightness-110 rounded-3xl text-[13px] hidden xl:block"
            onClick={() => {
              dispatch(playerSlice.actions.toggleList());
            }}
          >
            Danh Sách Phát
          </button>
          <div className=" flex-1 min-w-0 mx-4 text-center xl:hidden">
            <p className="font-bold">
              {pickSong?.title || toggleListSong?.items?.[0]?.title || (
                <Skeleton height={20} style={{ marginBottom: 10 }} />
              )}
            </p>
            <p className="text-[13px]">
              {pickSong?.artistsNames ||
                pickSong?.channel ||
                toggleListSong?.items?.[0]?.artistsNames || (
                  <Skeleton height={20} />
                )}
            </p>
          </div>
          <div
            className="relative w-8 flex justify-center h-8 items-center hover:bg-third-color hover:rounded-full flex-shrink-0 "
            onClick={() => {
              handleShowSongButton();
            }}
          >
            <i
              className="fa-solid fa-ellipsis-vertical cursor-pointer "
              style={{ fontSize: 25 }}
            ></i>
            {showPopUp && <PopUp />}
            {/* <ModalLyrics /> */}
          </div>
        </div>
        {showLyrics2 && <ModalLyrics />}
        {showDownload && <ListDownload />}

        {/* slider music  */}
        <div className="flex gap-5 justify-between items-center">
          <p>{currentTime ? formatTime(currentTime) : "00:00"}</p>
          <div className=" flex-grow">
            <input
              type="range"
              min="0"
              max={
                typeof duration === "string"
                  ? formatTimeToSecond(duration)
                  : duration
              }
              className="slider "
              value={currentTime}
              onInput={(e) => {
                dispatch(playerSlice.actions.setCurrentTime(e.target.value));
                audioRef.current.currentTime = e.target.value;
              }}
            />
          </div>
          <p>{displayDuration}</p>
        </div>
        {/* Audio */}
        <audio
          ref={audioRef}
          id="audio"
          src={src1 ? src1 : playSong?.data?.[128]}
          onEnded={() => {
            showSuffle ? handleShuffleButton() : handleNextSong();
          }}
          loop={isLoop && "loop"}
          onTimeUpdate={(e) => {
            dispatch(playerSlice.actions.setCurrentTime(e.target.currentTime));
          }}
        ></audio>

        {/* Control button */}
        <div className="flex gap-8 mt-6">
          <ButtonIcon
            onClick={() => {
              setShowSuffle(!showSuffle);
            }}
          >
            {/* <i
              className="fa-solid fa-shuffle "
              style={{ color: showSuffle ? "#1976d2" : "" }}
            ></i> */}
            <FontAwesomeIcon
              style={{ color: showSuffle ? "#1976d2" : "" }}
              icon={faShuffle}
            />
          </ButtonIcon>
          <button
            className="xl:bg-primary-color hover:rounded-full hover:border-bg-third-color hover:bg-third-color w-10 h-10 flex justify-center items-center bg-transparent  flex-grow  "
            onClick={() => {
              handlePrevSong();
            }}
          >
            {/* <i className="fa-solid fa-backward-step"></i> */}
            <FontAwesomeIcon icon={faBackwardStep} />
          </button>
          <button
            className="xl:bg-primary-color hover:rounded-full hover:border-bg-third-color hover:bg-third-color w-10 h-10 flex justify-center items-center  bg-transparent  flex-grow "
            onClick={() => {
              isPlay
                ? dispatch(navbarSlice.actions.iconPlayChange(false))
                : dispatch(navbarSlice.actions.iconPlayChange(true));
              isPlay ? audioRef.current.play() : audioRef.current.pause();
              // playSong.msg !== "Success" &&
              // !isDownloaded &&
              // (
              // message.warning(playSong.msg);
              // dispatch(navbarSlice.actions.iconPlayChange(true)));
            }}
          >
            {!checkLoading && toggleListSong ? (
              !isPlay ? (
                // <i className="fa-duotone fa-pause"></i>
                <FontAwesomeIcon icon={faPause} />
              ) : (
                // <i className="fa-duotone fa-play"></i>
                <FontAwesomeIcon icon={faPlay} />
              )
            ) : (
              <div className="lds-roller -top-[6px] -left-[12px] after:[&>div]:bg-light-title-color ">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
          </button>
          <button
            className="xl:bg-primary-color hover:rounded-full hover:border-bg-third-color hover:bg-third-color w-10 h-10 flex justify-center items-center  bg-transparent  flex-grow "
            onClick={() => {
              handleNextSong();
            }}
          >
            {/* <i className="fa-solid fa-forward-step"></i> */}
            <FontAwesomeIcon icon={faForwardStep} />
          </button>
          <button
            className="bg-primary-color hover:rounded-full hover:border-bg-third-color hover:bg-third-color w-10 h-10 flex justify-center items-center  flex-grow   "
            onClick={() => {
              handleRepeatButton();
            }}
          >
            {/* <i
              className="fa-solid fa-repeat"
              style={{ color: showRepeat ? "#1976d2" : "" }}
            ></i> */}
            <FontAwesomeIcon
              style={{ color: showRepeat ? "#1976d2" : "" }}
              icon={faRepeat}
            />
          </button>
        </div>
        <div className="xl:flex justify-center mt-12 select-none hidden  ">
          128kbps
        </div>
      </div>
    </div>
  );
};

export default Player;
