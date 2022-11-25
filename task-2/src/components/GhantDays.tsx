import React from "react";
import { useSelector } from "react-redux";
import levelColors from "../constants/levelColors";
import UIVar from "../constants/uiVariables";
import { selectGhantDays } from "../store/store";
import type { IGhantDay } from "../utils/interfaces";

const GhantDays = () => {
  const ghantDays = useSelector(selectGhantDays);

  return (
    <div className="main_border relative grid h-full w-full auto-cols-[24px] grid-flow-col last:border-r-0">
      {ghantDays &&
        ghantDays.map((workDay: IGhantDay, idx) => (
          <div key={idx} className="main_border border-r-[1px]">
            <div
              className={`main_border h-6 border-b-[1px] p-1 text-center text-[12px]  ${
                workDay.isWeekend ? "text-[#A9A9B8]" : "text-black"
              }`}
            >
              {workDay.date}
            </div>
            <div className="h-full bg-white content-none">
              {workDay.projList &&
                workDay.projList.map((day, idx) => (
                  <div
                    key={idx}
                    className="gant-wrap"
                    style={{
                      top: `${UIVar.top + day.projPosition * UIVar.top}px`,
                    }}
                  >
                    <div
                      className="flex w-full flex-row gap-2"
                      style={{
                        paddingLeft: `${day.projDayStart * UIVar.padding}px`,
                      }}
                    >
                      <div
                        className="gant-line"
                        style={{
                          backgroundColor: `${levelColors[day.projLevel]?.bg}`,
                          borderColor: `${levelColors[day.projLevel]?.border}`,
                          width: `${day.projDuration * UIVar.width}px`,
                        }}
                      ></div>
                      <p className="text-[14px] text-[#262842]">{day.name}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default GhantDays;
