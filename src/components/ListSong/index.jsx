import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Search } from "../PlayList";
import { list } from "postcss";
import { formatTime } from "../../utils/FormatTime";
import secondsToHms from "../../utils/FormatTimeToHour";
import Skeleton from "react-loading-skeleton";
import { ListSongLoading } from "../ListLoading";

const ListSong = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const param = useParams();
  // console.log(
  //   `https://serverzingmp3.vercel.app/api/detailplaylist?id=${JSON.stringify(
  //     param.keyword
  //   )}`
  // );
  const [listSong, setListSong] = useState();
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://serverzingmp3.vercel.app/api/detailplaylist?id=${JSON.stringify(
          param.keyword
        )}`
      )
      .then((res) => {
        setListSong(res.data.data);
        setIsLoading(false);
      });
  }, []);
  console.log({ listSong });
  // console.log(listSong.songs[2].encodeId);
  const handleToast = () => {
    alert("abc");
  };

  return (
    <div className="m-8 ml-[var(--marginLeftCustom)] xl:mr-[var(--marginRightCustom)] mb-[200px] xl:mb-0">
      <Search />
      <div className="mt-12 flex gap-10 lg:gap-[5.5rem] flex-grow flex-col lg:flex-row ">
        {/* Left */}
        <div className="cursor-pointer lg:w-[400px]  w-full flex justify-center items-center  lg:block gap-10 ">
          <div className="overflow-hidden">
            {isLoading ? (
              <Skeleton
                style={{ marginBottom: 10 }}
                className="h-[200px] w-[200px] md:h-[300px] md:w-[300px]"
              />
            ) : (
              <img
                src={listSong?.thumbnailM}
                className=" hover:scale-125 transition-all duration-1000 rounded-lg overflow-hidden   "
                alt=""
              />
            )}
          </div>
          {isLoading ? (
            <div className="mt-4 px-10 ">
              <Skeleton height={40} className="w-[100px] md:w-[220px]" />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center  ">
              <p className="line-clamp-2 mt-3 text-center text-2xl font-bold text-title-color">
                {listSong?.title}
              </p>
              <p className="pt-1 px-4 line-clamp-1 text-center text-light-title-color font-normal text-[14px]">
                {listSong?.artistsNames}
              </p>
              <p className="pt-1 px-4 line-clamp-1 text-center text-light-title-color font-normal text-[14px]">
                {Math.floor(listSong?.like / 1000)}K người thích
              </p>
              <p className="pt-1 px-4 line-clamp-1 text-center text-light-title-color font-normal text-[14px]">
                {Math.floor(listSong?.listen / 1000)}K số lượt nghe
              </p>
            </div>
          )}
        </div>
        {/* Right */}
        <div className="w-full flex-grow ">
          <div className="text-title-color text-base font-medium">
            <span className="pr-2 mr-2 font-medium border-r-[0.5px] border-r-border-color text-base text-lighter-text-color ">
              Lời tựa :
            </span>
            {listSong?.sortDescription}
          </div>
          <div className="flex justify-between py-5 border-b border-b-border-color px-2 text-lighter-text-color text-base font-semibold">
            <div>
              <i className="fa-sharp fa-solid fa-award"></i>
              <span className="ml-4">BÀI HÁT</span>
            </div>
            <div>
              <p>ALBUM</p>
            </div>
            <div>
              <p>THỜI GIAN</p>
            </div>
          </div>

          {isLoading && <ListSongLoading />}
          <div className="h-[calc(100vh-308px)] overflow-y-auto overflow-x-hidden">
            {listSong?.song?.items.map((x, index) => (
              <div
                className="  px-1 py-2  hover:bg-third-color flex items-center gap-4 border-b-[0.1px] border-b-border-color text-lighter-text-color text-base font-semibold cursor-pointer  "
                key={index}
                onClick={() => {
                  x.streamingStatus == 2 && handleToast();
                }}
              >
                <div className="flex gap-4 items-center  w-[42%] ">
                  <i className="fa-sharp fa-solid fa-music text-[14px]"></i>
                  <div className="w-[15%] rounded-lg relative">
                    <img src={x?.thumbnail} className="" alt="" />
                    {x?.streamingStatus == 2 && (
                      <span className="text-gray-600 absolute tracking-widest right-0 top-0 -translate-y-1/2 translate-x-2 bg-[#f4e570] text-[10px] leading-3 py-[2px] px-1 rounded-sm">
                        VIP
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="line-clamp-1 text-light-title-color">
                      {x?.title}
                    </p>
                    <p className="font-medium line-clamp-2 text-[14px]">
                      {x?.artistsNames}
                    </p>
                  </div>
                </div>
                <div className=" w-[49%] ">
                  <span className="font-medium text-[15px] line-clamp-1">
                    {x?.album?.title}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-[15px]">
                    {formatTime(x.duration)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {isLoading ? (
            <Skeleton width={150} height={40} />
          ) : (
            <div className="mt-4">
              <span className="pr-2 border-r border-r-border-color text-sm text-light-title-color">
                {listSong?.song?.total} bài hát
              </span>
              <span className="pl-2 text-sm text-light-title-color">
                {secondsToHms(listSong?.song.totalDuration)}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6">
        <span className="text-title-color text-2xl font-semibold ">
          {!isLoading && "Nghệ Sĩ Tham Gia "}
        </span>
        <div className="flex gap-10 mt-10">
          {listSong?.artists.map((x, index) => (
            <div key={index}>
              <img
                src={x.thumbnailM}
                alt=""
                className="rounded-full"
                width={250}
              />
              <p className="font-semibold mt-3 text-light-title-color text-center">
                {x.alias}
              </p>
              <p className="text-center text-lighter-text-color">
                {Math.floor(x.totalFollow / 1000)}K theo dõi
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListSong;
