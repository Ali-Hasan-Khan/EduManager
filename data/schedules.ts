import { db } from "@/lib/db";

export const fetchSchedules = async ({ take = 5, skip = 0, query }: { take: number, skip: number, query: string }) => {
  "use server";
  try {
    const results = await db.schedule.findMany({
      relationLoadStrategy: "join",
      skip,
      take,
      where: {
        OR: [
          { lesson: { name: { contains: query, mode: "insensitive" } } },
          { classroom: { name: { contains: query, mode: "insensitive" } } },
          { lesson: { teacher: { name: { contains: query, mode: "insensitive" } } } },
        ],
      },
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
      orderBy: {
        day: "asc",
      },
    });

    const total = await db.schedule.count({
      where: {
        OR: [
          { lesson: { name: { contains: query, mode: "insensitive" } } },
          { classroom: { name: { contains: query, mode: "insensitive" } } },
          { lesson: { teacher: { name: { contains: query, mode: "insensitive" } } } },
        ],
      },
    });

    return {
      data: results,
      metadata: {
        hasNextPage: skip + take < total,
        totalPages: Math.ceil(total / take),
      },
    };
  } finally {
    await db.$disconnect();
  }
};



export const getScheduleByClassId = async (classId: string) => {
  try {
    const schedules = await db.schedule.findMany({
      where: {
        classId: classId, // Filtering by classId
      },
      select: {
        id: true,
        lessonId: true,
        classId: true,
        day: true,
        time: true,
        classroom: {
          select: {
            name: true, // Classroom name
          },
        },
        lesson: {
          select: {
            name: true, // Lesson name
            teacher: {
              select: {
                id: true, // Teacher id
                name: true, // Teacher name
              },
            },
          },
        },
      },
    });

    return schedules;
  } catch (error) {
    console.error("Error fetching schedules: ", error);
    return [];
  } finally {
    await db.$disconnect();
  }
};


