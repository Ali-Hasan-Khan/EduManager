"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import Link from "next/link";
import Image from 'next/image';
import { ArrowRight } from "lucide-react";
import { demoLogin } from "@/actions/demo-login";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function HeroSection() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDemoLogin = async () => {
    try {
      setIsLoading(true);
      const result = await demoLogin();
      
      if (result?.error) {
        toast.error(result.error);
        return;
      }
      
      toast.success("Demo login successful!");
      router.push("/home");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen pt-16 px-4 md:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10" />
      <div className="relative z-20 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 text-white"
          >
            <div className="flex justify-center md:justify-start">
              <Link href="/">
                <Image
                  width={200}
                  height={150}
                  src="/school-management-logo.svg"
                  alt="Logo"
                  priority
                  className="hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-center md:text-left">
              Transform Your School Management
            </h1>
            
            <p className="text-lg text-gray-300 text-center md:text-left">
              Streamline operations, enhance communication, and empower your educational institution with our comprehensive management system.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <LoginButton asChild>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
                >
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </LoginButton>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 flex items-center gap-2"
                onClick={onDemoLogin}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Take a demo"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>

          {/* Right Content - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-[420px] border-8 border-slate-700 rounded-lg hidden md:block"
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