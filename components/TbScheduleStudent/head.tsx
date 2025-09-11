import React from "react";
import { Tablehd } from "@/types/table";
import { Book } from "lucide-react";
const tablehdDataLesson: Tablehd[] = [
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
    name: "Date",
    icon: Book,
  },
  {
    name: "Time",
    icon: Book,
  },
];
export const TbheadScheduleStudent = () => {
  return (
    <>
      <thead>
        <tr className="bg-blue-700 text-left dark:bg-meta-4">
          {tablehdDataLesson.map((tablehdItem, key) => (
            <th
              key={key}
              className={`font-medium text-white dark:text-white ${
                tablehdItem.name === "Lesson"
                  ? "min-w-[220px] px-4 py-4 xl:pl-11"
                  : tablehdItem.name === "Classroom"
                    ? "min-w-[150px] px-4 py-4"
                    : tablehdItem.name === "Date"
                      ? "min-w-[150px] px-4 py-4"
                      : tablehdItem.name === "Time"
                        ? "min-w-[150px] px-4 py-4"
                        : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <tablehdItem.icon className="h-4 w-4" />
                {tablehdItem.name}
              </div>
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
};
