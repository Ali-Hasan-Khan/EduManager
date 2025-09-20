import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function checkAttendanceTaken(scheduleId: string, date: string) {
  try {
    const attendance = await db.attendance.findFirst({
      where: {
        scheduleId,
        date: new Date(date),
      },
    });

    return !!attendance; // Returns true if attendance exists, false otherwise
  } catch (error) {
    console.error("Error checking attendance:", error);
    return false;
  }
}

// ...existing functions...

export async function getAttendanceByScheduleAndDate(
  scheduleId: string,
  date: string
) {
  try {
    const attendance = await db.attendance.findMany({
      where: {
        scheduleId,
        date: new Date(date),
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: {
        student: {
          user: {
            name: "asc",
          },
        },
      },
    });

    return attendance;
  } catch (error) {
    console.error("Error getting attendance by schedule and date:", error);
    return [];
  }
}

export async function getAttendanceStatusForSchedules(teacherId: string) {
  try {
    // Get attendance records with minimal data needed
    const attendanceRecords = await db.attendance.findMany({
      where: {
        lesson: {
          teacherId: teacherId,
        },
      },
      select: {
        scheduleId: true,
        date: true,
      },
    });

    // Create a map of scheduleId + date -> attendance taken
    const attendanceMap = new Map();
    attendanceRecords.forEach((record) => {
      const key = `${record.scheduleId}-${record.date.toISOString().split("T")[0]}`;
      attendanceMap.set(key, true);
    });

    return attendanceMap;
  } catch (error) {
    console.error("Error getting attendance status:", error);
    return new Map();
  }
}

export async function getAttendanceByStudentId() {
  const session = await auth();
  if (!session?.user?.id) {
    console.error("No authenticated user found");
    return null;
  }
  try {
    const student = await db.students.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!student) {
      console.error("Student record not found");
      return null;
    }

    const attendanceRecords = await db.attendance.findMany({
      where: {
        studentId: student.id,
      },
      include: {
        schedule: {
          include: {
            lesson: {
              include: {
                teacher: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            classroom: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });
    return attendanceRecords;
  } catch (error) {
    console.error("Error getting attendance for student:", error);
    return;
  }
}
