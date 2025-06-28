import React from "react";
import { fetchTeachers } from "@/data/teachers";
import { PageProps } from "@/types/pagination";
import Pagination from "../pagination/pagination";
import Search from "../Search/search";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Activity,
  CheckCircle,
  AlertCircle,
  XCircle,
  Calendar,
  GraduationCap
} from "lucide-react";

export type FetcLessonsType = typeof fetchTeachers;

const TbodyTeacher = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1);
  const take = 15; // Increased for better dashboard feel
  const skip = (pageNumber - 1) * take;
  const search =
    typeof props?.searchParams?.search === "string"
      ? props?.searchParams?.search
      : undefined;
  
  const { data, metadata } = await fetchTeachers({ take, skip, query: search });

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

  const getGenderBadge = (gender: string) => {
    const genderConfig = {
      MALE: {
        className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-800",
        icon: "👨"
      },
      FEMALE: {
        className: "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/20 dark:text-pink-400 dark:border-pink-800",
        icon: ""
      },
      UNKNOW: {
        className: "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/20 dark:text-gray-400 dark:border-gray-800",
        icon: "❓"
      }
    };

    const config = genderConfig[gender as keyof typeof genderConfig] || genderConfig.UNKNOW;
    
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${config.className}`}>
        <span className="text-sm">{config.icon}</span>
        <span className="capitalize">{gender.toLowerCase()}</span>
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
        {data.map((teacher) => (
          <tr 
            key={teacher.id}
            className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all duration-200 group"
          >
            <td className="px-6 py-5 xl:pl-8">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 ring-2 ring-gray-100 dark:ring-gray-800">
                  <AvatarFallback className={`bg-gradient-to-br ${getRandomColor(teacher.name || 'T')} text-white font-semibold text-sm`}>
                    {getInitials(teacher.name || 'T')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {teacher.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                      {teacher.id.slice(0, 8)}...
                    </span>
                    <div className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      Teacher
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
                {teacher.user.email}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3 w-3" />
                  <span>Teaching staff</span>
                </div>
              </div>
            </td>
            
            <td className="px-6 py-5">
              {getGenderBadge(teacher.user.gender)}
            </td>
            
            <td className="px-6 py-5">
              {getStatusIndicator(teacher.user.status)}
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
                  <GraduationCap className="h-10 w-10 text-gray-400" />
                </div>
                <div className="max-w-sm">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No teachers found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {search 
                      ? `No teachers match "${search}". Try adjusting your search terms.`
                      : "Get started by adding your first teacher to the system."
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
                <span className="font-medium">{metadata.totalPages}</span> teachers
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

export default TbodyTeacher;
