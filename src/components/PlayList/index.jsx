import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import { Result } from "postcss";
import Skeleton from "react-loading-skeleton";
import ListLoading from "../ListLoading";
import "react-loading-skeleton/dist/skeleton.css";

const PlayList = () => {
  const [top100, setTop100] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get("https://serverzingmp3.vercel.app/api/home").then((res) => {
      setTop100(res.data.data.items);
      setIsLoading(false);
    });
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await axios.get("https://serverzingmp3.vercel.app/api/home");
  //     setTop100(data.data.data.items);
  //   };
  //   fetchData()
  //     .catch(console.error);
  // }, []);
  // console.log(top100);

  // console.log(import.meta.env.REACT_APP_BASE_URL_API);

  return (
    <div className="m-8 ml-[110px] mr-[var(--marginCustom)]  ">
      <div className=" flex h-12 w-96 max-w-full items-center bg-third-color">
        <i className="fa-sharp fa-solid fa-magnifying-glass text-light-title-color ml-4 mr-2"></i>
        <input
          placeholder="Nhập từ khóa tìm kiếm"
          className="w-full bg-transparent text-light-title-color px-2 outline-none"
          type="search"
          name="musicsearch"
        />
      </div>
      {isLoading && <ListLoading />}

      {/* Lựa chọn hôm nay */}
      <div>
        <p className="font-bold text-light-title-color text-2xl my-4">
          {top100[4]?.title}
        </p>
        <div className=" grid grid-cols-5 gap-4 ">
          {top100[4]?.items.map((x, index) => {
            return (
              <div className="" key={index}>
                <div className="cursor-pointer overflow-hidden  ">
                  <img
                    className="w-full rounded-2xl transition-all duration-1000 hover:scale-125  "
                    src={x.thumbnailM}
                    alt=""
                  />
                </div>
                <p className="cursor-pointer mt-4 text-light-title-color text-lg font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis line-clamp-1">
                  {x.title}
                </p>
                <p className="mt-4 text-lighter-text-color text-sm line-clamp-2 ">
                  {x.sortDescription}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* Nữ nghệ sĩ Việt nổi bật  */}
      <div>
        <p className="font-bold text-light-title-color text-2xl my-4">
          {top100[5]?.title}
        </p>
        <div className=" grid grid-cols-5 gap-4 ">
          {top100[5]?.items.map((x, index) => {
            return (
              <div className="" key={index}>
                <div className="cursor-pointer overflow-hidden  ">
                  <img
                    className="w-full rounded-2xl transition-all duration-1000 hover:scale-125  "
                    src={x.thumbnailM}
                    alt=""
                  />
                </div>

                <p className="cursor-pointer mt-4 text-light-title-color text-lg font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis line-clamp-1">
                  {x.title}
                </p>
                <p className="mt-4 text-lighter-text-color text-sm line-clamp-2 ">
                  {x.sortDescription}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* Nhạc mới mỗi ngày */}
      <div>
        <p className="font-bold text-light-title-color text-2xl my-4">
          {top100[7]?.title}
        </p>
        <div className=" grid grid-cols-5 gap-4 ">
          {top100[7]?.items.map((x, index) => {
            return (
              <div className="" key={index}>
                <div className="cursor-pointer overflow-hidden  ">
                  <img
                    className="w-full rounded-2xl transition-all duration-1000 hover:scale-125  "
                    src={x.thumbnailM}
                    alt=""
                  />
                </div>

                <p className="cursor-pointer mt-4 text-light-title-color text-lg font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis line-clamp-1">
                  {x.title}
                </p>
                <p className="mt-4 text-lighter-text-color text-sm line-clamp-2 ">
                  {x.sortDescription}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* Top100 */}
      <div>
        <p className="font-bold text-light-title-color text-2xl my-4">
          {top100[11]?.title}
        </p>
        <div className=" grid grid-cols-5 gap-4 ">
          {top100[11]?.items.map((x, index) => {
            return (
              <div className="" key={index}>
                <div className="cursor-pointer overflow-hidden  ">
                  <img
                    className=" w-full rounded-2xl transition-all duration-1000 hover:scale-125  "
                    src={x.thumbnailM}
                    alt=""
                  />
                </div>

                <p className="cursor-pointer mt-4 text-light-title-color text-lg font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis line-clamp-1">
                  {x.title}
                </p>
                <p className="mt-4 text-lighter-text-color text-sm line-clamp-2 ">
                  {x.sortDescription}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* Album */}
      <div>
        <p className="font-bold text-light-title-color text-2xl my-4">
          {top100[14]?.title || "Album"}
        </p>
        <div className=" grid grid-cols-5 gap-4 ">
          {top100[14]?.items.map((x, index) => {
            return (
              <div className="cursor-pointer" key={index}>
                <div className=" overflow-hidden  ">
                  <img
                    className="w-full rounded-2xl transition-all duration-1000 hover:scale-125  "
                    src={x.thumbnailM}
                    alt=""
                  />
                </div>

                <p className="mt-4 text-light-title-color text-lg font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis line-clamp-1">
                  {x.title}
                </p>
                <p className="mt-4 text-lighter-text-color text-sm line-clamp-2 ">
                  {x.sortDescription}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlayList;
