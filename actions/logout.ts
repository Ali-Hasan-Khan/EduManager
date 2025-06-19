"use server";

import { signOut } from "@/auth";
import { revalidatePath } from "next/cache";

export const logout = async () => {
  try {
    // Invalidate relevant paths to ensure fresh data after logout
    revalidatePath("/", "layout");
    revalidatePath("/home", "layout");
    revalidatePath("/auth/login", "layout");

    // Properly sign out the user
    await signOut({ redirect: false });

    return { success: true };
  } catch (error) {
    console.error("Error during logout:", error);
    return { error: "Failed to logout" };
  }
};
