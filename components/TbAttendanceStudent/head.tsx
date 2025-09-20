import React from "react";
import { Tablehd } from "@/types/table";
import { Book, User, Calendar, Percent, Eye, BarChart3 } from "lucide-react";

const tablehdDataAttendance: Tablehd[] = [
  {
    name: "Lesson",
    icon: Book,
  },
  {
    name: "Teacher",
    icon: User,
  },
  {
    name: "Total Classes",
    icon: BarChart3,
  },
  {
    name: "Attendance %",
    icon: Percent,
  },
  {
    name: "Actions",
    icon: Eye,
  },
];

const TbheadAttendance = () => {
  return (
    <>
      <thead>
        <tr className="bg-blue-700 text-left dark:bg-meta-4">
            {tablehdDataAttendance.map((tablehdItem, key) => {
            const isCenter =
              tablehdItem.name === "Total Classes" ||
              tablehdItem.name === "Attendance %" ||
              tablehdItem.name === "Actions";
            return (
              <th
              key={key}
              className={`font-medium text-white dark:text-white ${
                tablehdItem.name === "Lesson"
                ? "min-w-auto px-4 py-4"
                : tablehdItem.name === "Teacher"
                  ? "min-w-auto px-4 py-4"
                  : tablehdItem.name === "Total Classes"
                  ? "min-w-auto px-4 py-4"
                  : tablehdItem.name === "Attendance %"
                    ? "min-w-auto px-4 py-4"
                    : tablehdItem.name === "Actions"
                    ? "px-4 py-4 text-center"
                    : ""
              }`}
              >
              <div className={`flex items-center gap-2${isCenter ? " justify-center" : ""}`}>
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

export default TbheadAttendance;
