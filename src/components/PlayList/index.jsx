import axios from "axios";
import { useState, useEffect } from "react";
import { Result } from "postcss";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { ListLoading } from "../ListLoading";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { playlistSlice } from "./playlistSlice";
import { useSelector } from "react-redux";

export function Search() {
  const navigate = useNavigate();
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${e.target.value}`);
    }
  };
  const [searchKey, setSearchKey] = useState();
  return (
    <div className=" flex h-12 w-96 items-center bg-third-color">
      <i className="fa-sharp fa-solid fa-magnifying-glass text-light-title-color ml-4 mr-2"></i>
      <input
        placeholder="Nhập từ khóa tìm kiếm"
        className="w-full bg-transparent text-light-title-color px-2 outline-none"
        type="search"
        name="musicsearch"
        onChange={(e) => {
          setSearchKey(e.target.value);
        }}
        onKeyUp={(e) => {
          handleKeyPress(e);
        }}
      />
    </div>
  );
}

const PlayList = () => {
  const dispatch = useDispatch();
  const [top100, setTop100] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleClickSong = (encodeId) => {
    navigate(`/playlist/${encodeId}`);
  };

  useEffect(() => {
    setIsLoading(true);
    axios.get("https://serverzingmp3.vercel.app/api/home").then((res) => {
      // console.log(res);
      setTop100(res.data.data.items);
      setIsLoading(false);
      dispatch(
        playlistSlice.actions.listChange(
          res.data.data.items[5].items[0]?.encodeId
        )
      );
      localStorage.setItem(
        "defaultSong",
        res.data.data.items[5].items[0]?.encodeId
      );
    });
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await axios.get("https://serverzingmp3.vercel.app/api/home");
  //     setTop100(data.data.data.items);
  //   fetchData()
  //   };
  //     .catch(console.error);
  // }, []);
  // console.log(top100);

  // console.log(import.meta.env.REACT_APP_BASE_URL_API);

  let data1 = {};
  let data2 = {};
  let data3 = {};
  let data4 = {};
  let data5 = {};

  if (top100.length > 0) {
    data1 = top100.find((x) => x.sectionId === "hAutoTheme1");
    data2 = top100.find((x) => x.sectionId === "hArtistTheme");
    data3 = top100.find((x) => x.sectionId === "hAutoTheme2");
    data4 = top100.find((x) => x.sectionId === "h100");
    data5 = top100.find((x) => x.sectionId === "hAlbum");
  }
  // console.log({ data });
  return (
    <div className="m-8 ml-[var(--marginLeftCustom)] xl:mr-[var(--marginRightCustom)] mb-[200px] xl:mb-0 ">
      <Search />
      {isLoading && <ListLoading />}
      {/* Lựa chọn hôm nay */}
      <div>
        <p className="font-bold text-light-title-color text-2xl my-4">
          {data1?.title}
        </p>
        <div className=" grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 ">
          {data1?.items?.map((x, index) => {
            return (
              <div key={index}>
                <div
                  className="cursor-pointer overflow-hidden"
                  onClick={() => {
                    handleClickSong(x.encodeId);
                  }}
                >
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
          {data2?.title}
        </p>
        <div className=" grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 ">
          {data2?.items?.map((x, index) => {
            return (
              <div className="" key={index}>
                <div
                  className="cursor-pointer overflow-hidden"
                  onClick={() => {
                    handleClickSong(x.encodeId);
                  }}
                >
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
          {data3?.title}
        </p>
        <div className=" grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 ">
          {data3?.items?.map((x, index) => {
            return (
              <div className="" key={index}>
                <div
                  className="cursor-pointer overflow-hidden  "
                  onClick={() => {
                    handleClickSong(x.encodeId);
                  }}
                >
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
          {data4?.title}
        </p>
        <div className=" grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 ">
          {data4?.items?.map((x, index) => {
            return (
              <div className="" key={index}>
                <div
                  className="cursor-pointer overflow-hidden  "
                  onClick={() => {
                    handleClickSong(x.encodeId);
                  }}
                >
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
        {!isLoading && (
          <p className="font-bold text-light-title-color text-2xl my-4">
            {data5?.title || "Album"}
          </p>
        )}

        <div className=" grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 ">
          {data5?.items?.map((x, index) => {
            return (
              <div className="cursor-pointer" key={index}>
                <div
                  className=" overflow-hidden  "
                  onClick={() => {
                    handleClickSong(x.encodeId);
                  }}
                >
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
