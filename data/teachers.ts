import { db } from "@/lib/db";

export const fetchTeachers = async ({ take = 5, skip = 0, query }: { take: number; skip: number; query?: string }) => {
  "use server";
  try {
    const results = await db.teachers.findMany({
      where: {
        name: { contains: query, mode: "insensitive" },
      },
      relationLoadStrategy: "join",
      skip,
      take,
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
      orderBy: {
        name: "asc",
      },
    });

    const total = await db.teachers.count({
      where: {
        name: { contains: query, mode: "insensitive" },
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
