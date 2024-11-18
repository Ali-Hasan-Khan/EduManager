import React from "react";
import { getSchedulebyTeacherId } from "@/data/teacher";
import { ScheduleResult } from "@/lib/teacher";
import { getScheduleByClassId } from "@/data/schedules";
const TbodyScheduleStudent = async () => {
  const classId = "cm3lz27740000u1ril8o1k3m9";
  const result = await getScheduleByClassId(classId);
  console.log("studentResult: ", result);
  // const scheduleData = ScheduleResult(result);
  // console.log("scheduledata: ",scheduleData);

  return (
    <>
      <tbody>
      {result.map((lesson) => (
            <tr key={`${lesson.id}-${lesson.lesson.name}`}>
              <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                <ul className="font-medium text-black dark:text-white py-5">
                  {lesson.lesson.name}
                </ul>
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                {result.length > 0 ? (
                  <ul className="text-sm text-black dark:text-white py-5">
                    <li
                        key={lesson.id}
                        className="text-sm text-black dark:text-white py-1"
                      >
                        {lesson.classroom.name}
                      </li>
                  </ul>
                ) : (
                  <span className="text-sm text-gray-400 dark:text-gray-600">
                    No data
                  </span>
                )}
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                {result.length > 0 ? (
                  <ul className="text-sm text-black dark:text-white py-5">
                      <li
                        key={lesson.id}
                        className="text-sm text-black dark:text-white py-1"
                      >
                        {lesson.lesson.teacher.name}
                      </li>
                  </ul>
                ) : (
                  <span className="text-sm text-gray-400 dark:text-gray-600">
                    No data
                  </span>
                )}
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                {result.length > 0 ? (
                  <ul className="text-sm text-black dark:text-white py-5">
                      <li
                        key={lesson.id}
                        className="text-sm text-black dark:text-white py-1"
                      >
                        {lesson.day.toLocaleDateString()}
                      </li>
                  </ul>
                ) : (
                  <span className="text-sm text-gray-400 dark:text-gray-600">
                    No data
                  </span>
                )}
              </td>
              <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                {result.length > 0 ? (
                  <ul className="text-sm text-black dark:text-white py-5">
                    {/* {lesson.schedule.map((schedule) => ( */}
                      <li
                        key={lesson.id}
                        className="text-sm text-black dark:text-white py-1"
                      >
                        {lesson.time}
                      </li>
                    {/* ))} */}
                  </ul>
                ) : (
                  <span className="text-sm text-gray-400 dark:text-gray-600">
                    No data
                  </span>
                )}
              </td>
            </tr>
          ))
        }
      </tbody>
    </>
  );
};

export default TbodyScheduleStudent;
