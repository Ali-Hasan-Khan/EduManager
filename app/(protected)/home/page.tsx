import React from "react";
import { getTotals } from "@/data/card";
import CardDataStatsWrapper from '@/components/CardDataStatsWrapper';
import { UserIcon, BookIcon, GraduationCapIcon, ClipboardListIcon, CalendarIcon, UsersIcon } from 'lucide-react';
import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const user = await getUserById(session.user.id);
  
  if (!user) {
    redirect("/auth/login");
  }

  const { totalClassrooms, totalUsers, totalAssignments, totalLessons } = await getTotals();

  // Admin Dashboard
  if (user.role === "ADMIN") {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
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
  }

  // Teacher Dashboard
  if (user.role === "TEACHER") {
    // Get teacher-specific data
    const teacherData = await getTeacherData(user.id);
    
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Teacher Dashboard
        </h1>
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
      </div>
    );
  }

  // Student Dashboard
  if (user.role === "STUDENT") {
    // Get student-specific data
    const studentData = await getStudentData(user.id);
    
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Student Dashboard
        </h1>
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
      </div>
    );
  }

  // Unknown role fallback
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-400">
          Please contact admin to set up your role
        </h2>
      </div>
    </div>
  );
};

// Helper functions to get role-specific data
async function getTeacherData(userId: string) {
  // Add your teacher-specific data fetching logic
  return {
    myClassrooms: 3,
    myLessons: 12,
    pendingAssignments: 8,
    todaySchedule: 4
  };
}

async function getStudentData(userId: string) {
  // Add your student-specific data fetching logic
  return {
    myClassrooms: 5,
    pendingAssignments: 3,
    todayClasses: 2,
    completedAssignments: 15
  };
}

export default Home;
