import { RegisterForm } from "@/components/auth/register-form";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}