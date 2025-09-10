import React from "react";
import { getStudentsByClassId } from "@/data/student";
import { getScheduleById } from "@/data/schedules";
import AttendanceForm from "@/components/AttendanceForm";

interface AttendancePageProps {
  params: {
    scheduleId: string;
  };
  searchParams: {
    classId?: string;
    lessonId?: string;
    date?: string;
  };
}

const AttendancePage = async ({ params, searchParams }: AttendancePageProps) => {
  const { scheduleId } = params;
  const { classId, lessonId, date } = searchParams;

  if (!classId || !lessonId || !date) {
    return (
      <div className="p-6 bg-white dark:bg-boxdark min-h-screen">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
            Error
          </h1>
          <p className="text-red-700 dark:text-red-300">
            Missing required parameters for attendance tracking.
          </p>
        </div>
      </div>
    );
  }

  // Get schedule details
  const schedule = await getScheduleById(scheduleId);
  
  // Get students in this classroom
  const students = await getStudentsByClassId(classId);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-boxdark">
      <div className="p-6 space-y-6">
        <div className="bg-white dark:bg-boxdark-2 border border-stroke dark:border-strokedark rounded-lg shadow-default p-6">
          <div className="border-b border-stroke dark:border-strokedark pb-4 mb-6">
            <h1 className="text-3xl font-bold text-black dark:text-white">
              Take Attendance
            </h1>
            <p className="text-body dark:text-bodydark mt-2">
              Mark attendance for your scheduled class
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-meta-4 rounded-lg p-4">
              <label className="text-sm font-medium text-bodydark2 dark:text-bodydark block mb-2">
                Lesson
              </label>
              <p className="text-lg font-semibold text-black dark:text-white">
                {schedule.lesson?.name || 'Unknown Lesson'}
              </p>
              <span className="text-sm text-body dark:text-bodydark">
                {schedule.lesson?.cat || 'No category'}
              </span>
            </div>
            
            <div className="bg-gray-50 dark:bg-meta-4 rounded-lg p-4">
              <label className="text-sm font-medium text-bodydark2 dark:text-bodydark block mb-2">
                Classroom
              </label>
              <p className="text-lg font-semibold text-black dark:text-white">
                {schedule.classroom?.name || 'Unknown Classroom'}
              </p>
              <span className="text-sm text-body dark:text-bodydark">
                Capacity: {schedule.classroom?.cap || 'N/A'}
              </span>
            </div>
            
            <div className="bg-gray-50 dark:bg-meta-4 rounded-lg p-4">
              <label className="text-sm font-medium text-bodydark2 dark:text-bodydark block mb-2">
                Date & Time
              </label>
              <p className="text-lg font-semibold text-black dark:text-white">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <span className="text-sm text-body dark:text-bodydark">
                {schedule.time || 'No time set'}
              </span>
            </div>
          </div>

          <div className="border-t border-stroke dark:border-strokedark pt-6">
            <AttendanceForm 
              students={students.map(s => ({
                id: s.student.id,
                userId: s.student.userId,
                user: {
                  id: s.student.user.id,
                  name: s.student.user.name,
                  email: s.student.user.email ?? "",
                }
              }))}
              scheduleId={scheduleId}
              classId={classId}
              lessonId={lessonId}
              date={date}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;