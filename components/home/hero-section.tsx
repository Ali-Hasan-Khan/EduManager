"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import Link from "next/link";
import Image from 'next/image';
import { ArrowRight, Loader2 } from "lucide-react";
import { demoLogin } from "@/actions/demo-login";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export function HeroSection() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDemoLogin = async () => {
    try {
      setIsLoading(true);
      
      // First ensure demo user exists
      const result = await demoLogin();
      
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      
      // Then use client-side signIn
      const signInResult = await signIn("credentials", {
        email: "demo@edumanager.com",
        password: "123456",
        redirect: false,
      });

      if (signInResult?.error) {
        toast.error("Demo login failed. Please try again.");
        return;
      }

      if (signInResult?.ok) {
      toast.success("Demo login successful!");
      window.location.href = "/home";
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen pt-0 lg:pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10" />
      <div className="relative z-20 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 text-white order-2 lg:order-1"
          >
            <div className="hidden lg:flex lg:justify-start">
              <Link href="/">
                <Image
                  width={200}
                  height={150}
                  src="/school-management-logo.svg"
                  alt="Logo"
                  priority
                  className="w-32 h-24 sm:w-40 sm:h-30 md:w-48 md:h-36 lg:w-52 lg:h-40 hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center lg:text-left leading-tight">
              Transform Your School Management
            </h1>
            
            <p className="text-base sm:text-lg text-gray-300 text-center lg:text-left leading-relaxed max-w-lg lg:max-w-none mx-auto lg:mx-0">
              Streamline operations, enhance communication, and empower your educational institution with our comprehensive management system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto">
              <LoginButton asChild>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-base"
                >
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </LoginButton>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-base"
                onClick={onDemoLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Take a demo
                <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] border-4 sm:border-6 lg:border-8 border-slate-700 rounded-lg order-1 lg:order-2"
          >
            <Image
              src="/light-dark-dashboard.png"
              alt="Dashboard Preview"
              fill
              className="object-contain rounded-md shadow-2xl"
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
} 