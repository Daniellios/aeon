import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import levelIcons from "../constants/levelIcons";
import UIVar from "../constants/uiVariables";
import {
  foldTask,
  selectData,
  selectGhantProjects,
  unfoldTask,
} from "../store/store";

const GhantProject = () => {
  const dispatch = useDispatch();
  const { isAnyFolded } = useSelector(selectData);

  const ghantProjects = useSelector(selectGhantProjects);

  const handleFold = (foldLevel: number) => {
    dispatch(foldTask(foldLevel));
  };

  const handleUnFold = (foldLevel: number) => {
    dispatch(unfoldTask(foldLevel));
  };

  return (
    <div className="main_border w-[390px] rounded-tl-lg rounded-bl-lg border-[1px]">
      <div className="flex h-[48px] items-center  bg-[#F7F8FC] py-[15px] pl-5 text-[14px] font-medium text-[#6D6E85]">
        Work Item
      </div>
      {/* TASK LIST */}
      <div className="relative mt-[39px] flex flex-col ">
        {ghantProjects.map((task, idx, arr) => (
          <div
            key={task.id}
            className={task.isFolded ? "work_item folded" : "work_item"}
          >
            <div
              className="flex items-center justify-start gap-2"
              style={{
                paddingLeft: `${UIVar.levelPadding * task.level}px`,
              }}
            >
              {task.subTaskAmount ? (
                <button
                  onClick={
                    isAnyFolded
                      ? () => handleUnFold(task.level)
                      : () => handleFold(task.level)
                  }
                  className={
                    arr[idx + 1]?.isFolded
                      ? "h-4  w-4 rotate-180 delay-75"
                      : " h-4 w-4 rotate-0"
                  }
                >
                  <Image
                    src={"/arrow.svg"}
                    width={16}
                    height={16}
                    alt="arrow icon"
                  ></Image>
                </button>
              ) : (
                <div></div>
              )}

              <span>
                <Image
                  src={`/${levelIcons[task.level - 1]}`}
                  width={14}
                  height={14}
                  alt="project-icon"
                ></Image>
              </span>
              <span className="text-[12px] italic  text-[#8B8C9E]">
                {task.subTaskAmount ? task.subTaskAmount : 0}
              </span>
              <p className="text-[14px]"> {task.name} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GhantProject;
