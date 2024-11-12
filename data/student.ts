import { db } from "@/lib/db"; // Assuming you have a `db` instance for Prisma
import { auth } from "@/auth"; // Assuming you use a session-based auth system

export const getClassroomIdByStudentUserId = async () => {
  const session = await auth(); // Get the current authenticated user
  try {
    // Fetch the classroom ID based on the student user ID
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

    // Extract the classroomId from the student's OnClassroom entry
    const classroomId = res?.onClassroom[0]?.classroom?.id || null;

    return classroomId;
  } finally {
    await db.$disconnect();
  }
};

export const getTeacherIdByClassroomId = async (classroomId: string) => {
  try {
    // Find the teacher ID from classroom via assignment
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

    // Extract teacherId from the first related assignment entry
    const teacherId = res?.assingment[0]?.teacher?.userId || null;

    return teacherId;
  } finally {
    await db.$disconnect();
  }
};



export const getAssignmentsByClassroomId = async (classroomId: string) => {
  try {
    // Fetch assignments for the given classroomId
    const assignments = await db.assignments.findMany({
      where: {
        classId: classroomId,
      },
      include: {
        lesson: true, // Includes lesson details if needed
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
  } finally {
    await db.$disconnect();
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
  } finally {
    await db.$disconnect();
  }
};



