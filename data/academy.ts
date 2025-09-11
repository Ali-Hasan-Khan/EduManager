import { db } from "@/lib/db";

export const getAllClassrooms = async () => {
  try {
    const res = await db.classrooms.findMany({
      select: {
        id: true,
        name: true,
        cap: true,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching classroom data:", error);
    throw new Error("Could not fetch classroom data");
  }
};

export const getAllTeachers = async () => {
  try {
    const res = await db.teachers.findMany({
      select: {
        id: true,
        name: true,
        userId: true,
        user: {
          select: {
            email: true,
            gender: true,
            status: true,
          },
        },
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching teachers: ", error);
    return [];
  }
};

export const getAllStudents = async () => {
  try {
    const res = await db.students.findMany({
      relationLoadStrategy: "join",
      select: {
        id: true,
        userId: true,
        name: true,
        onClassroom: {
          include: {
            classroom: {
              select: {
                name: true,
              },
            },
          },
        },
        user: {
          select: {
            email: true,
            status: true,
          },
        },
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

export const getAllLessons = async () => {
  try {
    const res = await db.lessons.findMany({
      relationLoadStrategy: "join",
      select: {
        id: true,
        name: true,
        teacherId: true,
        cat: true,
        teacher: {
          select: {
            name: true,
          },
        },
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }
};

export const getAllSchedules = async () => {
  try {
    const res = await db.schedule.findMany({
      relationLoadStrategy: "join",
      select: {
        id: true,
        day: true,
        time: true,
        lessonId: true,
        classId: true,
        lesson: {
          select: {
            name: true,
            teacher: {
              select: {
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
    });
    return res;
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return [];
  }
};

export const getAllAssignmets = async () => {
  try {
    const res = await db.assignments.findMany({
      relationLoadStrategy: "join",
      select: {
        id: true,
        deadline: true,
        time: true,
        task: true,
        lessonId: true,
        classId: true,
        fileUrl: true,
        lesson: {
          select: {
            name: true,
          },
        },
        classroom: {
          select: {
            name: true,
          },
        },
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return [];
  }
};

export const getClassroomsByStudentId = async (studentId: string) => {
  try {
    const classrooms = await db.onClassroom.findMany({
      where: {
        userId: studentId,
      },
      select: {
        classroom: {
          select: {
            id: true,
            name: true,
            cap: true,
          },
        },
      },
    });

    // Flatten the response to return an array of classrooms
    return classrooms.map((entry) => entry.classroom);
  } catch (error) {
    console.error("Error fetching classrooms by student ID:", error);
    return [];
  }
};

