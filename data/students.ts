import { db } from "@/lib/db";

export const fetchStudents = async ({ take = 5, skip = 0, query }: { take: number; skip: number; query?: string }) => {
  "use server";
  try {
    const results = await db.students.findMany({
      where: {
        name: { contains: query, mode: "insensitive" },
      },
      relationLoadStrategy: "join",
      skip,
      take,
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
      orderBy: {
        name: "asc",
      },
    });

    const total = await db.students.count({
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
  } catch (error) {
    console.error("Error fetching students: ", error);
    return {
      data: [],
      metadata: {
        hasNextPage: false,
        totalPages: 0,
      },
    };
  }
};
