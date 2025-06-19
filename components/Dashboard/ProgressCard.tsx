import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressCardProps {
  title: string;
  progress: number;
  total: number;
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const ProgressCard = ({
  title,
  progress,
  total,
  icon,
  variant = 'primary',
  className,
}: ProgressCardProps) => {
  const percentage = Math.round((progress / total) * 100);

  const variantStyles = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-meta-3',
    warning: 'text-meta-6',
    danger: 'text-meta-1',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium text-body dark:text-bodydark2">
            {title}
          </span>
          <div className="mt-2 flex items-end gap-2">
            <h4 className="text-2xl font-bold text-black dark:text-white">
              {progress}
            </h4>
            <span className="text-sm text-body dark:text-bodydark2">
              / {total}
            </span>
          </div>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm font-medium">
          <span className={variantStyles[variant]}>{percentage}%</span>
          <span className="text-body dark:text-bodydark2">Progress</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-stroke dark:bg-strokedark">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "h-full rounded-full",
              variant === 'primary' && "bg-primary",
              variant === 'secondary' && "bg-secondary",
              variant === 'success' && "bg-meta-3",
              variant === 'warning' && "bg-meta-6",
              variant === 'danger' && "bg-meta-1"
            )}
          />
        </div>
      </div>
    </motion.div>
  );
}; 