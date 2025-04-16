"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full border-b border-white/10 bg-black/50 backdrop-blur-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/school-management-logo.svg"
              alt="EduManager Logo"
              width={40}
              height={40}
              className="hover:scale-105 transition-transform duration-300"
            />
            <span className="ml-2 text-xl font-bold text-white">EduManager</span>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm transition-colors duration-300",
                  pathname === item.href
                    ? "text-white font-medium"
                    : "text-gray-300 hover:text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <LoginButton mode="modal" asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                Sign in
              </Button>
            </LoginButton>
            <LoginButton mode="modal" asChild>
              <Button 
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Get Started
              </Button>
            </LoginButton>
          </div>
        </div>
      </div>
    </nav>
  );
} 