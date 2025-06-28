import React from "react";
import { PageProps } from "@/types/pagination";
import Pagination from "../pagination/pagination";
import Search from "../Search/search";
import Add from "./btn/add";
import { fetchStudents } from "@/data/students";
import { getAllClassrooms } from "@/data/academy";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Activity,
  CheckCircle,
  AlertCircle,
  XCircle,
  Calendar,
  GraduationCap,
  BookOpen,
  Users
} from "lucide-react";

export type FetcStudentsType = typeof fetchStudents;

const TbodyStudent = async (props: PageProps) => {
  const [classrooms] = await Promise.all([getAllClassrooms()]);
  const pageNumber = Number(props?.searchParams?.page || 1);
  const take = 15; // Increased for better dashboard feel
  const skip = (pageNumber - 1) * take;
  const search =
    typeof props?.searchParams?.search === "string"
      ? props?.searchParams?.search
      : undefined;
  
  const { data, metadata } = await fetchStudents({ take, skip, query: search });

  const getStatusIndicator = (status: string) => {
    const statusConfig = {
      ACTIVE: {
        icon: CheckCircle,
        className: "text-emerald-500",
        bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
        textColor: "text-emerald-700 dark:text-emerald-400"
      },
      IN_ACTIVE: {
        icon: AlertCircle,
        className: "text-amber-500",
        bgColor: "bg-amber-50 dark:bg-amber-950/20",
        textColor: "text-amber-700 dark:text-amber-400"
      },
      BANNED: {
        icon: XCircle,
        className: "text-red-500",
        bgColor: "bg-red-50 dark:bg-red-950/20",
        textColor: "text-red-700 dark:text-red-400"
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.IN_ACTIVE;
    const IconComponent = config.icon;
    
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
        <IconComponent className="h-3 w-3" />
        <span className="capitalize">{status.replace(/_/g, " ").toLowerCase()}</span>
      </div>
    );
  };

  const getClassroomBadge = (classrooms: any[]) => {
    if (classrooms.length === 0) {
      return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200 dark:bg-gray-950/20 dark:text-gray-400 dark:border-gray-800">
          <BookOpen className="h-3 w-3" />
          <span>No classroom</span>
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-1">
        {classrooms.slice(0, 2).map((oc, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800"
          >
            <GraduationCap className="h-3 w-3" />
            <span className="truncate max-w-[80px]">{oc.classroom.name}</span>
          </div>
        ))}
        {classrooms.length > 2 && (
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200 dark:bg-gray-950/20 dark:text-gray-400 dark:border-gray-800">
            <Users className="h-3 w-3" />
            <span>+{classrooms.length - 2}</span>
          </div>
        )}
      </div>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
        {data.map((student) => (
          <tr 
            key={student.id}
            className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all duration-200 group"
          >
            <td className="px-6 py-5 xl:pl-8">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 ring-2 ring-gray-100 dark:ring-gray-800">
                  <AvatarFallback className={`bg-gradient-to-br ${getRandomColor(student.name || 'S')} text-white font-semibold text-sm`}>
                    {getInitials(student.name || 'S')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {student.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                      {student.id.slice(0, 8)}...
                    </span>
                    <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      Student
                    </span>
                  </div>
                </div>
              </div>
            </td>
            
            <td className="px-6 py-5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate max-w-[200px]">
                {student.user.email}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3 w-3" />
                  <span>Enrolled student</span>
                </div>
              </div>
            </td>
            
            <td className="px-6 py-5">
              {getClassroomBadge(student.onClassroom)}
            </td>
            
            <td className="px-6 py-5">
              {getStatusIndicator(student.user.status)}
            </td>

            <td className="px-6 py-5">
              <div className="flex items-center justify-center">
                <Add classrooms={classrooms} student={student} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      
      {data.length === 0 && (
        <tbody>
          <tr>
            <td colSpan={5} className="px-6 py-20 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <BookOpen className="h-10 w-10 text-gray-400" />
                </div>
                <div className="max-w-sm">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No students found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {search 
                      ? `No students match "${search}". Try adjusting your search terms.`
                      : "Get started by adding your first student to the system."
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
          <td className="py-6" colSpan={5}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-medium">{skip + 1}</span> to{" "}
                <span className="font-medium">{Math.min(skip + data.length, metadata.totalPages)}</span> of{" "}
                <span className="font-medium">{metadata.totalPages}</span> students
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

export default TbodyStudent;
