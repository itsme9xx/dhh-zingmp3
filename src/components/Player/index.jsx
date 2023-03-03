import axios from "axios";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import ModalLyrics from "../ModalLyrics";

const Player = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [showSuffle, setShowSuffle] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [musicToday, getMusicToday] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowList, setIsShowList] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://serverzingmp3.vercel.app/api/detailplaylist?id=60ZC6OZE")
      .then((res) => {
        getMusicToday(res.data.data.song);
        setIsLoading(false);
      });
  }, []);
  console.log(musicToday);
  const handleShuffleButton = () => {
    setShowSuffle(!showSuffle);
  };
  const handleShowSongButton = () => {
    setShowPopUp(!showPopUp);
  };
  const handleRepeatButton = () => {
    setShowRepeat(!showRepeat);
  };
  const PopUp = () => {
    return (
      <div
        className="cursor-pointer absolute  -translate-x-[55px] -translate-y-16 w-28 hover:brightness-110 z-20 "
        onClick={() => {
          setShowLyrics(true);
        }}
      >
        <h2 className="bg-third-color py-2 px-4 rounded-lg  ">Lời bài hát</h2>
        <div className="clipPath absolute w-3 h-3 right-0 bg-third-color -translate-y-[4px]  border-r-red-100 border-b-red-300 "></div>
      </div>
    );
  };
  const ButtonIcon = styled.button`
    background-color: var(--primary-color);
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-item: center;
    &:hover {
      border-radius: 9999px;
      border-color: var(--third-color);
      background-color: var(--third-color);
    }
  `;
  return (
    <div className="fixed top-0 right-0 bottom-0 border-l-2  text-light-title-color flex flex-col justify-between border-border-color">
      <div className="m-8 p-4 border-2 border-third-color">
        {isLoading ? (
          <Skeleton height={290} />
        ) : (
          <img
            src={musicToday?.items[0]?.thumbnailM}
            className="w-full"
            alt=""
          />
        )}

        <div className="mt-4">
          <p className="font-bold">
            {musicToday?.items[0]?.title || (
              <Skeleton height={20} style={{ marginBottom: 10 }} />
            )}
          </p>
          <p className="text-[13px]">
            {musicToday?.items[0]?.artistsNames || <Skeleton height={20} />}
          </p>
        </div>
      </div>
      <div className="m-8">
        <div className=" mt-[50%] flex justify-between items-center mx-4 mb-8">
          <div className=" w-8 h-8 hover:bg-third-color hover:rounded-full flex justify-center items-center cursor-pointer relative group z-20">
            <i className="fa-duotone fa-volume-low "></i>
            {/* Low volumn */}
            {/* <i class="fa-solid fa-volume"></i> */}
            {/* <i class="fa-solid fa-volume-high"></i> */}
            {/* <i class="fa-solid fa-volume-xmark"></i> */} {/* Mute */}
            <input
              type="range"
              className="volumnButton absolute -translate-y-12 h-16 w-4 opacity-0 group-hover:opacity-100  "
            />
          </div>
          {isShowList && (
            <div className="absolute bottom-[280px] top-0 left-0 right-0 bg-secondary-color  overflow-y-scroll scrollbar-hide z-10    ">
              {musicToday.items.map((x, index) => (
                <div
                  className="flex p-4 border-b border-border-color items-center"
                  key={index}
                >
                  <div>
                    <img
                      src={x?.thumbnail}
                      width={60}
                      style={{ marginRight: 10 }}
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
            {showLyrics && (
              <ModalLyrics song={musicToday} setShowLyrics={setShowLyrics} />
            )}
            {/* <ModalLyrics /> */}
          </div>
        </div>
        {/* slider music  */}
        <div className="flex gap-5 justify-between">
          <p>00:00</p>
          <div>
            <input
              type="range"
              min="0"
              max="10"
              defaultValue="0"
              className="slider w-[200px] "
            />
          </div>
          <p>04:30</p>
        </div>
        {/* Control button */}
        <div className="flex gap-8 mt-6 ">
          <ButtonIcon
            onClick={() => {
              handleShuffleButton();
            }}
          >
            <i
              className="fa-solid fa-shuffle"
              style={{ color: showSuffle ? "#1976d2" : "" }}
            ></i>
          </ButtonIcon>
          <button className="bg-primary-color hover:rounded-full hover:border-bg-third-color hover:bg-third-color w-10 h-10 flex justify-center items-center">
            <i className="fa-solid fa-backward-step"></i>
          </button>
          <button className="bg-primary-color hover:rounded-full hover:border-bg-third-color hover:bg-third-color w-10 h-10 flex justify-center items-center">
            <i className="fa-duotone fa-play"></i>
          </button>
          <button className="bg-primary-color hover:rounded-full hover:border-bg-third-color hover:bg-third-color w-10 h-10 flex justify-center items-center">
            <i className="fa-solid fa-forward-step"></i>
          </button>
          <button
            className="bg-primary-color hover:rounded-full hover:border-bg-third-color hover:bg-third-color w-10 h-10 flex justify-center items-center"
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
        <div className="flex justify-center mt-12 select-none ">128kbps</div>
      </div>
    </div>
  );
};

export default Player;
