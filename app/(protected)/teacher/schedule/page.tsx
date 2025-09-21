import React from "react";
import { TbheadScheduleTeacher } from "@/components/TbScheduleTeacher/head";
import TbodyScheduleTeacher from "@/components/TbScheduleTeacher/body";

const Schedulelist = async () => {
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <TbheadScheduleTeacher />
            <TbodyScheduleTeacher />
          </table>
        </div>
      </div>
    </div>
  );
};

export default Schedulelist;
