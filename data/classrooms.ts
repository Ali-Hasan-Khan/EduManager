import { db } from "@/lib/db";

export const fetchClassrooms = async ({ take = 5, skip = 0 }) => {
  "use server";
  try {
    const results = await db.classrooms.findMany({
      relationLoadStrategy: "join",
      skip,
      take,
      select: {
        id: true,
        name: true,
        cap: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    const total = await db.classrooms.count();

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

export const getTotalUsersInClassroom = async ({
  classroomId,
}: {
  classroomId?: string;
}) => {
  const totalStudent = await db.onClassroom.count({
    where: {
      classroomId: classroomId,
    },
  });

  return totalStudent;
};


export const getClassroomById = async (classroomId: string) => {
  try {
    const classroom = await db.classrooms.findUnique({
      where: { id: classroomId },
      select: {
        id: true,
        name: true,
        cap: true,
        studentOnclassroom: {
          select: {
            student: {
              select: {
                user: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return classroom;
  } catch (error) {
    console.error("Error fetching classroom data:", error);
    throw new Error("Could not fetch classroom data");
  } finally {
    await db.$disconnect();
  }
};
