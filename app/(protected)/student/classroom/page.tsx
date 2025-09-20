import React from "react";
import { TbheadClassroom } from "@/components/TbClassroom/head";
import { PageProps } from "@/types/pagination";
import TbodyStudentClassroom from "@/components/TbStudentClassroom/body";


const Classroom = async (props: PageProps) => {
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <TbheadClassroom />
            <TbodyStudentClassroom {...props} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
