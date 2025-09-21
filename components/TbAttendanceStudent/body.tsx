"use client";
import React, { useState } from "react";
import { Eye, X, Calendar, Clock, CheckCircle, XCircle, BookOpen, User, BarChart3, Percent } from "lucide-react";
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
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${record.status === "PRESENT"
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

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "ART":
        return (
          <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-800">
            <span>Art</span>
          </div>
        );
      case "LANGUANGES":
        return (
          <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800">
            <span>Languages</span>
          </div>
        );
      case "SCIENCE":
        return (
          <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800">
            <span>Science</span>
          </div>
        );
      case "SPORT":
        return (
          <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-800">
            <span>Sport</span>
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200 dark:bg-gray-950/20 dark:text-gray-400 dark:border-gray-800">
            <span>{category}</span>
          </div>
        );
    }
  };

  const getTeacherBadge = (teacherName: string) => {
    return (
      <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-800">
        <User className="h-3 w-3" />
        <span>{teacherName}</span>
      </div>
    );
  };

  return (
    <>
      <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
        {groupedData.length > 0 ? (
          groupedData.map((lesson) => (
            <tr
              key={lesson.lessonId}
              className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all duration-200 group"
            >
              <td className="px-6 py-5 xl:pl-8">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${getRandomColor(lesson.lessonName)} flex items-center justify-center ring-2 ring-gray-100 dark:ring-gray-800`}>
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {lesson.lessonName}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      {getCategoryBadge(lesson.lessonCategory)}
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-5">
                <div className="flex flex-col gap-2">
                  {getTeacherBadge(lesson.teacherName)}
                </div>
              </td>

              <td className="px-6 py-5 text-center">
                <div className="flex flex-col items-center">
                  <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800">
                    <BarChart3 className="h-3 w-3" />
                    <span className="text-lg font-semibold">{lesson.totalClasses}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    total classes
                  </div>
                </div>
              </td>

              <td className="px-6 py-5 text-center">
                <div className="flex flex-col items-center">
                  <div className={`inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium ${lesson.attendancePercentage >= 80
                      ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800"
                      : lesson.attendancePercentage >= 60
                        ? "bg-yellow-50 text-yellow-700 border border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-400 dark:border-yellow-800"
                        : "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800"
                    }`}>
                    <Percent className="h-3 w-3" />
                    <span className="text-lg font-bold">{lesson.attendancePercentage}%</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {lesson.presentCount}/{lesson.totalClasses} present
                  </div>
                </div>
              </td>

              <td className="px-6 py-5 text-center">
                <button
                  onClick={() => handleViewDetails(lesson)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded-md transition-colors duration-200"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="px-6 py-20 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-gray-400" />
                </div>
                <div className="max-w-sm">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No attendance records found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    Your attendance records will appear here once they are marked by your teachers.
                  </p>
                </div>
              </div>
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
