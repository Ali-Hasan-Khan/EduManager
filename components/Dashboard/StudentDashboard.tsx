// components/Dashboard/StudentDashboard.tsx
import React from "react";
import CardDataStatsWrapper from '@/components/CardDataStatsWrapper';
import { BookIcon, ClipboardListIcon, CalendarIcon, GraduationCapIcon } from 'lucide-react';
import { getStudentData } from '@/data/student';

interface StudentDashboardProps {
  userId: string;
}

const StudentDashboard = async ({ userId }: StudentDashboardProps) => {
  const studentData = await getStudentData(userId);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <CardDataStatsWrapper
        title="My Classes"
        total={studentData.myClassrooms.toString()}
        rate="Enrolled"
        levelUp
        variant="primary"
      >
        <GraduationCapIcon className="h-6 w-6" />
      </CardDataStatsWrapper>
      
      <CardDataStatsWrapper
        title="Pending Assignments"
        total={studentData.pendingAssignments.toString()}
        rate="Due soon"
        levelUp
        variant="warning"
      >
        <ClipboardListIcon className="h-6 w-6" />
      </CardDataStatsWrapper>
      
      <CardDataStatsWrapper
        title="Today's Classes"
        total={studentData.todayClasses.toString()}
        rate="Schedule"
        levelUp
        variant="success"
      >
        <CalendarIcon className="h-6 w-6" />
      </CardDataStatsWrapper>
      
      <CardDataStatsWrapper
        title="Completed Assignments"
        total={studentData.completedAssignments.toString()}
        rate="This month"
        levelUp
        variant="secondary"
      >
        <BookIcon className="h-6 w-6" />
      </CardDataStatsWrapper>
    </div>
  );
};

export default StudentDashboard;