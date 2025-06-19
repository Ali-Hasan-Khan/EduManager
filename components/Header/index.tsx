import Link from "next/link";
import DarkModeSwitcherWrapper from "./DarkModeSwitcherWrapper";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { Menu } from "lucide-react";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between bg-white px-4 py-3 shadow-sm dark:bg-boxdark dark:shadow-none lg:px-6">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.setSidebarOpen(!props.sidebarOpen);
          }}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-body hover:bg-gray-2 hover:text-black dark:text-bodydark2 dark:hover:bg-meta-4 dark:hover:text-white lg:hidden"
          aria-label="Toggle Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Mobile logo */}
        <Link href="/" className="flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Image
              width={20}
              height={20}
              src={"./school-management-logo.svg"}
              alt="Logo"
              className="text-white"
            />
          </div>
          <span className="text-lg font-semibold text-black dark:text-white">
            EduManager
          </span>
        </Link>

        {/* Search bar - hidden on mobile */}
        <div className="hidden lg:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 rounded-lg border border-stroke bg-transparent px-4 py-2 text-sm outline-none transition-all duration-200 focus:border-primary focus:shadow-input dark:border-strokedark dark:focus:border-primary"
            />
            <svg
              className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body dark:text-bodydark2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <DarkModeSwitcherWrapper />
        <DropdownUser />
      </div>
    </header>
  );
};

export default Header;
