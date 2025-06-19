"use client";

import useColorMode from "@/hooks/useColorMode";
import { Sun, Moon } from "lucide-react";

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <button
      onClick={() => {
        if (typeof setColorMode === "function") {
          setColorMode(colorMode === "light" ? "dark" : "light");
        }
      }}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg text-body hover:bg-gray-2 hover:text-black dark:text-bodydark2 dark:hover:bg-meta-4 dark:hover:text-white"
      aria-label={colorMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Sun icon */}
      <Sun 
        className={`h-5 w-5 transition-all duration-200 ${
          colorMode === "dark" 
            ? "rotate-0 scale-100" 
            : "absolute rotate-90 scale-0"
        }`}
      />
      
      {/* Moon icon */}
      <Moon 
        className={`h-5 w-5 transition-all duration-200 ${
          colorMode === "dark"
            ? "absolute rotate-90 scale-0"
            : "rotate-0 scale-100"
        }`}
      />
    </button>
  );
};

export default DarkModeSwitcher;
