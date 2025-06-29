import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "School Management System",
  description: "Built with nextjs",
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session;
  
  try {
    session = await auth();
  } catch (error) {
    console.error("Auth error in layout:", error);
    session = null;
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <NextTopLoader />
            {children}
            <Toaster />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
