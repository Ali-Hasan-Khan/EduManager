import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { AttendanceStatus } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { scheduleId, classId, lessonId, date, attendance } = await request.json();

    if (!scheduleId || !classId || !lessonId || !date || !attendance) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Convert attendance object to array of records
    const attendanceRecords = Object.entries(attendance).map(([studentId, status]) => {
      // Convert string status to enum
      const attendanceStatus: AttendanceStatus = status === 'present' 
        ? AttendanceStatus.PRESENT 
        : AttendanceStatus.ABSENT;

      return {
        studentId,
        scheduleId,
        classId,
        lessonId,
        date: new Date(date),
        status: attendanceStatus, // Now properly typed as AttendanceStatus
        markedBy: session.user.id!, // Add ! to assert it's not undefined
        markedAt: new Date()
      };
    });

    // Save attendance records 
    const result = await db.attendance.createMany({
      data: attendanceRecords,
      skipDuplicates: true // In case attendance already exists
    });

    return NextResponse.json({ 
      message: "Attendance saved successfully",
      count: result.count 
    });
    
  } catch (error) {
    console.error("Error saving attendance:", error);
    return NextResponse.json(
      { error: "Failed to save attendance" }, 
      { status: 500 }
    );
  }
}