import { db } from "@/lib/db";

export async function checkAttendanceTaken(scheduleId: string, date: string) {
  try {
    const attendance = await db.attendance.findFirst({
      where: {
        scheduleId,
        date: new Date(date)
      }
    });
    
    return !!attendance; // Returns true if attendance exists, false otherwise
  } catch (error) {
    console.error("Error checking attendance:", error);
    return false;
  }
}

export async function getAttendanceStatusForSchedules(teacherId: string) {
  try {
    // Get attendance records with minimal data needed
    const attendanceRecords = await db.attendance.findMany({
      where: {
        schedule: {
          lesson: {
            teacherId: teacherId
          }
        }
      },
      select: {
        scheduleId: true,
        date: true
      }
    });

    // Create a map of scheduleId + date -> attendance taken
    const attendanceMap = new Map();
    attendanceRecords.forEach(record => {
      const key = `${record.scheduleId}-${record.date.toISOString().split('T')[0]}`;
      attendanceMap.set(key, true);
    });

    return attendanceMap;
  } catch (error) {
    console.error("Error getting attendance status:", error);
    return new Map();
  }
}