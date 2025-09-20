import { auth } from "@/auth";
import {
  AFTER_LOGIN_URL,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

import { UserRole } from "@prisma/client";

export default auth((req) => {
  try {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
      return;
    }

    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL(AFTER_LOGIN_URL, nextUrl));
      }
      return;
    }

    if (!isLoggedIn && !isPublicRoute) {
      let callbackUrl = nextUrl.pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }

      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      return Response.redirect(
        new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
      );
    }

    const userRole = req.auth?.user?.role;

    // Student routes
    if (nextUrl.pathname.startsWith("/student")) {
      if (!isLoggedIn || userRole !== UserRole.STUDENT) {
        return Response.redirect(new URL("/auth/login", nextUrl));
      }
    }

    // Teacher routes
    if (nextUrl.pathname.startsWith("/teacher")) {
      if (!isLoggedIn || userRole !== UserRole.TEACHER) {
        return Response.redirect(new URL("/auth/login", nextUrl));
      }
    }

    // Admin routes
    if (nextUrl.pathname.startsWith("/admin")) {
      if (!isLoggedIn || userRole !== UserRole.ADMIN) {
        return Response.redirect(new URL("/auth/login", nextUrl));
      }
    }

    return;
  } catch (error) {
    console.error("Middleware error:", error);
    return Response.redirect(new URL("/auth/error", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
