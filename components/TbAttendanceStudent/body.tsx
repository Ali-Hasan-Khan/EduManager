"use client";
import React, { useState } from "react";
import { Eye, X, Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import { createPortal } from "react-dom";

interface AttendanceData {
  id: string;
  studentId: string;
  scheduleId: string;
  classId: string;
  lessonId: string;
  date: Date;
  status: "PRESENT" | "ABSENT";
  markedBy: string;
  markedAt: Date;
  schedule: {
    id: string;
    lessonId: string;
    classId: string;
    day: Date;
    time: string;
    lesson: {
      id: string;
      name: string;
      cat: string;
      teacherId: string;
      teacher: {
        id: string;
        name: string | null;
      };
    };
    classroom: {
      name: string;
    };
  };
}

interface GroupedAttendance {
  lessonId: string;
  lessonName: string;
  lessonCategory: string;
  teacherName: string;
  records: AttendanceData[];
  totalClasses: number;
  presentCount: number;
  absentCount: number;
  attendancePercentage: number;
}

interface TbbodyAttendanceProps {
  data: AttendanceData[] | null;
}

// Separate Modal Component
const AttendanceModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  lesson: GroupedAttendance | null;
}> = ({ isOpen, onClose, lesson }) => {
  if (!isOpen || !lesson) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-boxdark rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-stroke dark:border-strokedark">
          <div>
            <h2 className="text-xl font-semibold text-black dark:text-white">
              {lesson.lessonName} - Attendance Details
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {lesson.lessonCategory} • Teacher: {lesson.teacherName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {lesson.totalClasses}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                Total Classes
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {lesson.presentCount}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                Present
              </div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {lesson.absentCount}
              </div>
              <div className="text-sm text-red-700 dark:text-red-300">
                Absent
              </div>
            </div>
          </div>

          {/* Detailed Records Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stroke dark:border-strokedark">
                  <th className="px-4 py-3 text-left text-sm font-medium text-black dark:text-white">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-black dark:text-white">
                    Time
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-black dark:text-white">
                    Marked At
                  </th>
                </tr>
              </thead>
              <tbody>
                {lesson.records
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .map((record) => (
                    <tr
                      key={record.id}
                      className="border-b border-stroke dark:border-strokedark hover:bg-gray-50 dark:hover:bg-meta-4"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 text-sm text-black dark:text-white">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(record.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 text-sm text-black dark:text-white">
                          <Clock className="h-4 w-4 text-gray-400" />
                          {record.schedule.time}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                            record.status === "PRESENT"
                              ? "bg-success bg-opacity-10 text-success"
                              : "bg-danger bg-opacity-10 text-danger"
                          }`}
                        >
                          {record.status === "PRESENT" ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <XCircle className="h-3 w-3" />
                          )}
                          {record.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(record.markedAt).toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const TbbodyAttendance: React.FC<TbbodyAttendanceProps> = ({ data }) => {
  const [selectedLesson, setSelectedLesson] =
    useState<GroupedAttendance | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Group attendance data by lesson
  const groupedData = React.useMemo(() => {
    if (!data || data.length === 0) return [];

    const lessonMap = new Map<string, GroupedAttendance>();

    data.forEach((attendance) => {
      const lessonId = attendance.schedule.lesson.id;

      if (!lessonMap.has(lessonId)) {
        lessonMap.set(lessonId, {
          lessonId,
          lessonName: attendance.schedule.lesson.name,
          lessonCategory: attendance.schedule.lesson.cat,
          teacherName:
            attendance.schedule.lesson.teacher.name || "Unknown Teacher",
          records: [],
          totalClasses: 0,
          presentCount: 0,
          absentCount: 0,
          attendancePercentage: 0,
        });
      }

      const lesson = lessonMap.get(lessonId)!;
      lesson.records.push(attendance);
      lesson.totalClasses += 1;

      if (attendance.status === "PRESENT") {
        lesson.presentCount += 1;
      } else {
        lesson.absentCount += 1;
      }

      lesson.attendancePercentage = Math.round(
        (lesson.presentCount / lesson.totalClasses) * 100
      );
    });

    return Array.from(lessonMap.values()).sort((a, b) =>
      a.lessonName.localeCompare(b.lessonName)
    );
  }, [data]);

  const handleViewDetails = (lesson: GroupedAttendance) => {
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLesson(null);
  };

  return (
    <>
      <tbody>
        {groupedData.length > 0 ? (
          groupedData.map((lesson) => (
            <tr
              key={lesson.lessonId}
              className="border-b border-stroke dark:border-strokedark hover:bg-gray-50 dark:hover:bg-meta-4"
            >
              <td className="min-w-auto px-4 py-5">
                <h5 className="font-medium text-black dark:text-white">
                  {lesson.lessonName}
                </h5>
                <p className="text-sm text-meta-3">{lesson.lessonCategory}</p>
              </td>
              <td className="min-w-auto px-4 py-5">
                <p className="text-black dark:text-white">
                  {lesson.teacherName}
                </p>
              </td>
              <td className="min-w-auto px-4 py-5 text-center">
                <div className="text-black dark:text-white">
                  <span className="text-lg font-semibold">
                    {lesson.totalClasses}
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    classes
                  </div>
                </div>
              </td>
              <td className="min-w-auto px-4 py-5 text-center">
                <div className="flex flex-col items-center">
                  <span
                    className={`text-lg font-bold ${
                      lesson.attendancePercentage >= 80
                        ? "text-success"
                        : lesson.attendancePercentage >= 60
                          ? "text-warning"
                          : "text-danger"
                    }`}
                  >
                    {lesson.attendancePercentage}%
                  </span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {lesson.presentCount}/{lesson.totalClasses} present
                  </div>
                </div>
              </td>
              <td className="px-4 py-5 text-center">
                <button
                  onClick={() => handleViewDetails(lesson)}
                  className="inline-flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded-md transition-colors duration-200"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="px-4 py-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No attendance records found
              </p>
            </td>
          </tr>
        )}
      </tbody>

      {/* Modal rendered outside the table */}
      <AttendanceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        lesson={selectedLesson}
      />
    </>
  );
};

export default TbbodyAttendance;
