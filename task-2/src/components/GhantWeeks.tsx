import React from "react";
import { useSelector } from "react-redux";
import { selectGhantWeeks } from "../store/store";
import type { IGhantWeek } from "../utils/interfaces";

const GhantWeeks = () => {
  const ghantWeeks = useSelector(selectGhantWeeks);

  return (
    <div className="grid w-full auto-cols-[168px] grid-flow-col ">
      {ghantWeeks &&
        ghantWeeks.map((week: IGhantWeek, idx) => (
          <div
            key={week.start.toString() + idx}
            className="flex h-[24px] w-[168px] flex-col items-center justify-start bg-[#F7F8FC] text-black"
          >
            <div className="main_border h-[24px] w-full  border-b-[1px] border-r-[1px] text-center  text-[12px]">
              {`${week.start} - ${week.end}`}
            </div>
          </div>
        ))}
    </div>
  );
};

export default GhantWeeks;
