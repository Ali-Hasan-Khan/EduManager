import React from "react";
import { getAllTeachers } from "@/data/academy";
import Edt from "./btn/edt";
import Del from "./btn/del";
import { PageProps } from "@/types/pagination";
import { fetchLessons } from "@/data/lessons";
import Pagination from "../pagination/pagination";
import Search from "../Search/search";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  User, 
  Tag,
  GraduationCap,
  MoreHorizontal,
  Clock,
  BookMarked
} from "lucide-react";

export type FetcLessonsType = typeof fetchLessons;

const TbodyLesson = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1);
  const take = 15; // Increased for better dashboard feel
  const skip = (pageNumber - 1) * take;
  const search =
    typeof props?.searchParams?.search === "string"
      ? props?.searchParams?.search
      : undefined;
  
  const { data, metadata } = await fetchLessons({ take, skip, query: search });
  const [teachers] = await Promise.all([getAllTeachers()]);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "ART":
        return (
          <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-800">
            <Tag className="h-3 w-3" />
            <span>Art</span>
          </div>
        );
      case "LANGUANGES":
        return (
          <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800">
            <Tag className="h-3 w-3" />
            <span>Languages</span>
          </div>
        );
      case "SCIENCE":
        return (
          <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800">
            <Tag className="h-3 w-3" />
            <span>Science</span>
          </div>
        );
      case "SPORT":
        return (
          <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-800">
            <Tag className="h-3 w-3" />
            <span>Sport</span>
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center gap-2 px-3 w-fit py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200 dark:bg-gray-950/20 dark:text-gray-400 dark:border-gray-800">
            <Tag className="h-3 w-3" />
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
        {data.map((lesson) => (
          <tr 
            key={lesson.id}
            className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all duration-200 group"
          >
            <td className="px-6 py-5 xl:pl-8">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${getRandomColor(lesson.name)} flex items-center justify-center ring-2 ring-gray-100 dark:ring-gray-800`}>
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {lesson.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                      {lesson.id.slice(0, 8)}...
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
                {getCategoryBadge(lesson.cat)}
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Tag className="h-3 w-3" />
                  <span>Subject category</span>
                </div>
              </div>
            </td>
            
            <td className="px-6 py-5">
              <div className="flex flex-col gap-2">
                {getTeacherBadge(lesson.teacher.name as string)}
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>Assigned instructor</span>
                </div>
              </div>
            </td>

            <td className="px-6 py-5">
              <div className="flex items-center justify-center gap-1">
                <Del lesson={lesson} />
                <Edt teachers={teachers} lesson={lesson} />
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
            <td colSpan={4} className="px-6 py-20 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-gray-400" />
                </div>
                <div className="max-w-sm">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No lessons found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {search 
                      ? `No lessons match "${search}". Try adjusting your search terms.`
                      : "Get started by adding your first lesson to the system."
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
          <td className="py-6" colSpan={4}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-medium">{skip + 1}</span> to{" "}
                <span className="font-medium">{Math.min(skip + data.length, metadata.totalPages)}</span> of{" "}
                <span className="font-medium">{metadata.totalPages}</span> lessons
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

export default TbodyLesson;
