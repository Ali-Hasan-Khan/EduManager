"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { redirect } from "next/navigation";

export function CTASection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16 px-4 md:px-8 bg-black"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Transform Your School?
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Join thousands of educational institutions that have streamlined their operations with our platform.
        </p>
        <LoginButton asChild>
          <Button
            onClick={() => {
              redirect("/auth/login");
            }}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Start Your Journey Today
          </Button>
        </LoginButton>
      </div>
    </motion.div>
  );
} 