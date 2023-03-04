import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Search } from "../PlayList";
import { list } from "postcss";

const ListSong = () => {
  const param = useParams();
  console.log(
    `https://serverzingmp3.vercel.app/api/detailplaylist?id=${JSON.stringify(
      param.keyword
    )}`
  );
  const [listSong, setListSong] = useState();
  useEffect(() => {
    axios
      .get(
        `https://serverzingmp3.vercel.app/api/detailplaylist?id=${JSON.stringify(
          param.keyword
        )}`
      )
      .then((res) => setListSong(res.data.data));
  }, []);
  console.log(listSong);

  return (
    <div className="m-8 ml-[var(--marginLeftCustom)] mr-[var(--marginRightCustom)]">
      <Search />
      <div className="mt-12 flex gap-10 ">
        {/* Left */}
        <div className="cursor-pointer w-[400px]    ">
          <div className="overflow-hidden">
            <img
              src={listSong?.thumbnailM}
              className=" hover:scale-110 transition-all rounded-lg overflow-hidden   "
              alt=""
            />
          </div>

          <div className="flex flex-col justify-center items-center  ">
            <p className="line-clamp-2 mt-3 text-center text-2xl font-semibold text-title-color">
              {listSong?.title}
            </p>
            <p className="pt-1 px-4 line-clamp-1 text-center text-light-title-color">
              {listSong?.artistsNames}
            </p>
            <p className="pt-1 px-4 line-clamp-1 text-center text-light-title-color">
              {Math.floor(listSong?.like / 1000)}K người thích
            </p>
            <p className="pt-1 px-4 line-clamp-1 text-center text-light-title-color">
              {Math.floor(listSong?.listen / 1000)}K số lượt nghe
            </p>
          </div>
        </div>
        {/* Right */}
        <div className="w-full">
          <div className="text-title-color text-base font-medium">
            <span className="pr-2 mr-2 font-medium border-r-[0.5px] border-r-border-color text-base text-lighter-text-color ">
              Lời tựa :
            </span>
            {listSong?.sortDescription}
          </div>

          <div></div>
          <div></div>
        </div>
      </div>
      <div>
        <span className="text-title-color text-2xl font-semibold ">
          Nghệ Sĩ Tham Gia
        </span>
        <div className="flex gap-10 mt-10">
          {listSong?.artists.map((x, index) => (
            <div>
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
