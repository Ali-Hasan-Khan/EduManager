"use server";

import { db } from "@/lib/db";
import { login } from "./login";
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

    // Login with demo credentials
    try {
      const loginResult = await login(
        {
          email: "demo@edumanager.com",
          password: "123456",
        },
        undefined
      );

      // If we get here, the login was successful (NEXT_REDIRECT is handled by Next.js)
      return { success: "Successfully logged in as demo user!" };
    } catch (loginError) {
      // Check if the error is a redirect (success case)
      if (loginError instanceof Error && loginError.message.includes("NEXT_REDIRECT")) {
        return { success: "Successfully logged in as demo user!" };
      }
      
      console.error("Error during demo login:", loginError);
      return { error: "Failed to login with demo credentials. Please try again." };
    }
  } catch (error) {
    // Check if the error is a redirect (success case)
    if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
      return { success: "Successfully logged in as demo user!" };
    }
    
    console.error("Unexpected error during demo login:", error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}; 