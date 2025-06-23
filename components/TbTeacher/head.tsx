import React from "react";
import { Tablehd } from "@/types/table";
import { Users, Mail, User, Activity } from "lucide-react";

const tablehdDataTeacher: Tablehd[] = [
  {
    name: "Teacher",
    icon: Users,
  },
  {
    name: "Contact",
    icon: Mail,
  },
  {
    name: "Gender",
    icon: User,
  },
  {
    name: "Status",
    icon: Activity,
  },
];

export const Tbheadteacher = () => {
  return (
    <thead>
      <tr className="border-b border-gray-100 dark:border-gray-800">
        {tablehdDataTeacher.map((tablehdItem, key) => {
          const IconComponent = tablehdItem.icon;
          return (
            <th
              key={key}
              className={`font-medium text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider py-4 ${
                tablehdItem.name === "Teacher"
                  ? "min-w-[300px] px-6 xl:pl-8 text-left"
                  : tablehdItem.name === "Contact"
                    ? "min-w-[240px] px-6 text-left"
                    : tablehdItem.name === "Gender"
                      ? "min-w-[120px] px-6 text-left"
                      : tablehdItem.name === "Status"
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
