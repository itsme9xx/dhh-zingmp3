import axios from "axios";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import ModalLyrics from "../ModalLyrics";
import { useSelector } from "react-redux";
import { playerSlice } from "./playerSlice";
import { useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { listsongSlice } from "../ListSong/listsongSlice";
import { useRef } from "react";
import { message } from "antd";
import { navbarSlice } from "../Navbar/navbarSlice";
import { formatTime } from "../../utils/FormatTime";
import { ButtonIcon } from "../../App";

const Player = () => {
  const dispatch = useDispatch();
  const [showPopUp, setShowPopUp] = useState(false);
  const [showSuffle, setShowSuffle] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowList, setIsShowList] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [playSong, setPlaySong] = useState();
  const [volumeValue, setVolumeValue] = useState(40);
  const audioRef = useRef(null);
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
  const LyricsButton = useSelector((state) => state.player.button);

  const handleVolume = (e) => {
    setVolumeValue(e.target.value);
    dispatch(playerSlice.actions.setVolume(e.target.value));
  };
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  // console.log({ isPlay1 });
  // console.log({ pickSong });
  // console.log({ src1 });
  // console.log({ checkLoading });
  const element = document.getElementsByClassName("activeSong");
  const scrollToActiveSong = () => {
    // console.log({ element });
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
  }, [currentSongIndex, pickSong, isShowList]);

  useEffect(() => {
    checkLoading === false &&
      (audioRef.current?.load(),
      audioRef.current?.play(),
      dispatch(navbarSlice.actions.iconPlayChange(false)));
  }, [checkLoading]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://serverzingmp3.vercel.app/api/detailplaylist?id=${
          rendersongdefault
            ? rendersongdefault
            : localStorage.getItem("defaultSong")
        }`
      )
      .then((res) => {
        // console.log("abc", res);
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
    axios
      .get(
        `https://serverzingmp3.vercel.app/api/song?id=${toggleListSong?.items?.[0]?.encodeId}`
      )
      .then((res) => {
        // console.log("abcd", res);
        // audioRef.current.src(setSrc(src1 ? src1 : res?.data?.data?.[128]));

        setPlaySong(res.data);
        // dispatch(playerSlice.actions.songPlay(res.data));
      });
  }, [toggleListSong]);

  const handleShowSongButton = () => {
    setShowPopUp(!showPopUp);
  };
  const handleShuffleButton = () => {
    let tempIndex;
    do {
      tempIndex = Math.floor(Math.random() * toggleListSong?.items.length);
    } while (tempIndex === currentSongIndex);
    if (toggleListSong?.items?.[tempIndex].streamingStatus === 2) {
      info();
      tempIndex = tempIndex + 1;
    }
    dispatch(
      listsongSlice.actions.songChange(toggleListSong?.items?.[tempIndex])
    );
    dispatch(
      listsongSlice.actions.activeSongChange(toggleListSong?.items?.[tempIndex])
    );
    dispatch(listsongSlice.actions.currentSongIndexChange(tempIndex));
    dispatch(listsongSlice.actions.checkLoading(true));
    axios
      .get(
        `https://serverzingmp3.vercel.app/api/song?id=${toggleListSong?.items?.[tempIndex]?.encodeId}`
      )
      .then((res) => {
        // console.log(tempIndex);
        if (res.data.msg !== "Success") {
          handleNextSong(tempIndex);
          message.warning(res.data.msg),
            dispatch(listsongSlice.actions.checkLoading(""));
        } else {
          dispatch(listsongSlice.actions.checkLoading(false)),
            dispatch(listsongSlice.actions.srcChange(res?.data?.data?.[128]));
        }
      });
  };
  const handlePrevSong = (index) => {
    let tempIndex;
    if (currentSongIndex == 0) tempIndex = toggleListSong.items.length - 1;
    else tempIndex = (index || currentSongIndex) - 1;

    if (toggleListSong?.items?.[tempIndex].streamingStatus === 2) {
      info();
      tempIndex = tempIndex - 1;
    }
    dispatch(
      listsongSlice.actions.songChange(toggleListSong?.items?.[tempIndex])
    );
    dispatch(
      listsongSlice.actions.activeSongChange(toggleListSong?.items?.[tempIndex])
    );
    dispatch(listsongSlice.actions.currentSongIndexChange(tempIndex));

    dispatch(listsongSlice.actions.checkLoading(true));
    axios
      .get(
        `https://serverzingmp3.vercel.app/api/song?id=${toggleListSong?.items?.[tempIndex]?.encodeId}`
      )
      .then((res) => {
        if (res.data.msg !== "Success") {
          handlePrevSong(tempIndex);
          message.warning(res.data.msg),
            dispatch(listsongSlice.actions.checkLoading(""));
        } else {
          dispatch(listsongSlice.actions.checkLoading(false)),
            dispatch(listsongSlice.actions.srcChange(res?.data?.data?.[128]));
        }
      });
  };

  const handleNextSong = (index) => {
    let tempIndex = 0;
    if (currentSongIndex === toggleListSong.items.length - 1) tempIndex = 0;
    else tempIndex = (index || currentSongIndex) + 1;

    if (toggleListSong?.items?.[tempIndex].streamingStatus === 2) {
      info();
      tempIndex = tempIndex + 1;
    }
    dispatch(
      listsongSlice.actions.songChange(toggleListSong?.items?.[tempIndex])
    );
    dispatch(
      listsongSlice.actions.activeSongChange(toggleListSong?.items?.[tempIndex])
    );
    dispatch(listsongSlice.actions.currentSongIndexChange(tempIndex));

    dispatch(listsongSlice.actions.checkLoading(true));
    axios
      .get(
        `https://serverzingmp3.vercel.app/api/song?id=${toggleListSong?.items?.[tempIndex]?.encodeId}`
      )
      .then((res) => {
        // console.log(res);
        if (res.data.msg !== "Success") {
          handleNextSong(tempIndex);
          message.warning(res.data.msg),
            dispatch(listsongSlice.actions.checkLoading(""));
        } else {
          dispatch(listsongSlice.actions.checkLoading(false)),
            dispatch(listsongSlice.actions.srcChange(res?.data?.data?.[128]));
        }
      });
  };

  const handleRepeatButton = () => {
    setShowRepeat(!showRepeat);
    dispatch(playerSlice.actions.setLoop(!showRepeat));
  };

  const info = () => {
    message.warning("Bài hát này chỉ dành cho tài khoản VIP!", 2);
  };
  // console.log({ playSong });
  // console.log({ toggleListSong });
  const PopUp = () => {
    return (
      <div
        className="cursor-pointer absolute  -translate-x-[55px] -translate-y-16 w-28 hover:brightness-110 z-20 "
        onClick={() => {
          setShowLyrics(true);
          dispatch(playerSlice.actions.modalChange(true));
        }}
      >
        <h2 className="bg-third-color py-2 px-4 rounded-lg  ">Lời bài hát</h2>
        <div className="clipPath absolute w-3 h-3 right-0 bg-third-color -translate-y-[4px]  border-r-red-100 border-b-red-300 "></div>
      </div>
    );
  };

  return (
    <div className=" fixed xl:top-0 xl:right-0 bottom-0 xl:border-l-2  text-light-title-color xl:flex flex-col justify-between border-border-color w-full xl:w-[400px] bg-secondary-color xl:bg-transparent  border-t z-50 ">
      <div className="m-8 p-4 border-2 border-third-color hidden xl:block ">
        {isLoading ? (
          <Skeleton height={290} />
        ) : (
          <img
            src={pickSong?.thumbnailM || toggleListSong?.items?.[0]?.thumbnailM}
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
              toggleListSong?.items?.[0]?.artistsNames || (
                <Skeleton height={20} />
              )}
          </p>
        </div>
      </div>
      <div className="m-8">
        <div className=" mt-[50%] xl:flex justify-between items-center mx-4 mb-8 hidden ">
          <div className=" w-8 h-8 hover:bg-third-color hover:rounded-full flex justify-center items-center cursor-pointer relative group z-20">
            {/* Low volume */}
            {volume == 0 ? (
              <i className="fa-solid fa-volume-xmark"></i>
            ) : volume <= 30 && volumeValue > 0 ? (
              <i className="fa-duotone fa-volume-low "></i>
            ) : volume <= 70 && volumeValue > 30 ? (
              <i className="fa-solid fa-volume"></i>
            ) : (
              <i className="fa-solid fa-volume-high"></i>
            )}

            {/* Medium volume */}
            {/* <i className="fa-solid fa-volume"></i> */}
            {/* High volume */}
            {/* <i className="fa-solid fa-volume-high"></i> */}
            {/* Muted volume */}
            {/* <i className="fa-solid fa-volume-xmark"></i> */}
            <input
              onChange={handleVolume}
              min="0"
              max="1"
              step="0.01"
              value={volume}
              type="range"
              className="volumeButton absolute -translate-y-12 h-[70px]  w-10  opacity-0 group-hover:opacity-100  "
            />
          </div>
          {isShowList && (
            <div className="absolute bottom-[310px] top-0 left-0 right-0 bg-secondary-color  overflow-y-scroll scrollbar-hide z-10    ">
              {toggleListSong?.items?.map((x, index) => (
                <div
                  className={`${
                    activeSong?.encodeId === x?.encodeId && "activeSong"
                  } flex p-4 border-b border-border-color items-center cursor-pointer hover:bg-third-color `}
                  key={index}
                  onClick={() => {
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
                    axios
                      .get(
                        `https://serverzingmp3.vercel.app/api/song?id=${x?.encodeId}`
                      )
                      .then((res) => {
                        // dispatch(listsongSlice.actions);
                        console.log({ res });
                        res.data.msg !== "Success"
                          ? (message.warning(res.data.msg),
                            dispatch(listsongSlice.actions.checkLoading("")))
                          : (dispatch(
                              listsongSlice.actions.checkLoading(false)
                            ),
                            dispatch(
                              listsongSlice.actions.srcChange(
                                res?.data?.data?.[128]
                              )
                            ));
                      });
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
                      {x?.artistsNames}/
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button
            className="bg-third-color hover:border-none hover:brightness-110 rounded-3xl text-[13px]"
            onClick={() => {
              setIsShowList(!isShowList);
            }}
          >
            Danh Sách Phát
          </button>
          <div
            className="relative w-8 flex justify-center h-8 items-center hover:bg-third-color hover:rounded-full"
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
            {LyricsButton && <ModalLyrics />}
          </div>
        </div>
        {/* slider music  */}
        <div className="flex gap-5 justify-between items-center">
          <p>{currentTime ? formatTime(currentTime) : "00:00"}</p>
          <div className=" flex-grow">
            <input
              type="range"
              min="0"
              max={pickSong?.duration || toggleListSong?.items?.[0]?.duration}
              className="slider "
              value={currentTime}
              onInput={(e) => {
                dispatch(playerSlice.actions.setCurrentTime(e.target.value));
                audioRef.current.currentTime = e.target.value;
              }}
            />
          </div>
          <p>
            {pickSong?.duration || toggleListSong?.items?.[0]?.duration
              ? formatTime(
                  pickSong?.duration || toggleListSong?.items?.[0]?.duration
                )
              : "00:00"}
          </p>
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
            <i
              className="fa-solid fa-shuffle "
              style={{ color: showSuffle ? "#1976d2" : "" }}
            ></i>
          </ButtonIcon>
          <button
            className="xl:bg-primary-color hover:rounded-full hover:border-bg-third-color hover:bg-third-color w-10 h-10 flex justify-center items-center bg-transparent  flex-grow  "
            onClick={() => {
              handlePrevSong();
            }}
          >
            <i className="fa-solid fa-backward-step"></i>
          </button>
          <button
            className="xl:bg-primary-color hover:rounded-full hover:border-bg-third-color hover:bg-third-color w-10 h-10 flex justify-center items-center  bg-transparent  flex-grow "
            onClick={() => {
              isPlay
                ? dispatch(navbarSlice.actions.iconPlayChange(false))
                : dispatch(navbarSlice.actions.iconPlayChange(true));
              isPlay ? audioRef.current.play() : audioRef.current.pause();
              playSong.msg !== "Success" &&
                (message.warning(playSong.msg),
                dispatch(navbarSlice.actions.iconPlayChange(true)));

              // (audioRef.current.src(setSrc(playSong.data?.[128] || src1)),
              //   audioRef.current.load());
              // message.success("Player");
            }}
          >
            {!checkLoading && toggleListSong ? (
              !isPlay ? (
                <i className="fa-duotone fa-pause"></i>
              ) : (
                <i className="fa-duotone fa-play"></i>
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
            <i className="fa-solid fa-forward-step"></i>
          </button>
          <button
            className="bg-primary-color hover:rounded-full hover:border-bg-third-color hover:bg-third-color w-10 h-10 flex justify-center items-center  flex-grow   "
            onClick={() => {
              handleRepeatButton();
            }}
          >
            <i
              className="fa-solid fa-repeat"
              style={{ color: showRepeat ? "#1976d2" : "" }}
            ></i>
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
