import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ListLoading = () => {
  return Array(5)
    .fill(0)
    .map((x, index) => (
      <div key={index}>
        <div className="w-[calc(100vw-160px)] xl:w-[calc(100vw-var(--marginRightCustom)-120px)]">
          <Skeleton
            width={170}
            height={30}
            style={{ marginTop: 40, marginBottom: 20 }}
          />
          <div className=" grid  grid-cols-2 md:grid-cols-4 xl:grid-cols-5  gap-5  ">
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
    <div className="h-[calc(100vh-99vh)] w-[500px] lg:w-[430px]  2xl:w-[900px] ">
      {Array(10)
        .fill(0)
        .map((x, index) => (
          <div
            className=" flex  px-1 py-2 items-center gap-4 w-[480px] md:w-[620px] lg:w-[510px] 2xl:w-[1000px] "
            key={index}
          >
            <div className="flex gap-4 items-center w-[43%]  ">
              <i className="fa-sharp fa-solid fa-music text-lighter-text-color "></i>

              <Skeleton width={40} height={40} />
              <Skeleton className="w-[80px] xl:w-[100px] h-[20px]" />
            </div>
            <div className="w-[43%] ">
              <Skeleton className="w-[80px] xl:w-[100px] h-[20px]" />
            </div>
            <div className="flex-grow">
              <Skeleton className="w-[50px] xl:w-[80px] h-[20px] " />
            </div>
          </div>
        ))}
    </div>
  );
};
