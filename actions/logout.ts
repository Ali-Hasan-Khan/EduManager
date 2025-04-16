"use server";

import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const logout = async () => {
  try {
    // Clear all cached paths
    revalidatePath("/", "layout");
    revalidatePath("/home", "layout");
    revalidatePath("/auth/login", "layout");
    
    // Clear all cookies
    const cookieStore = cookies();
    cookieStore.getAll().forEach((cookie) => {
      cookieStore.delete(cookie.name);
    });
    
    // Sign out the user with session clearing
    await signOut({ redirect: false });
    
    // Redirect to login page
    redirect("/auth/login");
  } catch (error) {
    console.error("Error during logout:", error);
    redirect("/auth/login");
  }
};
