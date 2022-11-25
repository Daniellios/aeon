import Image from "next/image";
import React, { FC } from "react";

interface IHeaderProps {
  projectName: string;
  projectPeriod: string;
}

const Header: FC<IHeaderProps> = ({ projectName, projectPeriod }) => {
  return (
    <header className="flex w-full items-center justify-between">
      <div>{projectName + "/" + projectPeriod}</div>
      <button className="main_border flex h-10 w-[100px] cursor-pointer items-center justify-center gap-2 rounded-[10px] border-[1px] hover:bg-slate-50">
        <Image
          src={"/download.svg"}
          width={20}
          height={20}
          alt="download file logo"
        ></Image>
        Export
      </button>
    </header>
  );
};

export default Header;
