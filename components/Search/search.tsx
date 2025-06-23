"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { usePathname } from "next/navigation";

const Search = ({ search }: { search?: string }) => {
  const router = useRouter();
  const path = usePathname();
  const initialRender = useRef(true);
  const pathname = path;
  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 750);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) {
      router.push(`${pathname}`);
    } else {
      router.push(`${pathname}?search=${query}`);
    }
  }, [query, pathname, router]);

  return (
    <div className="relative">
      <input
        type="text"
        value={text}
        placeholder="Search..."
        onChange={(e) => setText(e.target.value)}
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
  );
};

export default Search;
