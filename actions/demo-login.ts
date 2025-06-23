"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const demoLogin = async () => {
  try {
    // Check if demo user exists
    let demoUser = await db.user.findUnique({
      where: {
        email: "demo@edumanager.com",
      },
    });

    // If demo user doesn't exist, create one
    if (!demoUser) {
      try {
        const hashedPassword = await bcrypt.hash("123456", 10);
        demoUser = await db.user.create({
          data: {
            name: "Demo User",
            email: "demo@edumanager.com",
            password: hashedPassword,
            role: "STUDENT",
            status: "ACTIVE",
            emailVerified: new Date(),
          },
        });
      } catch (createError) {
        console.error("Error creating demo user:", createError);
        return { error: "Failed to create demo user. Please try again." };
      }
    }

    return { success: "Demo user ready for login" };
  } catch (error) {
    console.error("Unexpected error during demo login:", error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}; 