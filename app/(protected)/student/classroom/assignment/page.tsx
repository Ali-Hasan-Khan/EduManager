import React from "react";
import { TbheadAssignment } from "@/components/TbAssignmentStudent/head";
import Link from "next/link";
import {
  getClassroomIdByStudentUserId,
  getTeacherIdByClassroomId,
  getAssignmentsByClassroomId,
  getTeacherNameById,
} from "@/data/student";
const UserList = async () => {
  const classroomId = await getClassroomIdByStudentUserId();

  if (!classroomId) {
    console.log("Classroom ID not found");
    return [];
  }

  // Fetch teacher ID and assignments concurrently
  const [teacherId, AssignmentData] = await Promise.all([
    getTeacherIdByClassroomId(classroomId),
    getAssignmentsByClassroomId(classroomId),
  ]);

  if (!teacherId) {
    console.log("Teacher ID not found for the given classroom");
    return [];
  }

  // Fetch all teacher names for the `createBy` field in parallel
  const teacherNamesMap: { [key: string]: string } = {};
  const teacherIds = Array.from(new Set(AssignmentData.map((a) => a.createBy)));

  // Get teacher names for each unique teacherId and store in a map
  await Promise.all(
    teacherIds.map(async (teacherId) => {
      const teacherName = await getTeacherNameById(teacherId);
      teacherNamesMap[teacherId] = teacherName ?? "Unknown Teacher";
    })
  );

  const data = AssignmentData.map((result: any) => ({
    id: result.id,
    name: result.task ?? "",
    lesson: [
      {
        name: result.lesson?.name ?? "",
        id: result.lessonId,
        assingment: [
          {
            classroom: {
              name: result.classroom?.name ?? "",
            },
            deadline: result.deadline, // ← Keep original Date object
            deadlineFormatted: new Date(result.deadline).toLocaleDateString(), // ← For display only
            time: result.time,
            task: result.task,
            fileUrl: result.fileUrl,
            id: result.id,
            lessonId: result.lessonId,
            classId: result.classId,
            createBy: teacherNamesMap[result.createBy],
          },
        ],
      },
    ],
  }));

  const OpenOnNewTabLink: React.FC<{
    url: string;
    children: React.ReactNode;
  }> = ({ url, children }) => (
    <a href={url} target="_blank">
      {children}
    </a>
  );

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <TbheadAssignment />
            <tbody>
              {data.map((assingmentItem) =>
                assingmentItem.lesson.map((lesson) => (
                  <tr key={`${lesson.id}-${lesson.name}`}>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                      <ul className="font-medium text-black dark:text-white py-5">
                        {lesson.name}
                      </ul>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <ul className="text-sm text-black dark:text-white py-5">
                        {lesson.assingment.map((assignment) => (
                          <li
                            key={assignment.id}
                            className="text-sm text-black dark:text-white py-1.5"
                          >
                            {assignment.task}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <ul className="text-sm text-black dark:text-white py-5">
                        {lesson.assingment.map((assignment) => (
                          <li
                            key={assignment.id}
                            className="text-sm text-black dark:text-white py-1.5"
                          >
                            {assignment.createBy}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <ul className="text-sm text-black dark:text-white py-5">
                        {lesson.assingment.map((assignment) => (
                          <li
                            key={assignment.id}
                            className="text-sm text-black dark:text-white py-1.5"
                          >
                            <button className="btnDownload" type="button">
                              {/* <Link href={assignment.fileUrl}>Click Here</Link> */}
                              <OpenOnNewTabLink url={assignment.fileUrl}>
                                Click Here
                              </OpenOnNewTabLink>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </td>
                    {/* Display formatted date */}
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <ul className="text-sm text-black dark:text-white py-5">
                        {lesson.assingment.map((assignment) => (
                          <li
                            key={assignment.id}
                            className="text-sm text-black dark:text-white py-1.5"
                          >
                            {assignment.deadlineFormatted}{" "}
                            {/* ← Use formatted version for display */}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <ul className="text-sm text-black dark:text-white py-5">
                        {lesson.assingment.map((assignment) => (
                          <li
                            key={assignment.id}
                            className="text-sm text-black dark:text-white py-1.5"
                          >
                            {assignment.time}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <ul className="text-sm text-black dark:text-white py-5">
                        {lesson.assingment.map((assignment) => {
                          const isLate =
                            new Date() > new Date(assignment.deadline); 

                          return (
                            <li
                              key={assignment.id}
                              className="text-sm text-center text-black dark:text-white py-1"
                            >
                              {isLate ? (
                                <div className="bg-red-100 text-red-700 px-2 py-1 rounded">
                                  <span>Late</span>
                                </div>
                              ) : (
                                <button className="btnDownload" type="button">
                                  <Link href="/student/assignment/submit">
                                    Submit
                                  </Link>
                                </button>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
