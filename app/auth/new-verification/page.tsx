import { NewVerificationForm } from "@/components/auth/new-verification-form";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function NewVerificationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewVerificationForm />
    </Suspense>
   );
}