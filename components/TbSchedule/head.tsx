import React from "react";
import { Tablehd } from "@/types/table";
import { Book } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
const tablehdDataSchedule: Tablehd[] = [
  {
    name: "Lesson",
    icon: Book,
  },
  {
    name: "Classroom",
    icon: Book,
  },
  {
    name: "Teacher",
    icon: Book,
  },
  {
    name: "Day",
    icon: Book,
  },
  {
    name: "Time",
    icon: Book,
  },
  {
    name: "Actions",
    icon: MoreHorizontal,
  },
];
export const TbheadSchedule = () => {
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
                  : tablehdItem.name === "Classroom"
                    ? "min-w-[150px] px-4 py-4"
                    : tablehdItem.name === "Teacher"
                      ? "min-w-[150px] px-4 py-4"
                      : tablehdItem.name === "Day"
                        ? "min-w-[150px] px-4 py-4"
                        : tablehdItem.name === "Time"
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
