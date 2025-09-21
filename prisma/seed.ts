// seed.ts
import {
  PrismaClient,
  UserRole,
  UserGender,
  UserStatus,
  LessonCategory,
} from "@prisma/client";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Starting database seeding...");

  // Hashed password for all users
  const password = await bcrypt.hash("123456", 10);
  const demoPassword = await bcrypt.hash("demo123", 10);

  // Clear existing data (optional - be careful with this in production)
  // await db.attendance.deleteMany();
  // await db.assignments.deleteMany();
  // await db.schedule.deleteMany();
  // await db.lessons.deleteMany();
  // await db.onClassroom.deleteMany();
  // await db.students.deleteMany();
  // await db.teachers.deleteMany();
  // await db.classrooms.deleteMany();
  // await db.user.deleteMany();

  // 1. Create Admin Users
  const adminUsers = [
    {
      name: "Admin User",
      email: "testuser@example.com",
      role: UserRole.ADMIN,
      gender: UserGender.MALE,
    },
    {
      name: "Demo Administrator",
      email: "demo-admin@edumanager.com",
      role: UserRole.ADMIN,
      gender: UserGender.FEMALE,
    },
    {
      name: "Sarah Wilson",
      email: "sarah.admin@school.edu",
      role: UserRole.ADMIN,
      gender: UserGender.FEMALE,
    },
  ];

  const createdAdmins = [];
  for (const admin of adminUsers) {
    const existingAdmin = await db.user.findUnique({
      where: { email: admin.email },
    });

    if (!existingAdmin) {
      const newAdmin = await db.user.create({
        data: {
          ...admin,
          emailVerified: new Date(),
          password: admin.email.includes("demo-") ? demoPassword : password,
          isTwoFactorEnabled: false,
          status: UserStatus.ACTIVE,
        },
      });
      createdAdmins.push(newAdmin);
      console.log(`Admin created: ${admin.name}`);
    } else {
      createdAdmins.push(existingAdmin);
      console.log(`Admin already exists: ${admin.name}`);
    }
  }

  // 2. Create Teacher Users
  const teacherUsers = [
    {
      name: "Demo Teacher",
      email: "demo-teacher@edumanager.com",
      gender: UserGender.MALE,
    },
    {
      name: "John Smith",
      email: "john.smith@school.edu",
      gender: UserGender.MALE,
    },
    {
      name: "Emily Johnson",
      email: "emily.johnson@school.edu",
      gender: UserGender.FEMALE,
    },
    {
      name: "Michael Brown",
      email: "michael.brown@school.edu",
      gender: UserGender.MALE,
    },
    {
      name: "Lisa Davis",
      email: "lisa.davis@school.edu",
      gender: UserGender.FEMALE,
    },
  ];

  const createdTeachers = [];
  for (const teacher of teacherUsers) {
    const existingUser = await db.user.findUnique({
      where: { email: teacher.email },
    });

    if (!existingUser) {
      const newUser = await db.user.create({
        data: {
          ...teacher,
          role: UserRole.TEACHER,
          emailVerified: new Date(),
          password: teacher.email.includes("demo-") ? demoPassword : password,
          isTwoFactorEnabled: false,
          status: UserStatus.ACTIVE,
        },
      });

      // Create teacher record - using userId for the relation
      const teacherRecord = await db.teachers.create({
        data: {
          userId: newUser.id,
          name: teacher.name,
        },
      });

      createdTeachers.push({ user: newUser, teacher: teacherRecord });
      console.log(`Teacher created: ${teacher.name}`);
    } else {
      const teacherRecord = await db.teachers.findUnique({
        where: { userId: existingUser.id },
      });
      createdTeachers.push({ user: existingUser, teacher: teacherRecord });
      console.log(`Teacher already exists: ${teacher.name}`);
    }
  }

  // 3. Create Classrooms 
  const classrooms = [
    { name: "Class A", cap: "30" },
    { name: "Class B", cap: "25" },
    { name: "Class C", cap: "28" },
    { name: "Advanced Mathematics", cap: "20" },
    { name: "Computer Science Lab", cap: "24" },
  ];

  const createdClassrooms = [];
  for (const classroom of classrooms) {
    const existing = await db.classrooms.findFirst({
      where: { name: classroom.name },
    });

    if (!existing) {
      const newClassroom = await db.classrooms.create({
        data: classroom,
      });
      createdClassrooms.push(newClassroom);
      console.log(`Classroom created: ${classroom.name}`);
    } else {
      createdClassrooms.push(existing);
      console.log(`Classroom already exists: ${classroom.name}`);
    }
  }

  // 4. Create Student Users
  const studentUsers = [
    {
      name: "Demo Student",
      email: "demo-student@edumanager.com",
      gender: UserGender.MALE,
    },
    {
      name: "Alice Cooper",
      email: "alice.cooper@student.edu",
      gender: UserGender.FEMALE,
    },
    {
      name: "Bob Johnson",
      email: "bob.johnson@student.edu",
      gender: UserGender.MALE,
    },
    {
      name: "Carol Smith",
      email: "carol.smith@student.edu",
      gender: UserGender.FEMALE,
    },
    {
      name: "David Lee",
      email: "david.lee@student.edu",
      gender: UserGender.MALE,
    },
    {
      name: "Emma Wilson",
      email: "emma.wilson@student.edu",
      gender: UserGender.FEMALE,
    },
    {
      name: "Frank Miller",
      email: "frank.miller@student.edu",
      gender: UserGender.MALE,
    },
    {
      name: "Grace Taylor",
      email: "grace.taylor@student.edu",
      gender: UserGender.FEMALE,
    },
    {
      name: "Henry Davis",
      email: "henry.davis@student.edu",
      gender: UserGender.MALE,
    },
    {
      name: "Ivy Chen",
      email: "ivy.chen@student.edu",
      gender: UserGender.FEMALE,
    },
    {
      name: "Jack Brown",
      email: "jack.brown@student.edu",
      gender: UserGender.MALE,
    },
    {
      name: "Kate Anderson",
      email: "kate.anderson@student.edu",
      gender: UserGender.FEMALE,
    },
    {
      name: "Liam Garcia",
      email: "liam.garcia@student.edu",
      gender: UserGender.MALE,
    },
    {
      name: "Mia Rodriguez",
      email: "mia.rodriguez@student.edu",
      gender: UserGender.FEMALE,
    },
    {
      name: "Noah Martinez",
      email: "noah.martinez@student.edu",
      gender: UserGender.MALE,
    },
  ];

  const createdStudents = [];
  for (const student of studentUsers) {
    const existingUser = await db.user.findUnique({
      where: { email: student.email },
    });

    if (!existingUser) {
      const newUser = await db.user.create({
        data: {
          ...student,
          role: UserRole.STUDENT,
          emailVerified: new Date(),
          password: student.email.includes("demo-") ? demoPassword : password,
          isTwoFactorEnabled: false,
          status: UserStatus.ACTIVE,
        },
      });

      // Create student record
      const studentRecord = await db.students.create({
        data: {
          userId: newUser.id,
          name: student.name,
        },
      });

      createdStudents.push({ user: newUser, student: studentRecord });
      console.log(`Student created: ${student.name}`);
    } else {
      const studentRecord = await db.students.findUnique({
        where: { userId: existingUser.id },
      });
      createdStudents.push({ user: existingUser, student: studentRecord });
      console.log(`Student already exists: ${student.name}`);
    }
  }

  // 5. Assign Students to Classrooms 
  for (let i = 0; i < createdStudents.length; i++) {
    const student = createdStudents[i];
    const classroomIndex = Math.floor(i / 5); 
    const classroom =
      createdClassrooms[classroomIndex % createdClassrooms.length];

    if (student.user && student.user.id) {
      
      const existing = await db.onClassroom.findFirst({
        where: {
          userId: student.user.id, 
          classroomId: classroom.id,
        },
      });

      if (!existing) {
        await db.onClassroom.create({
          data: {
            userId: student.user.id, 
            classroomId: classroom.id,
          },
        });
        console.log(`Assigned ${student.user.name} to ${classroom.name}`); 
      }
    }
  }

  // 6. Create Lessons
  const lessons = [
    {
      name: "Mathematics",
      cat: LessonCategory.SCIENCE,
      teacherId: createdTeachers[1]?.user?.id,
    },
    {
      name: "English Literature",
      cat: LessonCategory.LANGUANGES,
      teacherId: createdTeachers[2]?.user?.id,
    },
    {
      name: "Computer Science",
      cat: LessonCategory.SCIENCE,
      teacherId: createdTeachers[3]?.user?.id,
    },
    {
      name: "History",
      cat: LessonCategory.LANGUANGES,
      teacherId: createdTeachers[4]?.user?.id,
    },
    {
      name: "Physics",
      cat: LessonCategory.SCIENCE,
      teacherId: createdTeachers[1]?.user?.id,
    },
    {
      name: "Chemistry",
      cat: LessonCategory.SCIENCE,
      teacherId: createdTeachers[2]?.user?.id,
    },
    {
      name: "Biology",
      cat: LessonCategory.SCIENCE,
      teacherId: createdTeachers[3]?.user?.id,
    },
    {
      name: "Art",
      cat: LessonCategory.ART,
      teacherId: createdTeachers[4]?.user?.id,
    },
  ];

  const createdLessons = [];
  for (const lesson of lessons) {
    if (lesson.teacherId) {
      const existing = await db.lessons.findFirst({
        where: {
          name: lesson.name,
          teacherId: lesson.teacherId,
        },
      });

      if (!existing) {
        const newLesson = await db.lessons.create({
          data: lesson,
        });
        createdLessons.push(newLesson);
        console.log(`Lesson created: ${lesson.name}`);
      } else {
        createdLessons.push(existing);
        console.log(`Lesson already exists: ${lesson.name}`);
      }
    }
  }

  // 7. Create Schedules
  const schedules = [
    {
      lessonId: createdLessons[0]?.id,
      classId: createdClassrooms[0]?.id,
      day: new Date("2024-01-15"),
      time: "09:00",
    },
    {
      lessonId: createdLessons[1]?.id,
      classId: createdClassrooms[0]?.id,
      day: new Date("2024-01-15"),
      time: "10:00",
    },
    {
      lessonId: createdLessons[2]?.id,
      classId: createdClassrooms[1]?.id,
      day: new Date("2024-01-15"),
      time: "11:00",
    },
    {
      lessonId: createdLessons[3]?.id,
      classId: createdClassrooms[1]?.id,
      day: new Date("2024-01-16"),
      time: "09:00",
    },
    {
      lessonId: createdLessons[4]?.id,
      classId: createdClassrooms[2]?.id,
      day: new Date("2024-01-16"),
      time: "10:00",
    },
    {
      lessonId: createdLessons[0]?.id,
      classId: createdClassrooms[0]?.id,
      day: new Date("2024-01-17"),
      time: "09:00",
    },
    {
      lessonId: createdLessons[2]?.id,
      classId: createdClassrooms[1]?.id,
      day: new Date("2024-01-17"),
      time: "14:00",
    },
  ];

  const createdSchedules = [];
  for (const schedule of schedules) {
    if (schedule.lessonId && schedule.classId) {
      const existing = await db.schedule.findFirst({
        where: {
          lessonId: schedule.lessonId,
          classId: schedule.classId,
          day: schedule.day,
          time: schedule.time,
        },
      });

      if (!existing) {
        const newSchedule = await db.schedule.create({
          data: schedule,
        });
        createdSchedules.push(newSchedule);
        console.log(`Schedule created for lesson ${schedule.lessonId}`);
      } else {
        createdSchedules.push(existing);
        console.log(`Schedule already exists for lesson ${schedule.lessonId}`);
      }
    }
  }

  // 8. Create Sample Assignments - using correct field names
  const assignments = [
    {
      task: "Complete exercises 1-20 from chapter 5", 
      lessonId: createdLessons[0]?.id,
      classId: createdClassrooms[0]?.id,
      createBy: createdTeachers[1]?.user?.id, 
      deadline: new Date("2024-02-01"), 
      time: "23:59", 
    },
    {
      task: "Write a 500-word essay on Hamlet",
      lessonId: createdLessons[1]?.id,
      classId: createdClassrooms[0]?.id,
      createBy: createdTeachers[2]?.user?.id,
      deadline: new Date("2024-02-05"),
      time: "23:59",
    },
    {
      task: "Create a simple calculator in Python",
      lessonId: createdLessons[2]?.id,
      classId: createdClassrooms[1]?.id,
      createBy: createdTeachers[3]?.user?.id,
      deadline: new Date("2024-02-10"),
      time: "23:59",
    },
  ];

  for (const assignment of assignments) {
    if (assignment.lessonId && assignment.createBy && assignment.classId) {
      const existing = await db.assignments.findFirst({
        where: {
          task: assignment.task,
          lessonId: assignment.lessonId,
        },
      });

      if (!existing) {
        await db.assignments.create({
          data: assignment,
        });
        console.log(`Assignment created: ${assignment.task}`);
      } else {
        console.log(`Assignment already exists: ${assignment.task}`);
      }
    }
  }

  console.log("Database seeding completed successfully!");
  console.log("\n=== Demo Account Credentials ===");
  console.log("Demo Admin: demo-admin@edumanager.com / demo123");
  console.log("Demo Teacher: demo-teacher@edumanager.com / demo123");
  console.log("Demo Student: demo-student@edumanager.com / demo123");
  console.log("Regular accounts: [email] / 123456");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
