import React, { Suspense } from "react";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";
import DashboardSkeleton from "./DashboardSkeleton";

const Dashboard = async () => {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const user = await getUserById(session.user.id);
  
  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {user.role === "ADMIN" && "Admin Dashboard"}
        {user.role === "TEACHER" && "Teacher Dashboard"}
        {user.role === "STUDENT" && "Student Dashboard"}
        {!["ADMIN", "TEACHER", "STUDENT"].includes(user.role) && "Dashboard"}
      </h1>

      <Suspense fallback={<DashboardSkeleton />}>
        {user.role === "ADMIN" && <AdminDashboard />}
        {user.role === "TEACHER" && <TeacherDashboard userId={user.id} />}
        {user.role === "STUDENT" && <StudentDashboard userId={user.id} />}
        {!["ADMIN", "TEACHER", "STUDENT"].includes(user.role) && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-400">
                Please contact admin to set up your role
              </h2>
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default Dashboard;
