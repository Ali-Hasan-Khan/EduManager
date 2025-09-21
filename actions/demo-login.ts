"use server";

import { signIn } from "@/auth";
import { UserRole } from "@prisma/client";
import { getUserByEmail } from "@/data/user";

export const demoLogin = async (role: UserRole) => {
  if (role === UserRole.UNKNOW) {
    return { error: "Unknown demo role selected" };
  }
  const demoAccounts: Record<UserRole, string> = {
    [UserRole.ADMIN]: "demo-admin@edumanager.com",
    [UserRole.TEACHER]: "demo-teacher@edumanager.com",
    [UserRole.STUDENT]: "demo-student@edumanager.com",
    [UserRole.UNKNOW]: "",
  };

  const email = demoAccounts[role];
  if (!email) {
    return { error: "Invalid demo role selected" };
  }

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      error: `Demo ${role.toLowerCase()} account not found. Please contact administrator.`,
    };
  }

  if (existingUser.role !== role) {
    return { error: "Demo account role mismatch" };
  }

  try {
    const result = await signIn("credentials", {
      email,
      password: "demo123", // Demo password
      redirect: false,
    });

    if (result?.error) {
      return { error: "Demo login failed. Please try again." };
    }

    return { success: "Demo user ready for login" };
  } catch (error) {
    console.error("Unexpected error during demo login:", error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
};
