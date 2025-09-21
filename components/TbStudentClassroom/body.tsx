import React from "react";
import { getClassroomIdByStudentUserId } from "@/data/student";
import { getClassroomById } from "@/data/classrooms";
import { School, Users, UserCheck, BookMarked } from "lucide-react";

const TbodyStudentClassroom = async () => {
  const classroomId = await getClassroomIdByStudentUserId();

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

  const getCapacityBadge = (capacity: number) => {
    return (
      <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800">
        <Users className="h-3 w-3" />
        <span className="text-lg font-semibold">{capacity}</span>
      </div>
    );
  };

  const getEnrolledBadge = (enrolled: number) => {
    return (
      <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800">
        <UserCheck className="h-3 w-3" />
        <span className="text-lg font-semibold">{enrolled}</span>
      </div>
    );
  };

  const getAvailabilityBadge = (enrolled: number, capacity: number) => {
    const percentage = (enrolled / capacity) * 100;
    const isFull = percentage >= 100;
    const isAlmostFull = percentage >= 80;

    if (isFull) {
      return (
        <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800">
          <span>Full</span>
        </div>
      );
    } else if (isAlmostFull) {
      return (
        <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200 dark:bg-yellow-950/20 dark:text-yellow-400 dark:border-yellow-800">
          <span>Almost Full</span>
        </div>
      );
    } else {
      return (
        <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800">
          <span>Available</span>
        </div>
      );
    }
  };

  // Handle the case where the classroomId is null or undefined
  if (!classroomId) {
    return (
      <tbody>
        <tr>
          <td colSpan={4} className="px-6 py-20 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <School className="h-10 w-10 text-gray-400" />
              </div>
              <div className="max-w-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No classroom assigned
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

  // Fetch the classroom data using await
  const classroom = await getClassroomById(classroomId);

  // Handle cases where the classroom is not found
  if (!classroom) {
    return (
      <tbody>
        <tr>
          <td colSpan={4} className="px-6 py-20 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <School className="h-10 w-10 text-gray-400" />
              </div>
              <div className="max-w-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Classroom not found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  The classroom you&apos;re assigned to could not be found. Please contact your administrator.
                </p>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
      <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all duration-200 group">
        <td className="px-6 py-5 xl:pl-8">
          <div className="flex items-center gap-4">
            <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${getRandomColor(classroom.name)} flex items-center justify-center ring-2 ring-gray-100 dark:ring-gray-800`}>
              <School className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {classroom.name}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                  {classroom.id.slice(0, 8)}...
                </span>
              </div>
            </div>
          </div>
        </td>

        <td className="px-6 py-5">
          <div className="flex flex-col gap-1">
            {getCapacityBadge(parseInt(classroom.cap))}
          </div>
        </td>

        <td className="px-6 py-5">
          <div className="flex flex-col gap-1">
            {getEnrolledBadge(classroom.studentOnclassroom.length)}
          </div>
        </td>

        <td className="px-6 py-5">
          <div className="flex flex-col gap-1">
            {getAvailabilityBadge(classroom.studentOnclassroom.length, parseInt(classroom.cap))}
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default TbodyStudentClassroom;
