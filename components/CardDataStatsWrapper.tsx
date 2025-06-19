import { Suspense } from 'react';
import CardDataStats from './CardDataStats';
import type { ReactNode } from 'react';

interface CardDataStatsWrapperProps {
  title: string;
  total: string;
  rate?: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
  loading?: boolean;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

const CardDataStatsWrapper = (props: CardDataStatsWrapperProps) => {
  return (
    <Suspense
      fallback={
        <div className="rounded-xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark animate-pulse">
          <div className="h-20 w-full" />
        </div>
      }
    >
      <CardDataStats {...props} />
    </Suspense>
  );
};

export default CardDataStatsWrapper; 