import { db } from "@/lib/db";

export const fetchLessons = async ({ take = 5, skip = 0, query }: { take?: number; skip?: number; query?: string }) => {
  "use server";
  try {
    const results = await db.lessons.findMany({
      relationLoadStrategy: "join",
      skip,
      take,
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
      orderBy: {
        name: "asc",
      },
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    const total = await db.lessons.count({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
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
