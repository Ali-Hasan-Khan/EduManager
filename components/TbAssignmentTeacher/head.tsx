import React from "react";
import { Tablehd } from "@/types/table";
import {
  Book,
  User,
  File,
  Calendar,
  Clock,
  MoreHorizontal,
  Home,
} from "lucide-react";

const tablehdDataSchedule: Tablehd[] = [
  {
    name: "Lesson",
    icon: Book,
  },
  {
    name: "Assignment",
    icon: File,
  },
  {
    name: "Classroom",
    icon: Home,
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
          {tablehdDataSchedule.map((tablehdItem, key) => {
            const isCenter = tablehdItem.name === "Actions";
            return (
              <th
                key={key}
                className={`font-medium text-white dark:text-white ${
                  tablehdItem.name === "Lesson"
                    ? "min-w-auto px-4 py-4"
                    : tablehdItem.name === "Assignment"
                      ? "min-w-auto px-4 py-4"
                      : tablehdItem.name === "Classroom"
                        ? "min-w-auto px-4 py-4"
                        : tablehdItem.name === "File"
                          ? "min-w-auto px-4 py-4"
                          : tablehdItem.name === "Deadline"
                            ? "min-w-auto px-4 py-4"
                            : tablehdItem.name === "Time"
                              ? "min-w-auto px-4 py-4"
                              : tablehdItem.name === "Actions"
                                ? "px-4 py-4 text-center"
                                : ""
                }`}
              >
                <div
                  className={`flex items-center gap-2${isCenter ? " justify-center" : ""}`}
                >
                  <tablehdItem.icon className="h-4 w-4" />
                  {tablehdItem.name}
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
    </>
  );
};
