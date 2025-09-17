import React from "react";
import { TbheadAssignment } from "@/components/TbAssignmentStudent/head";
import TbbodyAssignment from "@/components/TbAssignmentStudent/body";
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

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <TbheadAssignment />
            <TbbodyAssignment data={data} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
