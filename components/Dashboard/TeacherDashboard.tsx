// components/Dashboard/TeacherDashboard.tsx
import React from "react";
import CardDataStatsWrapper from '@/components/CardDataStatsWrapper';
import { BookIcon, ClipboardListIcon, CalendarIcon, UsersIcon } from 'lucide-react';
import { getTeacherData } from '@/data/teacher';

interface TeacherDashboardProps {
  userId: string;
}

const TeacherDashboard = async ({ userId }: TeacherDashboardProps) => {
  const teacherData = await getTeacherData(userId);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CardDataStatsWrapper
        title="My Classes"
        total={teacherData.myClassrooms.toString()}
        rate="Active"
        levelUp
        variant="primary"
      >
        <UsersIcon className="h-6 w-6" />
      </CardDataStatsWrapper>
      
      <CardDataStatsWrapper
        title="My Lessons"
        total={teacherData.myLessons.toString()}
        rate="This week"
        levelUp
        variant="secondary"
      >
        <BookIcon className="h-6 w-6" />
      </CardDataStatsWrapper>
      
      <CardDataStatsWrapper
        title="Pending Assignments"
        total={teacherData.pendingAssignments.toString()}
        rate="To review"
        levelUp
        variant="warning"
      >
        <ClipboardListIcon className="h-6 w-6" />
      </CardDataStatsWrapper>
      
      <CardDataStatsWrapper
        title="Today's Schedule"
        total={teacherData.todaySchedule.toString()}
        rate="Classes today"
        levelUp
        variant="success"
      >
        <CalendarIcon className="h-6 w-6" />
      </CardDataStatsWrapper>
    </div>
  );
};

export default TeacherDashboard;