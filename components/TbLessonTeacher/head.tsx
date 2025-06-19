import React from "react";
import { Tablehd } from "@/types/table";
import { Book } from "lucide-react";
const tablehdDataLesson: Tablehd[] = [
  {
    name: "Name",
    icon: Book,
  },
  {
    name: "Category",
    icon: Book,
  },
];
export const TbheadLessonteacher = () => {
  return (
    <>
      <thead>
        <tr className="bg-blue-700 text-left dark:bg-meta-4">
          {tablehdDataLesson.map((tablehdItem, key) => (
            <th
              key={key}
              className={`font-medium text-white dark:text-white ${
                tablehdItem.name === "Name"
                  ? "min-w-[220px] px-4 py-4 xl:pl-11"
                  : tablehdItem.name === "Category"
                    ? "min-w-[150px] px-4 py-4"
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
