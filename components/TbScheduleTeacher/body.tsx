import React from "react";
import { getSchedulebyTeacherId } from "@/data/teacher";
import { getAttendanceStatusForSchedules } from "@/data/attendance";
import Link from "next/link";
import {
  Lock,
  BookOpen,
  School,
  Calendar,
  Clock,
  CheckCircle,
  MoreHorizontal,
  BookMarked,
  AlertCircle
} from "lucide-react";

const TbodyScheduleTeacher = async () => {
  const result = await getSchedulebyTeacherId();

  // Since result is an object (single teacher), handle it directly
  if (!result) {
    return (
      <tbody>
        <tr>
          <td colSpan={5} className="px-6 py-20 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-gray-400" />
              </div>
              <div className="max-w-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No schedule data available
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Your schedule will appear here once lessons are assigned to you.
                </p>
              </div>
            </div>
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

  const getRandomColor = (name: string) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-emerald-500 to-emerald-600',
      'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-teal-500 to-teal-600',
      'from-rose-500 to-rose-600'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getAttendanceBadge = (item: any) => {
    if (!item.date || !item.classroomId) {
      return (
        <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200 dark:bg-gray-950/20 dark:text-gray-400 dark:border-gray-800">
          <AlertCircle className="h-3 w-3" />
          <span>Not set</span>
        </div>
      );
    }

    if (item.isFuture) {
      return (
        <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800">
          <Lock className="h-3 w-3" />
          <span>Future Class</span>
        </div>
      );
    }

    if (item.isAttendanceTaken) {
      return (
        <Link
          href={`/teacher/attendance/view/${item.id}?classId=${item.classroomId}&lessonId=${item.lessonId}&date=${item.date}`}
          className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-950/40 transition-colors duration-200"
        >
          <CheckCircle className="h-3 w-3" />
          <span>View Attendance</span>
        </Link>
      );
    }

    return (
      <Link
        href={`/teacher/attendance/${item.id}?classId=${item.classroomId}&lessonId=${item.lessonId}&date=${item.date}`}
        className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-950/40 transition-colors duration-200"
      >
        <BookOpen className="h-3 w-3" />
        <span>Take Attendance</span>
      </Link>
    );
  };

  return (
    <>
      <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
        {scheduleData.map((item: any) => (
          <tr
            key={item.id}
            className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all duration-200 group"
          >
            <td className="px-6 py-5 xl:pl-8">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${getRandomColor(item.lessonName)} flex items-center justify-center ring-2 ring-gray-100 dark:ring-gray-800`}>
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.lessonName}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                      {item.id.slice(0, 8)}...
                    </span>
                    <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <BookMarked className="h-3 w-3" />
                      {item.lessonCategory}
                    </span>
                  </div>
                </div>
              </div>
            </td>

            <td className="px-6 py-5">
              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-800">
                  <School className="h-3 w-3" />
                  <span>{item.classroomName}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <School className="h-3 w-3" />
                  <span>Classroom</span>
                </div>
              </div>
            </td>

            <td className="px-6 py-5">
              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-800">
                  <Calendar className="h-3 w-3" />
                  <span>{item.day ? new Date(item.date).toLocaleDateString() : "Not scheduled"}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3 w-3" />
                  <span>Class date</span>
                </div>
              </div>
            </td>

            <td className="px-6 py-5">
              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200 dark:bg-teal-950/20 dark:text-teal-400 dark:border-teal-800">
                  <Clock className="h-3 w-3" />
                  <span>{item.time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>Class time</span>
                </div>
              </div>
            </td>

            <td className="px-6 py-5">
              <div className="flex flex-col gap-2">
                {getAttendanceBadge(item)}
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <CheckCircle className="h-3 w-3" />
                  <span>Attendance status</span>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>

      {scheduleData.length === 0 && (
        <tbody>
          <tr>
            <td colSpan={5} className="px-6 py-20 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-gray-400" />
                </div>
                <div className="max-w-sm">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No schedule data available
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    Your schedule will appear here once lessons are assigned to you.
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
};

export default TbodyScheduleTeacher;
