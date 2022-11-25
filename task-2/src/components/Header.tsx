import Image from "next/image";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectData } from "../store/store";

const Header: FC = () => {
  const { period, project } = useSelector(selectData);
  return (
    <header className="flex w-full items-center justify-between">
      <div>{project + "/" + period}</div>
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
