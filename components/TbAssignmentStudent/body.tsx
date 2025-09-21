import React from "react";
import Link from "next/link";
import {
  BookOpen,
  FileText,
  User,
  Paperclip,
  Calendar,
  Clock,
  MoreHorizontal,
  BookMarked,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Upload
} from "lucide-react";

// Type definitions for the assignment data structure
interface Assignment {
  id: string;
  task: string;
  createBy: string;
  fileUrl: string;
  deadline: Date;
  deadlineFormatted: string;
  time: string;
}

interface Lesson {
  id: string;
  name: string;
  assingment: Assignment[];
}

interface AssignmentData {
  id: string;
  name: string;
  lesson: Lesson[];
}

interface TbbodyAssignmentProps {
  data: AssignmentData[];
}

// Component for opening links in new tab
const OpenOnNewTabLink: React.FC<{
  url: string;
  children: React.ReactNode;
}> = ({ url, children }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const TbbodyAssignment: React.FC<TbbodyAssignmentProps> = ({ data }) => {
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

  const getFileBadge = (fileUrl: string) => {
    return (
      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-950/40 transition-colors duration-200"
      >
        <Paperclip className="h-3 w-3" />
        <span>Download</span>
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  };

  const getDeadlineBadge = (deadline: Date) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const isLate = now > deadlineDate;
    const isDueSoon = deadlineDate.getTime() - now.getTime() < 24 * 60 * 60 * 1000; // Within 24 hours

    if (isLate) {
      return (
        <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800">
          <AlertCircle className="h-3 w-3" />
          <span>Overdue</span>
        </div>
      );
    }

    if (isDueSoon) {
      return (
        <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800">
          <Clock className="h-3 w-3" />
          <span>Due Soon</span>
        </div>
      );
    }

    return (
      <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800">
        <Calendar className="h-3 w-3" />
        <span>On Time</span>
      </div>
    );
  };

  const getActionBadge = (assignment: Assignment) => {
    const isLate = new Date() > new Date(assignment.deadline);

    if (isLate) {
      return (
        <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800">
          <AlertCircle className="h-3 w-3" />
          <span>Late</span>
        </div>
      );
    }

    return (
      <Link
        href="/student/assignment/submit"
        className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-950/40 transition-colors duration-200"
      >
        <Upload className="h-3 w-3" />
        <span>Submit</span>
      </Link>
    );
  };

  // Flatten assignments for better display
  const flattenedAssignments = data.flatMap(assignmentItem =>
    assignmentItem.lesson.flatMap(lesson =>
      lesson.assingment.map(assignment => ({
        ...assignment,
        lessonName: lesson.name,
        lessonId: lesson.id
      }))
    )
  );

  return (
    <>
      <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
        {flattenedAssignments.map((assignment) => (
          <tr
            key={`${assignment.lessonId}-${assignment.id}`}
            className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all duration-200 group"
          >
            <td className="px-6 py-5 xl:pl-8">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${getRandomColor(assignment.lessonName)} flex items-center justify-center ring-2 ring-gray-100 dark:ring-gray-800`}>
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {assignment.lessonName}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                      {assignment.lessonId.slice(0, 8)}...
                    </span>
                    <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <BookMarked className="h-3 w-3" />
                      Lesson
                    </span>
                  </div>
                </div>
              </div>
            </td>

            <td className="px-6 py-5">
              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-800">
                  <FileText className="h-3 w-3" />
                  <span className="truncate max-w-[200px]">{assignment.task}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <FileText className="h-3 w-3" />
                  <span>Assignment task</span>
                </div>
              </div>
            </td>

            <td className="px-6 py-5">
              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-800">
                  <User className="h-3 w-3" />
                  <span>{assignment.createBy}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <User className="h-3 w-3" />
                  <span>Created by</span>
                </div>
              </div>
            </td>

            <td className="px-6 py-5">
              <div className="flex flex-col gap-2">
                {getFileBadge(assignment.fileUrl)}
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Paperclip className="h-3 w-3" />
                  <span>Download file</span>
                </div>
              </div>
            </td>

            <td className="px-6 py-5">
              <div className="flex flex-col gap-2">
                {getDeadlineBadge(assignment.deadline)}
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3 w-3" />
                  <span>{assignment.deadlineFormatted}</span>
                </div>
              </div>
            </td>

            <td className="px-6 py-5">
              <div className="flex flex-col gap-1">
                <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200 dark:bg-teal-950/20 dark:text-teal-400 dark:border-teal-800">
                  <Clock className="h-3 w-3" />
                  <span>{assignment.time}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>Duration</span>
                </div>
              </div>
            </td>

            <td className="px-6 py-5">
              <div className="flex items-center justify-center gap-2">
                {getActionBadge(assignment)}
                <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>

      {flattenedAssignments.length === 0 && (
        <tbody>
          <tr>
            <td colSpan={7} className="px-6 py-20 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-gray-400" />
                </div>
                <div className="max-w-sm">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No assignments found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    Your assignments will appear here once your teachers create them.
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

export default TbbodyAssignment;
