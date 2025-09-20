import React from "react";
import { PageProps } from "@/types/pagination";
import { getClassroomIdByStudentUserId } from "@/data/student";
import { getClassroomById } from "@/data/classrooms";

const TbodyStudentClassroom = async (props: PageProps) => {
  const classroomId = await getClassroomIdByStudentUserId();

  // Handle the case where the classroomId is null or undefined
  if (!classroomId) {
    return (
      <tbody>
        <tr>
          <td colSpan={4} className="px-4 py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Classroom ID is missing or invalid.
            </p>
          </td>
        </tr>
      </tbody>
    );
  }

  // Fetch the classroom data using await
  const classroom = await getClassroomById(classroomId);

  // Handle cases where the classroom is not found
  if (!classroom) {
    return (
      <tbody>
        <tr>
          <td colSpan={4} className="px-4 py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Classroom not found.
            </p>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      <tr className="border-b border-stroke dark:border-strokedark hover:bg-gray-50 dark:hover:bg-meta-4">
        <td className="min-w-auto px-4 py-5">
          <h5 className="font-medium text-black dark:text-white">
            {classroom.name}
          </h5>
        </td>
        <td className="min-w-auto px-4 py-5 text-center">
          <div className="text-black dark:text-white">
            <span className="text-lg font-semibold">{classroom.cap}</span>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              capacity
            </div>
          </div>
        </td>
        <td className="min-w-auto px-4 py-5 text-center">
          <div className="text-black dark:text-white">
            <span className="text-lg font-semibold">
              {classroom.studentOnclassroom.length}
            </span>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              enrolled
            </div>
          </div>
        </td>
        <td className="px-4 py-5 text-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            No actions available
          </span>
        </td>
      </tr>
    </tbody>
  );
};

export default TbodyStudentClassroom;
