import { db } from "@/lib/db";

import { auth } from "@/auth";

export const getSchedulebyTeacherId = async () => {
  const session = await auth();
  try {
    const res = await db.teachers.findUnique({
      where: {
        userId: session?.user.id,
      },
      include: {
        lesson: {
          include: {
            schedule: {
              include: {
                classroom: true,
              },
            },
          },
        },
      },
    });
    return res;
  } finally {
    await db.$disconnect();
  }
};
export const getAssignmentbyTeacherId = async () => {
  const session = await auth();
  try {
    const res = await db.teachers.findUnique({
      where: {
        userId: session?.user.id,
      },
      include: {
        lesson: {
          include: {
            assingment: {
              include: {
                classroom: true,
              },
            },
          },
        },
      },
    });
    return res;
  } finally {
    await db.$disconnect();
  }
};
export const getLessonbyTeacherId = async () => {
  "use server";
  const session = await auth();
  try {
    const res = await db.lessons.findMany({
      where: {
        teacherId: session?.user.id,
      },
      select: {
        id: true,
        teacherId: true,
        name: true,
        cat: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return {
      data: res,
    };
  } finally {
    await db.$disconnect();
  }
}

// data/teacher.ts
export async function getTeacherData(userId: string) {
  try {
    const teacher = await db.teachers.findUnique({
      where: { userId },
      include: {
        lesson: {
          include: {
            schedule: {
              include: {
                classroom: true
              }
            },
            assingment: {
              where: {
                deadline: {
                  gte: new Date()
                }
              }
            }
          }
        }
      }
    });

    if (!teacher) {
      return {
        myClassrooms: 0,
        myLessons: 0,
        pendingAssignments: 0,
        todaySchedule: 0
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Calculate unique classrooms
    const uniqueClassrooms = new Set();
    let todayScheduleCount = 0;

    teacher.lesson.forEach(lesson => {
      lesson.schedule.forEach(schedule => {
        uniqueClassrooms.add(schedule.classId);
        const scheduleDate = new Date(schedule.day);
        if (scheduleDate >= today && scheduleDate < tomorrow) {
          todayScheduleCount++;
        }
      });
    });

    // Count pending assignments
    const pendingAssignments = teacher.lesson.reduce((total, lesson) => {
      return total + lesson.assingment.length;
    }, 0);

    return {
      myClassrooms: uniqueClassrooms.size,
      myLessons: teacher.lesson.length,
      pendingAssignments: pendingAssignments,
      todaySchedule: todayScheduleCount
    };
  } catch (error) {
    console.error('Error fetching teacher data:', error);
    return {
      myClassrooms: 0,
      myLessons: 0,
      pendingAssignments: 0,
      todaySchedule: 0
    };
  }
}
