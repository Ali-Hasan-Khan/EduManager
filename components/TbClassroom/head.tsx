import React from "react";
import { Tablehd } from "@/types/table";
import { School, Users } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

const tablehdDataClassroom: Tablehd[] = [
  {
    name: "Classroom",
    icon: School,
  },
  {
    name: "Capacity", 
    icon: Users,
  },
  {
    name: "Total Student",
    icon: Users,
  },
  {
    name: "Actions",
    icon: MoreHorizontal,
  },
];
export const TbheadClassroom = () => {
  return (
    <>
      <thead>
      <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          {tablehdDataClassroom.map((tablehdItem, key) => (
            <th
              key={key}
              className={`font-medium text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider ${
                tablehdItem.name === "Classroom"
                  ? "min-w-[220px] px-4 py-4 xl:pl-11"
                  : tablehdItem.name === "Capacity"
                    ? "min-w-[150px] px-4 py-4"
                    : tablehdItem.name === "Total Student"
                      ? "min-w-[150px] px-4 py-4"
                      : tablehdItem.name === "Actions"
                        ? "px-20 py-4"
                        : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <tablehdItem.icon className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                <span className="font-semibold">{tablehdItem.name}</span>
              </div>  
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};
