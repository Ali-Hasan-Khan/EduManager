import React from "react";
import { Tablehd } from "@/types/table";
import { Users, Mail, Shield, Activity, Settings } from "lucide-react";

const tablehdDataUser: Tablehd[] = [
  {
    name: "User",
    icon: Users,
  },
  {
    name: "Contact",
    icon: Mail,
  },
  {
    name: "Role",
    icon: Shield,
  },
  {
    name: "Status",
    icon: Activity,
  },
  {
    name: "Actions",
    icon: Settings,
  },
];

export const Tbheaduser = () => {
  return (
    <thead>
      <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
        {tablehdDataUser.map((tablehdItem, key) => {
          const IconComponent = tablehdItem.icon;
          return (
            <th
              key={key}
              className={`font-medium text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider ${
                tablehdItem.name === "User"
                  ? "min-w-[280px] px-6 py-4 xl:pl-8"
                  : tablehdItem.name === "Contact"
                    ? "min-w-[220px] px-6 py-4"
                    : tablehdItem.name === "Role"
                      ? "min-w-[120px] px-6 py-4"
                      : tablehdItem.name === "Status"
                        ? "min-w-[120px] px-6 py-4"
                        : tablehdItem.name === "Actions"
                          ? "min-w-[120px] px-6 py-4 text-center"
                          : "px-6 py-4"
              }`}
            >
              <div className="flex items-center gap-2">
                <IconComponent className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                <span className="font-semibold">{tablehdItem.name}</span>
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
