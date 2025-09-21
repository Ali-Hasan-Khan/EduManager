import React from "react";
import { getSchedulebyTeacherId } from "@/data/teacher";
import { ScheduleResult } from "@/lib/teacher";
import { getScheduleByClassId } from "@/data/schedules";
import { getClassroomIdByStudentUserId } from "@/data/student";
import { BookOpen, School, User, Calendar, Clock, BookMarked } from "lucide-react";

const TbodyScheduleStudent = async () => {
  const classId = await getClassroomIdByStudentUserId();

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

  const getClassroomBadge = (classroomName: string) => {
    return (
      <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-cyan-50 text-cyan-700 border border-cyan-200 dark:bg-cyan-950/20 dark:text-cyan-400 dark:border-cyan-800">
        <School className="h-3 w-3" />
        <span>{classroomName}</span>
      </div>
    );
  };

  const getTimeBadge = (time: string) => {
    return (
      <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800">
        <Clock className="h-3 w-3" />
        <span>{time}</span>
      </div>
    );
  };

  const getDateBadge = (date: Date) => {
    return (
      <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800">
        <Calendar className="h-3 w-3" />
        <span>{date.toLocaleDateString()}</span>
      </div>
    );
  };

  if (!classId) {
    return (
      <tbody>
        <tr>
          <td colSpan={5} className="px-6 py-20 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <School className="h-10 w-10 text-gray-400" />
              </div>
              <div className="max-w-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No class assigned
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  You haven&apos;t been assigned to any classroom yet. Please contact your administrator.
                </p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  const result = await getScheduleByClassId(classId);

  return (
    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
      {result && result.length > 0 ? (
        result.map((lesson) => (
          <tr
            key={`${lesson.id}-${lesson.lesson.name}`}
            className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all duration-200 group"
          >
            <td className="px-6 py-5 xl:pl-8">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${getRandomColor(lesson.lesson.name)} flex items-center justify-center ring-2 ring-gray-100 dark:ring-gray-800`}>
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {lesson.lesson.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                      {lesson.id.slice(0, 8)}...
                    </span>
                    <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <BookMarked className="h-3 w-3" />
                      Schedule
                    </span>
                  </div>
                </div>
              </div>
            </td>

            <td className="px-6 py-5">
              <div className="flex flex-col gap-1">
                {getClassroomBadge(lesson.classroom.name)}
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <School className="h-3 w-3" />
                  <span>Classroom</span>
                </div>
              </div>
            </td>

            <td className="px-6 py-5">
              <div className="flex flex-col gap-2">
                {getTeacherBadge(lesson.lesson.teacher.name ?? "")}
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>Instructor</span>
                </div>
              </div>
            </td>

            <td className="px-6 py-5">
              <div className="flex flex-col gap-1">
                {getDateBadge(lesson.day)}
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3 w-3" />
                  <span>Class date</span>
                </div>
              </div>
            </td>

            <td className="px-6 py-5">
              <div className="flex flex-col gap-1">
                {getTimeBadge(lesson.time)}
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>Start time</span>
                </div>
              </div>
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
                  No schedule found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Your class schedule will appear here once it&apos;s created by your teachers.
                </p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TbodyScheduleStudent;
