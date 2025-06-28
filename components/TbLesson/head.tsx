import React from "react";
import { Tablehd } from "@/types/table";
import { BookOpen, Tag, User, Settings } from "lucide-react";

const tablehdDataLesson: Tablehd[] = [
  {
    name: "Lesson",
    icon: BookOpen,
  },
  {
    name: "Category",
    icon: Tag,
  },
  {
    name: "Teacher",
    icon: User,
  },
  {
    name: "Actions",
    icon: Settings,
  },
];

export const TbheadLesson = () => {
  return (
    <thead>
      <tr className="border-b border-gray-100 dark:border-gray-800">
        {tablehdDataLesson.map((tablehdItem, key) => {
          const IconComponent = tablehdItem.icon;
          return (
            <th
              key={key}
              className={`font-medium text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider py-4 ${
                tablehdItem.name === "Lesson"
                  ? "min-w-[300px] px-6 xl:pl-8 text-left"
                  : tablehdItem.name === "Category"
                    ? "min-w-[180px] px-6 text-left"
                    : tablehdItem.name === "Teacher"
                      ? "min-w-[200px] px-6 text-left"
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
