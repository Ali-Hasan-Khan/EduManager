import React from "react";
import { Tablehd } from "@/types/table";
import { School, Users, UserCheck, Settings } from "lucide-react";

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
    name: "Enrolled Students",
    icon: UserCheck,
  },
  {
    name: "Actions",
    icon: Settings,
  },
];

export const TbheadClassroom = () => {
  return (
    <>
      <thead>
        <tr className="bg-blue-700 text-left dark:bg-meta-4">
          {tablehdDataClassroom.map((tablehdItem, key) => {
            const isCenter =
              tablehdItem.name === "Capacity" ||
              tablehdItem.name === "Enrolled Students" ||
              tablehdItem.name === "Actions";
            return (
              <th
                key={key}
                className={`font-medium text-white dark:text-white ${
                  tablehdItem.name === "Classroom"
                    ? "min-w-auto px-4 py-4"
                    : tablehdItem.name === "Capacity"
                      ? "min-w-auto px-4 py-4"
                      : tablehdItem.name === "Enrolled Students"
                        ? "min-w-auto px-4 py-4"
                        : tablehdItem.name === "Actions"
                          ? "px-4 py-4 text-center"
                          : ""
                }`}
              >
                <div
                  className={`flex items-center gap-2${
                    isCenter ? " justify-center" : ""
                  }`}
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
