import { db } from "@/lib/db";
import { auth } from "@/auth";

export const getClassroomIdByStudentUserId = async () => {
  const session = await auth();
  
  try {
    const res = await db.students.findUnique({
      where: {
        userId: session?.user.id,
      },
      include: {
        onClassroom: {
          include: {
            classroom: true,
          },
        },
      },
    });

    const classroomId = res?.onClassroom[0]?.classroom?.id || null;
    return classroomId;
  } catch (error) {
    console.error("Error fetching classroom ID:", error);
    return null;
  }
};

export const getTeacherIdByClassroomId = async (classroomId: string) => {
  try {
    const res = await db.classrooms.findUnique({
      where: {
        id: classroomId,
      },
      include: {
        assingment: {
          include: {
            teacher: true,
          },
        },
      },
    });

    const teacherId = res?.assingment[0]?.teacher?.userId || null;
    return teacherId;
  } catch (error) {
    console.error("Error fetching teacher ID:", error);
    return null;
  }
};

export const getAssignmentsByClassroomId = async (classroomId: string) => {
  try {
    const assignments = await db.assignments.findMany({
      where: {
        classId: classroomId,
      },
      include: {
        lesson: true,
        teacher: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return assignments;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return [];
  }
};

export const getTeacherNameById = async (teacherId: string) => {
  try {
    const teacher = await db.teachers.findUnique({
      where: {
        userId: teacherId,
      },
      select: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return teacher?.user?.name ?? null;
  } catch (error) {
    console.error("Error fetching teacher name:", error);
    return null;
  }
};

export const getStudentsByClassId = async (classId: string) => {
  try {
    const students = await db.onClassroom.findMany({
      where: {
        classroomId: classId,
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
    });

    return students;
  } catch (error) {
    console.error("Error fetching students by class ID:", error);
    return [];
  }
};

export async function getStudentData(userId: string) {
  try {
    const student = await db.students.findUnique({
      where: { userId },
      include: {
        onClassroom: {
          include: {
            classroom: {
              include: {
                schedule: true,
                assingment: true,
              },
            },
          },
        },
      },
    });

    if (!student) {
      return {
        myClassrooms: 0,
        pendingAssignments: 0,
        todayClasses: 0,
        completedAssignments: 0,
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let todayClassesCount = 0;
    let pendingAssignments = 0;

    student.onClassroom.forEach((enrollment) => {
      enrollment.classroom.schedule.forEach((schedule) => {
        const scheduleDate = new Date(schedule.day);
        if (scheduleDate >= today && scheduleDate < tomorrow) {
          todayClassesCount++;
        }
      });

      enrollment.classroom.assingment.forEach((assignment) => {
        if (new Date(assignment.deadline) > new Date()) {
          pendingAssignments++;
        }
      });
    });

    return {
      myClassrooms: student.onClassroom.length,
      pendingAssignments,
      todayClasses: todayClassesCount,
      completedAssignments: 15,
    };
  } catch (error) {
    console.error("Error fetching student data:", error);
    return {
      myClassrooms: 0,
      pendingAssignments: 0,
      todayClasses: 0,
      completedAssignments: 0,
    };
  }
}


