"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardDataStatsProps {
  title: string;
  total: string;
  rate?: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
  loading?: boolean;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
  loading = false,
  variant = 'default'
}) => {
  const variants = {
    default: 'bg-white dark:bg-boxdark',
    primary: 'bg-primary/10 dark:bg-primary/20',
    secondary: 'bg-secondary/10 dark:bg-secondary/20',
    success: 'bg-meta-3/10 dark:bg-meta-3/20',
    warning: 'bg-meta-6/10 dark:bg-meta-6/20',
    danger: 'bg-meta-1/10 dark:bg-meta-1/20',
  };

  const iconVariants = {
    default: 'bg-gray-2 dark:bg-meta-4',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    success: 'bg-meta-3 text-white',
    warning: 'bg-meta-6 text-white',
    danger: 'bg-meta-1 text-white',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={cn(
        "relative rounded-xl border border-stroke bg-white p-6 shadow-default transition-all duration-300 hover:shadow-md dark:border-strokedark",
        variants[variant],
        loading && "animate-pulse"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-200",
            iconVariants[variant]
          )}>
            {children}
          </div>
          <div className="ml-4">
            <h4 className="text-xl font-bold text-black dark:text-white">
              {loading ? (
                <div className="h-6 w-24 animate-pulse rounded bg-stroke dark:bg-strokedark" />
              ) : (
                total
              )}
            </h4>
            <p className="mt-1 text-sm font-medium text-body dark:text-bodydark2">
              {loading ? (
                <div className="h-4 w-32 animate-pulse rounded bg-stroke dark:bg-strokedark" />
              ) : (
                title
              )}
            </p>
          </div>
        </div>

        {rate && (
          <div className={cn(
            "flex items-center rounded-full px-3 py-1 text-sm font-medium",
            levelUp && "bg-meta-3/10 text-meta-3 dark:bg-meta-3/20",
            levelDown && "bg-meta-1/10 text-meta-1 dark:bg-meta-1/20"
          )}>
            {levelUp && (
              <svg
                className="mr-1 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {levelDown && (
              <svg
                className="mr-1 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {rate}
          </div>
        )}
      </div>

      {/* Optional bottom section for additional info */}
      <div className="mt-4 flex items-center justify-between border-t border-stroke pt-4 dark:border-strokedark">
        <div className="flex items-center">
          <div className="flex h-2 w-2 rounded-full bg-meta-3" />
          <span className="ml-2 text-xs font-medium text-body dark:text-bodydark2">
            Active now
          </span>
        </div>
        <button className="text-xs font-medium text-primary hover:underline">
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default CardDataStats;
