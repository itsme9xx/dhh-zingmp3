import { useSelector } from "react-redux";
import axios from "axios";

const PlayList = () => {
  axios
    .get("https://serverzingmp3.vercel.app/api/top100")
    .then((res) => console.log(res.data.data));

  // console.log(import.meta.env.REACT_APP_BASE_URL_API);
  return (
    <div className="m-8">
      <div className=" flex h-12 w-96 max-w-full items-center bg-third-color">
        <i className="fa-sharp fa-solid fa-magnifying-glass text-light-title-color ml-4 mr-2"></i>
        <input
          placeholder="Nhập từ khóa tìm kiếm"
          className="w-full bg-transparent text-light-title-color px-2 outline-none"
          type="search"
          name="musicsearch"
        />
      </div>
    </div>
  );
};

export default PlayList;
