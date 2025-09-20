import React from "react";
import { getSchedulebyTeacherId } from "@/data/teacher";
import { getAttendanceStatusForSchedules } from "@/data/attendance";
import Link from "next/link";
import { Lock } from "lucide-react";

const TbodyScheduleTeacher = async () => {
  const result = await getSchedulebyTeacherId();

  // Since result is an object (single teacher), handle it directly
  if (!result) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={5}
            className="border-b border-[#eee] px-4 py-8 text-center dark:border-strokedark"
          >
            <p className="text-gray-500 dark:text-gray-400">
              No schedule data available
            </p>
          </td>
        </tr>
      </tbody>
    );
  }

  // Handle single teacher object
  const teacher = result as any;

  // Get attendance status for all schedules
  const attendanceMap = await getAttendanceStatusForSchedules(teacher.userId);

  // Helper function to check if class is in the future
  const isClassInFuture = (date: string, time: string) => {
    const now = new Date();
    const classDate = new Date(date);

    // Parse time (assuming format like "08:00")
    const [hours, minutes] = time.split(":").map(Number);
    classDate.setHours(hours, minutes, 0, 0);

    return classDate > now;
  };

  // Flatten the data structure for better table representation
  const scheduleData =
    teacher.lesson?.flatMap((lesson: any) =>
      lesson.schedule?.length > 0
        ? lesson.schedule.map((schedule: any) => {
            const dateStr = new Date(schedule.day).toISOString().split("T")[0];
            const attendanceKey = `${schedule.id}-${dateStr}`;
            const isAttendanceTaken = attendanceMap.has(attendanceKey);
            const isFuture = isClassInFuture(dateStr, schedule.time);

            return {
              id: schedule.id,
              lessonName: lesson.name,
              lessonCategory: lesson.cat,
              classroomName: schedule.classroom?.name || "Unknown",
              classroomId: schedule.classId,
              day: schedule.day,
              time: schedule.time,
              date: dateStr,
              teacherName: teacher.name,
              teacherId: teacher.id,
              lessonId: lesson.id,
              isAttendanceTaken,
              isFuture,
            };
          })
        : [
            {
              id: `${teacher.id}-${lesson.id}-empty`,
              lessonName: lesson.name,
              lessonCategory: lesson.cat,
              classroomName: "Not assigned",
              classroomId: null,
              day: null,
              time: "Not scheduled",
              date: null,
              teacherName: teacher.name,
              teacherId: teacher.id,
              lessonId: lesson.id,
              isAttendanceTaken: false,
              isFuture: false,
            },
          ]
    ) || [];

  console.log("schedule data:", scheduleData);

  return (
    <tbody>
      {scheduleData.length > 0 ? (
        scheduleData.map((item: any) => (
          <tr key={item.id}>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <p className="font-medium text-black dark:text-white">
                {item.lessonName}
              </p>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {item.lessonCategory}
              </span>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm text-black dark:text-white">
                {item.classroomName}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm text-black dark:text-white">
                {item.day
                  ? new Date(item.date).toLocaleDateString()
                  : "Not scheduled"}
              </p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-sm text-black dark:text-white">{item.time}</p>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              {item.date && item.classroomId ? (
                item.isFuture ? (
                  // Future class - locked status
                  <div className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Lock className="h-4 w-4 mr-1" />
                    <span>Future Class</span>
                  </div>
                ) : item.isAttendanceTaken ? (
                  // Past/current class with attendance taken
                  <Link
                    href={`/teacher/attendance/view/${item.id}?classId=${item.classroomId}&lessonId=${item.lessonId}&date=${item.date}`}
                    className="inline-flex items-center text-sm text-green-600 hover:text-green-700 hover:underline dark:text-green-400 dark:hover:text-green-300 transition-colors duration-200"
                  >
                    <span className="mr-1">✓</span>
                    <span>View Attendance</span>
                  </Link>
                ) : (
                  // Past/current class without attendance taken
                  <Link
                    href={`/teacher/attendance/${item.id}?classId=${item.classroomId}&lessonId=${item.lessonId}&date=${item.date}`}
                    className="inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                  >
                    <span className="ml-1 text-xs">📋</span>
                    Take Attendance
                  </Link>
                )
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Not set
                </p>
              )}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={5}
            className="border-b border-[#eee] px-4 py-8 text-center dark:border-strokedark"
          >
            <p className="text-gray-500 dark:text-gray-400">
              No schedule data available
            </p>
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TbodyScheduleTeacher;
