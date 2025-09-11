import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export const POST = async (request: Request) => {
  const body = await request.json();

  const existingOnClassroom = await db.onClassroom.findFirst({
    where: {
      userId: body.studentId,
    },
  });

  if (existingOnClassroom) {
    return NextResponse.json({ message: 'Student is already in a classroom' }, { status: 400 });
  }

  const duplicate = await db.onClassroom.findFirst({
    where: {
      userId: body.studentId,
      classroomId: body.classroomId,
    },
  });

  if (duplicate) {
    await db.$disconnect();
    return NextResponse.json({ message: 'Duplicate Data' }, { status: 400 });
  }

  try {
    const newClassroom = await db.onClassroom.create({
      data: {
        userId: body.studentId,
        classroomId: body.classroomId,
      },
    });

    return NextResponse.json(newClassroom, { status: 201 });
  } catch (error: any) {
    let errorMessage = "An error occurred";
    if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
};
