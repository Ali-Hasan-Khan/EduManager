import React from "react";
import Dashboard from "@/components/Dashboard/Dashboard";
import { getTotals } from "@/data/card";
import CardDataStatsWrapper from '@/components/CardDataStatsWrapper';
import { UserIcon } from 'lucide-react';

const Home = async () => {
  const totalDataCard = await getTotals();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <CardDataStatsWrapper
        title="Total Students"
        total="2,345"
        rate="+23.45%"
        levelUp
        variant="primary"
      >
        <UserIcon className="h-6 w-6" />
      </CardDataStatsWrapper>
      {/* ... other cards */}
    </div>
  );
};

export default Home;
