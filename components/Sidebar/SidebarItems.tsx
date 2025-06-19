"use client";
import { SideNavItem } from "@/types/sidebar";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSideBarToggle } from "@/hooks/sidebar-toggle";
import { useCurrentRole } from "@/hooks/use-current-role";
import { ChevronDown, ChevronRight } from "lucide-react";

export const SidebarItems = ({ item }: { item: SideNavItem }) => {
  const { toggleCollapse } = useSideBarToggle();
  const role = useCurrentRole();
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  // Check if current path matches item or any submenu item
  const isActive = pathname === item.path || 
    item.subMenuItems?.some(subItem => pathname === subItem.path);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  // Check role permissions
  if (!role || !item.allowedRole.includes(role)) {
    return null;
  }

  if (item.submenu) {
    return (
      <div className="space-y-1">
        {/* Main menu item with submenu */}
        <button
          onClick={toggleSubMenu}
          className={`group relative flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
            isActive
              ? "bg-gray-2 text-primary dark:bg-meta-4 dark:text-primary"
              : "text-black hover:bg-gray-2 hover:text-primary dark:text-bodydark dark:hover:bg-meta-4 dark:hover:text-white"
          } ${toggleCollapse ? "justify-center" : "justify-between"}`}
        >
          <div className="flex items-center space-x-3">
            <div className={`flex-shrink-0 ${isActive ? "text-primary" : ""}`}>
              {item.icon}
            </div>
            {!toggleCollapse && (
              <span className="truncate">{item.title}</span>
            )}
          </div>
          {!toggleCollapse && (
            <div className={`transition-transform duration-200 ${subMenuOpen ? "rotate-90" : ""}`}>
              <ChevronRight size={16} />
            </div>
          )}
        </button>

        {/* Submenu items */}
        {subMenuOpen && !toggleCollapse && (
          <div className="ml-6 space-y-1 border-l border-stroke pl-4 dark:border-strokedark">
            {item.subMenuItems?.map((subItem, idx) => (
              <Link
                key={idx}
                href={subItem.path}
                className={`group flex items-center rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                  pathname === subItem.path
                    ? "bg-gray-2 text-primary dark:bg-meta-4 dark:text-primary"
                    : "text-body hover:bg-gray-2 hover:text-black dark:text-bodydark2 dark:hover:bg-meta-4 dark:hover:text-white"
                }`}
              >
                <div className={`mr-3 flex-shrink-0 ${pathname === subItem.path ? "text-primary" : ""}`}>
                  {subItem.icon}
                </div>
                <span className="truncate">{subItem.title}</span>
              </Link>
            ))}
          </div>
        )}

        {/* Tooltip for collapsed state */}
        {toggleCollapse && (
          <div className="absolute left-16 z-50 ml-2 hidden group-hover:block">
            <div className="rounded-lg bg-black px-3 py-2 text-sm text-white shadow-lg dark:bg-white dark:text-black">
              {item.title}
              <div className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-black dark:bg-white"></div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Regular menu item (no submenu)
  return (
    <div className="relative">
      <Link
        href={item.path}
        className={`group flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
          pathname === item.path
            ? "bg-gray-2 text-primary shadow-sm dark:bg-meta-4 dark:text-primary"
            : "text-black hover:bg-gray-2 hover:text-primary dark:text-bodydark dark:hover:bg-meta-4 dark:hover:text-white"
        } ${toggleCollapse ? "justify-center" : ""}`}
      >
        <div className={`flex-shrink-0 ${pathname === item.path ? "text-primary" : ""}`}>
          {item.icon}
        </div>
        {!toggleCollapse && (
          <span className="ml-3 truncate">{item.title}</span>
        )}
        
        {/* Active indicator */}
        {pathname === item.path && (
          <div className="absolute right-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-l-full bg-primary"></div>
        )}
      </Link>

      {/* Tooltip for collapsed state */}
      {toggleCollapse && (
        <div className="absolute left-16 z-50 ml-2 hidden group-hover:block">
          <div className="rounded-lg bg-black px-3 py-2 text-sm text-white shadow-lg dark:bg-white dark:text-black">
            {item.title}
            <div className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 bg-black dark:bg-white"></div>
          </div>
        </div>
      )}
    </div>
  );
};
