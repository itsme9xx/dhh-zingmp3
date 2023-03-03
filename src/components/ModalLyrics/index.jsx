import React from "react";

const ModalLyrics = (props) => {
  console.log("modal", props);
  return (
    <div className="bg-third-color fixed top-10 left-[73px] right-[396px] bottom-0 ">
      <div className="m-8 p-4 border-2 border-third-color flex flex-col translate-y-60 overflow-hidden translate-x-[330px] border-none">
        <div>
          <img src={props?.song.items[0]?.thumbnailM} alt="" />
        </div>
        <div className="mt-4">
          <p className="font-bold">{props?.song.items[0]?.title}</p>
          <p className="text-[13px]">{props?.song.items[0]?.artistsNames}</p>
        </div>
      </div>
      <div className="absolute right-10 top-4 cursor-pointer w-10 h-10 rounded-full bg-lighter-text-color flex justify-center items-center" onClick={()=>{
        props.setShowLyrics(false)
      }}>
        <i className="fa-regular fa-xmark"></i>
      </div>
    </div>
  );
};

export default ModalLyrics;
