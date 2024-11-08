// seed.ts
import { PrismaClient, UserRole, UserGender, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Hashed password for all users
  const password = await bcrypt.hash('123456', 10);

  // Check if the admin user already exists
  const adminExists = await prisma.user.findUnique({
    where: {
      email: 'testuser@example.com', // Or search by a unique field
    },
  });

  // Create the admin user if they don't already exist
  if (!adminExists) {
    await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'testuser@example.com',
        emailVerified: new Date(),
        image: null,
        password: password,
        role: UserRole.ADMIN,
        gender: UserGender.MALE,
        isTwoFactorEnabled: false,
        status: UserStatus.ACTIVE,
      },
    });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists, skipping...');
  }

  // Create the teacher user
  const teacherUser = await prisma.user.create({
    data: {
      name: 'Teacher User',
      email: 'teacher@example.com',
      emailVerified: new Date(),
      image: null,
      password: password,
      role: UserRole.UNKNOW,
      gender: UserGender.FEMALE,
      isTwoFactorEnabled: false,
      status: UserStatus.ACTIVE,
    },
  });

  // Create the student user
  const studentUser = await prisma.user.create({
    data: {
      name: 'Student User',
      email: 'student@example.com',
      emailVerified: new Date(),
      image: null,
      password: password,
      role: UserRole.UNKNOW,
      gender: UserGender.MALE,
      isTwoFactorEnabled: false,
      status: UserStatus.ACTIVE,
    },
  });

  console.log('Teacher and student users created:', { teacherUser, studentUser });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
