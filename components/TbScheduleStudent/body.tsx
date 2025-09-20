import React from "react";
import { getSchedulebyTeacherId } from "@/data/teacher";
import { ScheduleResult } from "@/lib/teacher";
import { getScheduleByClassId } from "@/data/schedules";
import { getClassroomIdByStudentUserId } from "@/data/student";

const TbodyScheduleStudent = async () => {
  const classId = await getClassroomIdByStudentUserId();
  if (!classId) {
    return (
      <tbody>
        <tr>
          <td colSpan={5} className="px-4 py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No class assigned to this student
            </p>
          </td>
        </tr>
      </tbody>
    );
  }
  const result = await getScheduleByClassId(classId);

  return (
    <tbody>
      {result && result.length > 0 ? (
        result.map((lesson) => (
          <tr
            key={`${lesson.id}-${lesson.lesson.name}`}
            className="border-b border-stroke dark:border-strokedark hover:bg-gray-50 dark:hover:bg-meta-4"
          >
            <td className="min-w-auto px-4 py-5">
              <h5 className="font-medium text-black dark:text-white">
                {lesson.lesson.name}
              </h5>
            </td>
            <td className="min-w-auto px-4 py-5">
              <p className="text-black dark:text-white">
                {lesson.classroom.name}
              </p>
            </td>
            <td className="min-w-auto px-4 py-5">
              <p className="text-black dark:text-white">
                {lesson.lesson.teacher.name}
              </p>
            </td>
            <td className="min-w-auto px-4 py-5">
              <p className="text-black dark:text-white">
                {lesson.day.toLocaleDateString()}
              </p>
            </td>
            <td className="min-w-auto px-4 py-5">
              <p className="text-black dark:text-white">{lesson.time}</p>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5} className="px-4 py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No schedule data found
            </p>
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TbodyScheduleStudent;
