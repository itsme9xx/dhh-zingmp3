import { useSelector } from "react-redux";

const PlayList = () => {
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
