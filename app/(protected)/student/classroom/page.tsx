import React from "react";
import { TbheadClassroom } from "@/components/TbClassroom/head";
import TbodyClassroom from "@/components/TbClassroom/body";
import { PageProps } from "@/types/pagination";

// Dummy classroom data to simulate a student's classroom
const classroom = {
  id: 1,
  name: "Grade 1",
  teacher: "Mr. Johnson",
  cap: 30,
  count: 3,
};

const Classroom = async (props: PageProps) => {
  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <TbheadClassroom />
            <tbody>
              {/* Displaying a single entry */}
              <tr key={classroom.id}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {classroom.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-sm  text-black dark:text-white ml-5">
                    {classroom.cap}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-sm text-black dark:text-white ml-12">
                    {classroom.count}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-sm text-black dark:text-white ml-12">
                    -
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
