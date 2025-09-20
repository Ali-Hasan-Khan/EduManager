import React from "react";
import Link from "next/link";
import { getAssignmentbyTeacherId, getLessonbyTeacherId } from "@/data/teacher";
import { getAllClassrooms } from "@/data/academy";
import { AssignmentResult } from "@/lib/teacher";
import Edt from "./btn/edt";
import Del from "./btn/del";
const TbodyAssignment = async () => {
  const result = await getAssignmentbyTeacherId();
  const [classrooms] = await Promise.all([getAllClassrooms()]);
  const { data } = await getLessonbyTeacherId();
  const AssignmentData = AssignmentResult(result);

  const OpenOnNewTabLink: React.FC<{
    url: string;
    children: React.ReactNode;
  }> = ({ url, children }) => (
    <a href={url} target="_blank">
      {children}
    </a>
  );

  return (
    <tbody>
      {AssignmentData && AssignmentData.length > 0 ? (
        AssignmentData.map((assingmentItem) =>
          assingmentItem.lesson.map((lesson) =>
            lesson.assingment.map((assignment) => (
              <tr
                key={`${lesson.id}-${assignment.id}`}
                className="border-b border-stroke dark:border-strokedark hover:bg-gray-50 dark:hover:bg-meta-4"
              >
                <td className="min-w-auto px-4 py-5">
                  <h5 className="font-medium text-black dark:text-white">
                    {lesson.name}
                  </h5>
                </td>
                <td className="min-w-auto px-4 py-5">
                  <p className="text-black dark:text-white">
                    {assignment.task}
                  </p>
                </td>
                <td className="min-w-auto px-4 py-5">
                  <p className="text-black dark:text-white">
                    {assignment.classroom.name}
                  </p>
                </td>
                <td className="min-w-auto px-4 py-5">
                  {assignment.fileUrl ? (
                    <OpenOnNewTabLink url={assignment.fileUrl}>
                      <span className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200">
                        📄 View File
                      </span>
                    </OpenOnNewTabLink>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400">
                      No File
                    </span>
                  )}
                </td>
                <td className="min-w-auto px-4 py-5">
                  <p className="text-black dark:text-white">
                    {assignment.deadline}
                  </p>
                </td>
                <td className="min-w-auto px-4 py-5">
                  <p className="text-black dark:text-white">
                    {assignment.time}
                  </p>
                </td>
                <td className="px-4 py-5 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Edt
                      lessons={data}
                      classrooms={classrooms}
                      assignment={assignment}
                    />
                    <Del assignment={assignment} />
                  </div>
                </td>
              </tr>
            ))
          )
        )
      ) : (
        <tr>
          <td colSpan={7} className="px-4 py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No Assignment data found
            </p>
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TbodyAssignment;
