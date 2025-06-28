import { db } from "@/lib/db";

export const fetchAssignment = async ({ take = 5, skip = 0, query }: { take: number, skip: number, query: string }) => {
  "use server";
  try {
    const results = await db.assignments.findMany({
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
        deadline: true,
        createBy: true,
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
        teacher: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        task: "asc",
      },
    });

    const total = await db.assignments.count({
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

export const getTeacherByTeacherId = async ({
  userId,
}: {
  userId?: string;
}) => {
  const teacher = await db.lessons.findMany({
    where: {
      teacherId: userId,
    },
    select: {
      id: true,
      teacher: {
        select: {
          name: true,
        },
      },
    },
  });

  return teacher;
};
