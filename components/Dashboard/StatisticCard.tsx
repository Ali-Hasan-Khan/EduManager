import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatisticCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isUpward: boolean;
  };
  className?: string;
}

export const StatisticCard = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
}: StatisticCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark",
        className
      )}
    >
      <div className="flex justify-between">
        <div>
          <span className="text-sm font-medium text-body dark:text-bodydark2">
            {title}
          </span>
          <h4 className="mt-2 text-2xl font-bold text-black dark:text-white">
            {value}
          </h4>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
          {icon}
        </div>
      </div>

      {(description || trend) && (
        <div className="mt-4 flex items-center justify-between">
          {description && (
            <p className="text-sm text-body dark:text-bodydark2">
              {description}
            </p>
          )}
          {trend && (
            <div
              className={cn(
                "flex items-center gap-1 text-sm font-medium",
                trend.isUpward ? "text-meta-3" : "text-meta-1"
              )}
            >
              {trend.isUpward ? "+" : "-"}{trend.value}%
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    trend.isUpward
                      ? "M7 11l5-5 5 5M7 17l5-5 5 5"
                      : "M7 7l5 5 5-5M7 13l5 5 5-5"
                  }
                />
              </svg>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}; 