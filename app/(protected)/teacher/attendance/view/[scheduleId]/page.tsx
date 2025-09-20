import React from "react";
import { getStudentsByClassId } from "@/data/student";
import { getScheduleById } from "@/data/schedules";
import { getAttendanceByScheduleAndDate } from "@/data/attendance";
import { CheckCircle, XCircle, Users, Clock } from "lucide-react";

interface AttendanceViewPageProps {
  params: {
    scheduleId: string;
  };
  searchParams: {
    date?: string;
  };
}

const AttendanceViewPage = async ({
  params,
  searchParams,
}: AttendanceViewPageProps) => {
  const { scheduleId } = params;
  const { date } = searchParams;

  if (!date) {
    return (
      <div className="p-6 bg-white dark:bg-boxdark min-h-screen">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
            Error
          </h1>
          <p className="text-red-700 dark:text-red-300">
            Date parameter is required to view attendance.
          </p>
        </div>
      </div>
    );
  }

  // Get schedule details and attendance records
  const [schedule, attendanceRecords] = await Promise.all([
    getScheduleById(scheduleId),
    getAttendanceByScheduleAndDate(scheduleId, date),
  ]);

  if (!schedule) {
    return (
      <div className="p-6 bg-white dark:bg-boxdark min-h-screen">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
            Schedule Not Found
          </h1>
          <p className="text-red-700 dark:text-red-300">
            The requested schedule could not be found.
          </p>
        </div>
      </div>
    );
  }

  // Get all students in the classroom
  const students = await getStudentsByClassId(schedule.classId);

  // Create a map of student attendance
  const attendanceMap = new Map(
    attendanceRecords.map((record) => [record.studentId, record])
  );

  // Calculate statistics
  const totalStudents = students.length;
  const presentCount = attendanceRecords.filter(
    (r) => r.status === "PRESENT"
  ).length;
  const absentCount = attendanceRecords.filter(
    (r) => r.status === "ABSENT"
  ).length;
  const notMarkedCount = totalStudents - attendanceRecords.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-boxdark">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-boxdark-2 border border-stroke dark:border-strokedark rounded-lg shadow-default p-6">
          <div className="border-b border-stroke dark:border-strokedark pb-4 mb-6">
            <h1 className="text-3xl font-bold text-black dark:text-white">
              Attendance View
            </h1>
            <p className="text-body dark:text-bodydark mt-2">
              View attendance records for this class session
            </p>
          </div>

          {/* Class Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-meta-4 rounded-lg p-4">
              <label className="text-sm font-medium text-bodydark2 dark:text-bodydark block mb-2">
                Lesson
              </label>
              <p className="text-lg font-semibold text-black dark:text-white">
                {schedule.lesson?.name || "Unknown Lesson"}
              </p>
              <span className="text-sm text-body dark:text-bodydark">
                {schedule.lesson?.cat || "No category"}
              </span>
            </div>

            <div className="bg-gray-50 dark:bg-meta-4 rounded-lg p-4">
              <label className="text-sm font-medium text-bodydark2 dark:text-bodydark block mb-2">
                Classroom
              </label>
              <p className="text-lg font-semibold text-black dark:text-white">
                {schedule.classroom?.name || "Unknown Classroom"}
              </p>
              <span className="text-sm text-body dark:text-bodydark">
                Capacity: {schedule.classroom?.cap || "N/A"}
              </span>
            </div>

            <div className="bg-gray-50 dark:bg-meta-4 rounded-lg p-4">
              <label className="text-sm font-medium text-bodydark2 dark:text-bodydark block mb-2">
                Date & Time
              </label>
              <p className="text-lg font-semibold text-black dark:text-white">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <span className="text-sm text-body dark:text-bodydark">
                {schedule.time || "No time set"}
              </span>
            </div>
          </div>

          {/* Attendance Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Total Students
                  </p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {totalStudents}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    Present
                  </p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {presentCount}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">
                    Absent
                  </p>
                  <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                    {absentCount}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Not Marked
                  </p>
                  <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                    {notMarkedCount}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Student Attendance List */}
        <div className="bg-white dark:bg-boxdark-2 border border-stroke dark:border-strokedark rounded-lg shadow-default">
          <div className="px-6 py-4 border-b border-stroke dark:border-strokedark">
            <h2 className="text-xl font-semibold text-black dark:text-white">
              Student Attendance
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stroke dark:border-strokedark">
                  <th className="px-6 py-4 text-left text-sm font-medium text-black dark:text-white">
                    Student Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-black dark:text-white">
                    Email
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-black dark:text-white">
                    Marked At
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const attendance = attendanceMap.get(student.student.id);

                  return (
                    <tr
                      key={student.student.id}
                      className="border-b border-stroke dark:border-strokedark hover:bg-gray-50 dark:hover:bg-meta-4"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-black dark:text-white">
                              {student.student.user.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-body dark:text-bodydark">
                          {student.student.user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {attendance ? (
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              attendance.status === "PRESENT"
                                ? "bg-success bg-opacity-10 text-success"
                                : "bg-danger bg-opacity-10 text-danger"
                            }`}
                          >
                            {attendance.status}
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-semibold text-gray-600 dark:text-gray-400">
                            Not Marked
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="text-sm text-body dark:text-bodydark">
                          {attendance
                            ? new Date(attendance.markedAt).toLocaleTimeString()
                            : "-"}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceViewPage;
