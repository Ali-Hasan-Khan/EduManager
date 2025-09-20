import React from "react";
import Edt from "./btn/edt";
import Del from "./btn/del";
import { PageProps } from "@/types/pagination";
import Pagination from "../pagination/pagination";
import Search from "../Search/search";
import { fetchClassrooms, getTotalUsersInClassroom } from "@/data/classrooms";
import { Badge } from "@/components/ui/badge";
import {
  School,
  Users,
  UserCheck,
  Calendar,
  GraduationCap,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Classroom } from "@/types/classroom";

export type FetcStudentsType = typeof fetchClassrooms;

const TbodyClassroom = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1);
  const take = 15; // Increased for better dashboard feel
  const skip = (pageNumber - 1) * take;
  const search =
    typeof props?.searchParams?.search === "string"
      ? props?.searchParams?.search
      : undefined;

  const { data, metadata } = await fetchClassrooms({
    take,
    skip,
    query: search,
  });

  const counts = await Promise.all(
    data.map(async (classroom) => {
      const count = await getTotalUsersInClassroom({
        classroomId: classroom.id,
      });
      return count;
    })
  );

  const getCapacityBadge = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;

    if (percentage >= 90) {
      return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-800">
          <AlertCircle className="h-3 w-3" />
          <span>
            Full ({current}/{capacity})
          </span>
        </div>
      );
    } else if (percentage >= 70) {
      return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-800">
          <AlertCircle className="h-3 w-3" />
          <span>
            Almost Full ({current}/{capacity})
          </span>
        </div>
      );
    } else {
      return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-800">
          <CheckCircle className="h-3 w-3" />
          <span>
            Available ({current}/{capacity})
          </span>
        </div>
      );
    }
  };

  const getStudentCountBadge = (count: number) => {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800">
        <Users className="h-3 w-3" />
        <span>{count} students</span>
      </div>
    );
  };

  const getRandomColor = (name: string) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-purple-500 to-purple-600",
      "from-emerald-500 to-emerald-600",
      "from-orange-500 to-orange-600",
      "from-pink-500 to-pink-600",
      "from-indigo-500 to-indigo-600",
      "from-teal-500 to-teal-600",
      "from-rose-500 to-rose-600",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <>
      <tbody>
        {data.length > 0 ? (
          data.map((classroom, index) => (
            <tr
              key={classroom.id}
              className="border-b border-stroke dark:border-strokedark hover:bg-gray-50 dark:hover:bg-meta-4"
            >
              <td className="min-w-auto px-4 py-5">
                <h5 className="font-medium text-black dark:text-white">
                  {classroom.name}
                </h5>
                <p className="text-sm text-meta-3">
                  ID: {classroom.id.slice(0, 8)}...
                </p>
              </td>

              <td className="min-w-auto px-4 py-5 text-center">
                <div className="text-black dark:text-white">
                  <span className="text-lg font-semibold">{classroom.cap}</span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    capacity
                  </div>
                </div>
              </td>

              <td className="min-w-auto px-4 py-5 text-center">
                <div className="text-black dark:text-white">
                  <span className="text-lg font-semibold">{counts[index]}</span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    enrolled
                  </div>
                </div>
                {getCapacityBadge(counts[index], parseInt(classroom.cap))}
              </td>

              <td className="px-4 py-5 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Edt classroom={classroom as unknown as Classroom} />
                  <Del classroom={classroom as unknown as Classroom} />
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="px-4 py-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                {search
                  ? `No classrooms match "${search}"`
                  : "No classroom data found"}
              </p>
            </td>
          </tr>
        )}
      </tbody>

      <tfoot>
        <tr>
          <td className="py-6" colSpan={4}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-medium">{skip + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(skip + data.length, metadata.totalPages)}
                </span>{" "}
                of <span className="font-medium">{metadata.totalPages}</span>{" "}
                classrooms
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

export default TbodyClassroom;
