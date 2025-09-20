import React from "react";
import TbheadAttendance from "@/components/TbAttendanceStudent/head";
import TbbodyAttendance from "@/components/TbAttendanceStudent/body";
import { getAttendanceByStudentId } from "@/data/attendance";

const Attendance = async () => {
  const data = await getAttendanceByStudentId();
  // console.log("Attendance data:", data);
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <TbheadAttendance />
            <TbbodyAttendance data={data ?? null} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
