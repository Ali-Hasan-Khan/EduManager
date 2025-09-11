import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getTotals = unstable_cache(
  async () => {
    try {
      const [totalClassrooms, totalUsers, totalLessons, totalAssignments] =
        await Promise.all([
          db.classrooms.count(),
          db.user.count(),
          db.lessons.count(),
          db.assignments.count(),
        ]);

      return {
        totalClassrooms,
        totalUsers,
        totalLessons,
        totalAssignments,
      };
    } catch (error) {
      console.error("Error fetching totals:", error);
      return {
        totalClassrooms: 0,
        totalUsers: 0,
        totalLessons: 0,
        totalAssignments: 0,
      };
    }
  },
  ["dashboard-totals"], // cache key
  {
    revalidate: 300, // revalidate every 5 minutes
    tags: ["dashboard-stats"],
  }
);
