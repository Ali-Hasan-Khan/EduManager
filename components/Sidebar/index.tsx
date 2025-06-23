"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SIDEBAR_ITEMS } from "@/constants/index";
import { useSideBarToggle } from "@/hooks/sidebar-toggle";
import SideBarMenuGroup from "./SidebarGroup";
import { Menu, PanelRightOpen, PanelRightClose } from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const { toggleCollapse, invokeToggleCollapse } = useSideBarToggle();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-25 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        ref={sidebar}
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col overflow-visible bg-white border-r border-stroke shadow-lg transition-all duration-300 ease-in-out dark:bg-boxdark dark:border-strokedark lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${toggleCollapse ? "w-20" : "w-72"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stroke px-5 py-4 dark:border-strokedark">
          <Link href="/" className={`flex items-center space-x-3 ${toggleCollapse ? "justify-center" : ""}`}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Image
                width={24}
                height={24}
                src="/school-management-logo.svg"
                alt="Logo"
                priority
                className="text-white"
              />
            </div>
            {!toggleCollapse && (
              <div className="flex flex-col">
                <span className="text-xl font-bold text-black dark:text-white">
                  EduManager
                </span>
                <span className="text-xs text-body dark:text-bodydark2">
                  Education Platform
                </span>
              </div>
            )}
          </Link>

          {/* Toggle buttons */}
          <div className="flex items-center space-x-2">
            {/* Collapse toggle for desktop */}
            <button
              onClick={invokeToggleCollapse}
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg text-body hover:bg-gray-2 hover:text-black dark:text-bodydark2 dark:hover:bg-meta-4 dark:hover:text-white transition-colors duration-200"
              title={toggleCollapse ? "Expand sidebar" : "Collapse sidebar"}
            >
              <PanelRightOpen 
                size={16} 
                className={`transition-transform duration-200 ${toggleCollapse ? "rotate-180" : ""}`}
              />
            </button>

            {/* Close button for mobile */}
            <button
              ref={trigger}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-body hover:bg-gray-2 hover:text-black dark:text-bodydark2 dark:hover:bg-meta-4 dark:hover:text-white transition-colors duration-200 lg:hidden"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-4">
          {SIDEBAR_ITEMS.map((item, idx) => (
            <SideBarMenuGroup key={idx} menuGroup={item} />
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
