import React from "react";
import { getTotals } from "@/data/card";
import CardDataStatsWrapper from '@/components/CardDataStatsWrapper';
import { UserIcon, BookIcon, UsersIcon, ClipboardListIcon } from 'lucide-react';

const AdminDashboard = async () => {
  const { totalClassrooms, totalUsers, totalAssignments, totalLessons } = await getTotals();

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CardDataStatsWrapper
            title="Total Users"
            total={totalUsers.toString()}
            rate="+23.45%"
            levelUp
            variant="primary"
          >
            <UserIcon className="h-6 w-6" />
          </CardDataStatsWrapper>
          <CardDataStatsWrapper
            title="Total Classrooms"
            total={totalClassrooms.toString()}
            rate="+5.45%"
            levelUp
            variant="secondary"
          >
            <UsersIcon className="h-6 w-6" />
          </CardDataStatsWrapper>
          <CardDataStatsWrapper
            title="Total Lessons"
            total={totalLessons.toString()}
            rate="-2.45%"
            levelDown
            variant="success"
          >
            <BookIcon className="h-6 w-6" />
          </CardDataStatsWrapper>
          <CardDataStatsWrapper
            title="Total Assignments"
            total={totalAssignments.toString()}
            rate="+8.45%"
            levelUp
            variant="warning"
          >
            <ClipboardListIcon className="h-6 w-6" />
          </CardDataStatsWrapper>
        </div>
      </div>
    );
};

export default AdminDashboard;