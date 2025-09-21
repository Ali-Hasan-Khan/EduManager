import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Lessons, LessonCategory } from "@prisma/client";
import { z } from "zod";
const LessonSchema = z.object({
  teacher: z.string().min(4, { message: "Select teacher" }),
  name: z.string().min(3, { message: "Lesson Name Min 3 Character" }),
  cat: z.enum(
    [
      LessonCategory.ART,
      LessonCategory.LANGUANGES,
      LessonCategory.SCIENCE,
      LessonCategory.SPORT,
    ],
    {
      errorMap: () => ({ message: "Select Category" }),
    }
  ),
});

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const body: Lessons = await request.json();
    const validatedData = LessonSchema.parse(body);
    const Editlesson = await db.lessons.update({
      where: {
        id: String(params.id),
      },
      data: {
        name: validatedData.name,
        cat: validatedData.cat as LessonCategory,
        teacherId: validatedData.teacher,
      },
    });
    return NextResponse.json(Editlesson, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map((err) => err.message).join(", ");
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 505 }
      );
    }
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const lesson = await db.lessons.delete({
    where: {
      id: String(params.id),
    },
  });

  return NextResponse.json(lesson, { status: 200 });
};
