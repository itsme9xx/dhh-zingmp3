import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { ListSongLoading } from "../ListLoading";
import { Search } from "../PlayList";

const SearchPage = () => {
  const param = useParams();
  const [searchSong, setSearchSong] = useState();
  const [isLoading, setIsLoading] = useState(false);
  //   const datafilter = [
  //     {
  //       name: "Tất cả",
  //       active: false,
  //     },
  //     {
  //       name: "Bài hát",
  //       active: false,
  //     },
  //     {
  //       name: "Playlist",
  //       active: false,
  //     },
  //     {
  //       name: "Top MV",
  //       active: false,
  //     },
  //   ];

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://serverzingmp3.vercel.app/api/search?keyword=${param.keyword}`
      )
      .then((res) => {
        setSearchSong(res.data.data);
        setIsLoading(false);
      });
  }, [param]);
  console.log(searchSong);
  return (
    <div className="m-8 ml-[var(--marginLeftCustom)]  w-[72vw]  mr-[var(--marginRightCustom)] ">
      <Search />
      {/* {isLoading && <ListSongLoading />} */}
      {/* <div className="flex gap-10">
        {datafilter.map((x, index) => (
          <p
            className={`text-2xl ${
              x.active == true ? "bg-red-500" : "bg-yellow-500"
            } `}
            key={index}
            onClick={() => {
              x.active = true;
            }}
          >
            {x.name}
          </p>
        ))}
      </div> */}
      <div className="mt-12">
        {isLoading ? (
          <>
            <Skeleton width={200} height={40} />
            <div className="grid grid-cols-2 mt-6 gap-10">
              <div className="flex items-center gap-4 border-b border-b-border-color pb-4 border-b border-b-border-color pb-4">
                <i className="fa-sharp fa-solid fa-music text-lighter-text-color "></i>
                <Skeleton height={60} width={60} />
                <Skeleton
                  width={200}
                  height={40}
                  style={{ display: "flex", alignItems: "flex-start" }}
                />
              </div>
              <div className="flex items-center gap-4 border-b border-b-border-color pb-4">
                <i className="fa-sharp fa-solid fa-music text-lighter-text-color "></i>
                <Skeleton height={60} width={60} />
                <Skeleton
                  width={200}
                  height={40}
                  style={{ display: "flex", alignItems: "flex-start" }}
                />
              </div>
              <div className="flex items-center gap-4 border-b border-b-border-color pb-4">
                <i className="fa-sharp fa-solid fa-music text-lighter-text-color "></i>
                <Skeleton height={60} width={60} />
                <Skeleton
                  width={200}
                  height={40}
                  style={{ display: "flex", alignItems: "flex-start" }}
                />
              </div>
              <div className="flex items-center gap-4 border-b border-b-border-color pb-4">
                <i className="fa-sharp fa-solid fa-music text-lighter-text-color "></i>
                <Skeleton height={60} width={60} />
                <Skeleton
                  width={200}
                  height={40}
                  style={{ display: "flex", alignItems: "flex-start" }}
                />
              </div>
              <div className="flex items-center gap-4 border-b border-b-border-color pb-4">
                <i className="fa-sharp fa-solid fa-music text-lighter-text-color "></i>
                <Skeleton height={60} width={60} />
                <Skeleton
                  width={200}
                  height={40}
                  style={{ display: "flex", alignItems: "flex-start" }}
                />
              </div>
              <div className="flex items-center gap-4 border-b border-b-border-color pb-4">
                <i className="fa-sharp fa-solid fa-music text-lighter-text-color "></i>
                <Skeleton height={60} width={60} />
                <Skeleton
                  width={200}
                  height={40}
                  style={{ display: "flex", alignItems: "flex-start" }}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-2xl font-semibold mb-4 text-light-title-color">
              Bài hát
            </p>
            <div className="grid grid-cols-2 gap-4 cursor-pointer">
              {searchSong?.songs.map((x, index) => (
                <div
                  key={index}
                  className="flex  border-b border-b-border-color items-center px-4 py-4 gap-4 text-lighter-text-color font-semibold hover:bg-third-color"
                >
                  <div className="">
                    <i className="fa-sharp fa-solid fa-music text-[14px]"></i>
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
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-12">
        {isLoading ? (
          <>
            <Skeleton width={200} height={40} />
            <div className="grid grid-cols-5 gap-10 mt-4">
              <Skeleton width={300} height={300} />
              <Skeleton width={300} height={300} />
              <Skeleton width={300} height={300} />
              <Skeleton width={300} height={300} />
              <Skeleton width={300} height={300} />
            </div>
          </>
        ) : (
          <>
            <p className="text-2xl font-semibold mb-6 text-light-title-color ">
              Playlists
            </p>
            <div className="grid grid-cols-5 gap-4  cursor-pointer">
              {searchSong?.playlists.map((x, index) => (
                <div key={index} className="flex mb-10">
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
          <>
            <Skeleton width={200} height={40} />
            <div className="grid grid-cols-5 gap-10 mt-4">
              <Skeleton width={300} height={300} />
              <Skeleton width={300} height={300} />
              <Skeleton width={300} height={300} />
              <Skeleton width={300} height={300} />
              <Skeleton width={300} height={300} />
            </div>
          </>
        ) : (
          <>
            <p className="text-2xl font-semibold mb-6 text-light-title-color">
              Top MV
            </p>
            <div className="grid grid-cols-4 gap-4 cursor-pointer  ">
              {searchSong?.videos.map((x, index) => (
                <div key={index} className="flex mb-10 overflow-hidden ">
                  <div className=" ">
                    <div className=" relative hover:scale-110 duration-1000 transition-all overflow-hidden hover:brightness-50  ">
                      <div className="absolute w-[40px] h-[40px] flex justify-center items-center border-2 border-white  rounded-full top-[42%] left-[42%] z-10 ">
                        <i class="fa-duotone fa-play text-white"></i>
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
