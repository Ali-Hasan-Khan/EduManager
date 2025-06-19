import { NewPasswordForm } from "@/components/auth/new-password-form";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function NewPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPasswordForm />
    </Suspense>
  );
}