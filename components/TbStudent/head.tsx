import React from "react";
import { Tablehd } from "@/types/table";
import { Users, Mail, GraduationCap, Activity, Settings } from "lucide-react";

const tablehdDataStudent: Tablehd[] = [
  {
    name: "Student",
    icon: Users,
  },
  {
    name: "Contact",
    icon: Mail,
  },
  {
    name: "Classroom",
    icon: GraduationCap,
  },
  {
    name: "Status",
    icon: Activity,
  },
  {
    name: "Actions",
    icon: Settings,
  },
];

export const Tbheadstudent = () => {
  return (
    <thead>
      <tr className="border-b border-gray-100 dark:border-gray-800">
        {tablehdDataStudent.map((tablehdItem, key) => {
          const IconComponent = tablehdItem.icon;
          return (
            <th
              key={key}
              className={`font-medium text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider py-4 ${
                tablehdItem.name === "Student"
                  ? "min-w-[300px] px-6 xl:pl-8 text-left"
                  : tablehdItem.name === "Contact"
                    ? "min-w-[240px] px-6 text-left"
                    : tablehdItem.name === "Classroom"
                      ? "min-w-[180px] px-6 text-left"
                      : tablehdItem.name === "Status"
                        ? "min-w-[120px] px-6 text-left"
                        : tablehdItem.name === "Actions"
                          ? "min-w-[120px] px-6 text-center"
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
