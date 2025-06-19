import { Suspense } from 'react';
import DarkModeSwitcher from './DarkModeSwitcher';

const DarkModeSwitcherWrapper = () => {
  return (
    <Suspense
      fallback={
        <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-200 dark:bg-meta-4" />
      }
    >
      <DarkModeSwitcher />
    </Suspense>
  );
};

export default DarkModeSwitcherWrapper; 