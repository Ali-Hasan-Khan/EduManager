import React from "react";
import { Tablehd } from "@/types/table";
import { BookOpen, School, User, Calendar, Clock } from "lucide-react";

const tablehdDataSchedule: Tablehd[] = [
  {
    name: "Lesson",
    icon: BookOpen,
  },
  {
    name: "Classroom",
    icon: School,
  },
  {
    name: "Teacher",
    icon: User,
  },
  {
    name: "Date",
    icon: Calendar,
  },
  {
    name: "Time",
    icon: Clock,
  },
];

export const TbheadScheduleStudent = () => {
  return (
    <thead>
      <tr className="border-b border-gray-100 dark:border-gray-800">
        {tablehdDataSchedule.map((tablehdItem, key) => {
          const IconComponent = tablehdItem.icon;
          return (
            <th
              key={key}
              className={`font-medium text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider py-4 ${tablehdItem.name === "Lesson"
                  ? "min-w-[300px] px-6 xl:pl-8 text-left"
                  : tablehdItem.name === "Classroom"
                    ? "min-w-[200px] px-6 text-left"
                    : tablehdItem.name === "Teacher"
                      ? "min-w-[200px] px-6 text-left"
                      : tablehdItem.name === "Date"
                        ? "min-w-[150px] px-6 text-left"
                        : tablehdItem.name === "Time"
                          ? "min-w-[120px] px-6 text-left"
                          : "px-6 text-left"
                }`}
            >
              <div className="flex items-center gap-2">
                <IconComponent className="h-3.5 w-3.5 text-gray-400" />
                <span className="font-semibold">{tablehdItem.name}</span>
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
