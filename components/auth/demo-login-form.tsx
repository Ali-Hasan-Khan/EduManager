"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { demoLogin } from "@/actions/demo-login";
import { UserRole } from "@prisma/client";
import {
  Crown,
  GraduationCap,
  BookOpen,
  Shield,
  Users,
  School,
} from "lucide-react";
import { motion } from "framer-motion";

export const DemoLoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null);

  const handleDemoLogin = (role: UserRole) => {
    setError("");
    setSuccess("");
    setPendingRole(role);

    startTransition(async () => {
      try {
        await demoLogin(role);
        setSuccess("Demo user ready for login");
        window.location.href = "/home";
      } catch (error) {
        if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
          return;
        } else {
          setError("Something went wrong!");
        }
      } finally {
        setPendingRole(null);
      }
    });
  };

  const demoRoles = [
    {
      role: UserRole.ADMIN,
      title: "Administrator",
      description: "Full system access with management capabilities",
      icon: Crown,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      features: [
        "Manage all users",
        "System configuration",
        "Full data access",
      ],
      restrictions: ["Demo data only", "No real user deletion"],
    },
    {
      role: UserRole.TEACHER,
      title: "Teacher",
      description: "Educator access for class and assignment management",
      icon: GraduationCap,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      features: ["Manage classes", "Create assignments", "Take attendance"],
      restrictions: ["Limited to demo classes", "Pre-configured schedule"],
    },
    {
      role: UserRole.STUDENT,
      title: "Student",
      description: "Student portal for viewing classes and assignments",
      icon: BookOpen,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      features: ["View schedule", "Check assignments", "Track attendance"],
      restrictions: ["Read-only access", "Demo classroom only"],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Try Demo Access
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Experience EduManager with different user roles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {demoRoles.map(
          ({
            role,
            title,
            description,
            icon: Icon,
            color,
            bgColor,
            borderColor,
            features,
            restrictions,
          }) => (
            <Card
              key={role}
              className={`bg-gray900 border ${borderColor} relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105`}
            >
              <CardHeader className="text-center pb-4">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${bgColor} ${color} mb-3 border ${borderColor}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg text-white">{title}</CardTitle>
                <CardDescription className="text-sm text-gray-400">
                  {description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Features */}
                <div>
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Features
                  </h4>
                  <ul className="text-xs text-gray-400 space-y-1">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-meta-3 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Restrictions */}
                <div>
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Demo Limits
                  </h4>
                  <ul className="text-xs text-gray-500 space-y-1">
                    {restrictions.map((restriction, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-meta-6 rounded-full" />
                        {restriction}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  disabled={isPending}
                  onClick={() => handleDemoLogin(role)}
                  className={`w-full ${color.replace('text-', 'bg-')} hover:opacity-90 text-white border-0`}
                  size="sm"
                >
                  {isPending && pendingRole === role ? "Signing in..." : `Login as ${title}`}
                </Button>
              </CardContent>
            </Card>
          )
        )}
      </div>

      <FormError message={error} />
      <FormSuccess message={success} />

      {/* Disclaimer */}
      <div className="bg-meta-6/20 border border-meta-6/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <School className="h-5 w-5 text-meta-6 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-meta-6">
              Demo Environment Notice
            </h4>
            <p className="text-xs text-gray-400 mt-1">
              This is a demonstration environment with limited functionality and
              sample data. All actions are restricted to demo content only.
            </p>
          </div>
        </div>
      </div>
    </div>
    </motion.div>
  );
};
