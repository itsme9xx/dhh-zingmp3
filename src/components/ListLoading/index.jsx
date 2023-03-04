import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ListLoading = () => {
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

export default ListLoading;
