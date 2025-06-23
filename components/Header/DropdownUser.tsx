import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/logout-button";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";

const DropdownUser = () => {
  const user = useCurrentUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <button
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-body hover:bg-gray-2 hover:text-black dark:text-bodydark2 dark:hover:bg-meta-4 dark:hover:text-white"
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-2 dark:bg-meta-4">
            <Image
              width={32}
              height={32}
              src={"/user.svg"}
              alt="User"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="hidden text-left lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user?.name}
          </span>
            <span className="block text-xs text-body dark:text-bodydark2">
              {user?.role}
        </span>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      <div
        ref={dropdown}
        className={`absolute right-0 mt-2 w-56 origin-top-right rounded-lg border border-stroke bg-white py-2 shadow-lg dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-2">
          <p className="text-sm font-medium text-black dark:text-white">
            {user?.name}
          </p>
          <p className="text-xs text-body dark:text-bodydark2">{user?.role}</p>
        </div>

        <div className="my-2 border-t border-stroke dark:border-strokedark" />

        <div className="px-2">
            <Link
            href="/profile"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-body hover:bg-gray-2 hover:text-black dark:text-bodydark2 dark:hover:bg-meta-4 dark:hover:text-white"
          >
            <User size={16} />
            <span>My Profile</span>
            </Link>

            <Link
            href="/settings"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-body hover:bg-gray-2 hover:text-black dark:text-bodydark2 dark:hover:bg-meta-4 dark:hover:text-white"
          >
            <Settings size={16} />
            <span>Settings</span>
            </Link>
        </div>

        <div className="my-2 border-t border-stroke dark:border-strokedark" />

        <div className="px-2">
        <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default DropdownUser;
