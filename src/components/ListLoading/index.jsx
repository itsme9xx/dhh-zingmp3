import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ListLoading = () => {
  return Array(5)
    .fill(0)
    .map((x, index) => (
      <div key={index}>
        <div className="w-[calc(100vw-var(--marginRightCustom)-120px)]">
          <Skeleton
            width={170}
            height={30}
            style={{ marginTop: 40, marginBottom: 20 }}
          />
          <div className=" grid grid-cols-5 gap-5  ">
            <div>
              <Skeleton height={250} />
            </div>
            <div>
              <Skeleton height={250} />
            </div>
            <div>
              <Skeleton height={250} />
            </div>
            <div>
              <Skeleton height={250} />
            </div>
            <div>
              <Skeleton height={250} />
            </div>
          </div>
        </div>
      </div>
    ));
};

export const ListSongLoading = () => {
  return (
    <div className="h-[calc(100vh-308px)] overflow-y-auto overflow-x-hidden">
      {Array(20)
        .fill(0)
        .map((x, index) => (
          <div className=" flex  px-1 py-2 items-center gap-4 " key={index}>
            <div className="flex gap-4 items-center w-[46%] ">
              <i className="fa-sharp fa-solid fa-music text-lighter-text-color "></i>

              <Skeleton width={40} height={40} />
              <Skeleton width={200} height={20} />
            </div>
            <div className="w-[45%]">
              <Skeleton width={200} height={20} />
            </div>
            <div>
              <Skeleton width={100} height={20} />
            </div>
          </div>
        ))}
    </div>
  );
};

export const ListSearchLoading = () => {
  return (
    <div className="h-[calc(100vh-308px)] overflow-y-auto overflow-x-hidden">
      {}
    </div>
  );
};
