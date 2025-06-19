import React from "react";
import { Tablehd } from "@/types/table";
import { Book } from "lucide-react";
import { User } from "lucide-react";
import { File } from "lucide-react";
import { Calendar } from "lucide-react";
import { Clock } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
const tablehdDataSchedule: Tablehd[] = [
  {
    name: "Lesson",
    icon: Book,
  },
  {
    name: "Name",
    icon: User,
  },
  { 
    name: "CreateBy",
    icon: User,
  },
  {
    name: "File",
    icon: File,
  },
  {
    name: "Deadline",
    icon: Calendar,
  },
  {
    name: "Time",
    icon: Clock,
  },
  {
    name: "Actions",
    icon: MoreHorizontal,
  },
];
export const TbheadAssignment = () => {
  return (
    <>
      <thead>
        <tr className="bg-blue-700 text-left dark:bg-meta-4">
          {tablehdDataSchedule.map((tablehdItem, key) => (
            <th
              key={key}
              className={`font-medium text-white dark:text-white ${
                tablehdItem.name === "Lesson"
                  ? "min-w-[220px] px-4 py-4 xl:pl-11"
                  : tablehdItem.name === "Name"
                    ? "min-w-[150px] px-4 py-4"
                    : tablehdItem.name === "CreateBy"
                      ? "min-w-[150px] px-4 py-4"
                      : tablehdItem.name === "Classroom"
                        ? "min-w-[150px] px-4 py-4"
                        : tablehdItem.name === "File"
                          ? "min-w-[150px] px-4 py-4"
                          : tablehdItem.name === "Deadline"
                            ? "min-w-[150px] px-4 py-4"
                            : tablehdItem.name === "Time"
                              ? "min-w-[150px] px-4 py-4"
                              : tablehdItem.name === "File"
                                ? "min-w-[150px] px-4 py-4"
                                : tablehdItem.name === "Actions"
                                  ? "px-20 py-4"
                                  : ""
              }`}
            >
              <tablehdItem.icon className="h-4 w-4" />
              {tablehdItem.name}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};
