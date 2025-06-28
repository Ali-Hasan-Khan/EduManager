import React from "react";
import { getAllLessons, getAllClassrooms } from "@/data/academy";
import Edt from "./btn/edt";
import Del from "./btn/del";
import { PageProps } from "@/types/pagination";
import Pagination from "../pagination/pagination";
import Search from "../Search/search";
import { fetchSchedules } from "@/data/schedules";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  School, 
  User, 
  Calendar,
  Clock,
  MoreHorizontal,
  GraduationCap
} from "lucide-react";

export type FetcStudentsType = typeof fetchSchedules;

const TbodySchedule = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1);
  const take = 15;
  const skip = (pageNumber - 1) * take;
  const search =
    typeof props?.searchParams?.search === "string"
      ? props?.searchParams?.search
      : undefined;
  
  const { data, metadata } = await fetchSchedules({ take, skip, query: search || "" });
  const [lessons] = await Promise.all([getAllLessons()]);
  const [classrooms] = await Promise.all([getAllClassrooms()]);

  const getTimeBadge = (time: string) => {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800">
        <Clock className="h-3 w-3" />
        <span>{time}</span>
      </div>
    );
  };

  const getDateBadge = (date: Date) => {
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
    
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-800">
        <Calendar className="h-3 w-3" />
        <span>{formattedDate}</span>
      </div>
    );
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

  return (
    <>
      <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
        {data.map((schedule) => (
          <tr 
            key={schedule.id}
            className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all duration-200 group"
          >
            <td className="px-6 py-5 xl:pl-8">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${getRandomColor(schedule.lesson.name)} flex items-center justify-center ring-2 ring-gray-100 dark:ring-gray-800`}>
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {schedule.lesson.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                      {schedule.id.slice(0, 8)}...
                    </span>
                    <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      Lesson
                    </span>
                  </div>
                </div>
              </div>
            </td>
            
            <td className="px-6 py-5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <School className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    {schedule.classroom.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <School className="h-3 w-3" />
                  <span>Classroom</span>
                </div>
              </div>
            </td>
            
            <td className="px-6 py-5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                    {schedule.lesson.teacher.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <User className="h-3 w-3" />
                  <span>Instructor</span>
                </div>
              </div>
            </td>

            <td className="px-6 py-5">
              <div className="flex flex-col gap-2">
                {getDateBadge(schedule.day)}
              </div>
            </td>

            <td className="px-6 py-5">
              <div className="flex flex-col gap-2">
                {getTimeBadge(schedule.time)}
              </div>
            </td>

            <td className="px-6 py-5">
              <div className="flex items-center justify-center gap-1">
                <Del schedule={schedule} />
                <Edt
                  lessons={lessons}
                  classrooms={classrooms}
                  schedule={schedule}
                />
                <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      
      {data.length === 0 && (
        <tbody>
          <tr>
            <td colSpan={6} className="px-6 py-20 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Calendar className="h-10 w-10 text-gray-400" />
                </div>
                <div className="max-w-sm">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No schedules found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {search 
                      ? `No schedules match "${search}". Try adjusting your search terms.`
                      : "Get started by adding your first schedule to the system."
                    }
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      )}
      
      <tfoot>
        <tr>
          <td className="py-6" colSpan={6}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-medium">{skip + 1}</span> to{" "}
                <span className="font-medium">{Math.min(skip + data.length, metadata.totalPages)}</span> of{" "}
                <span className="font-medium">{metadata.totalPages}</span> schedules
              </div>
              <div className="flex items-center gap-4">
                <Search search={search} />
                <Pagination {...metadata} />
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </>
  );
};

export default TbodySchedule;
