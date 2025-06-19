import { ResetForm } from "@/components/auth/reset-form";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function ResetPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetForm />
    </Suspense>
  );
}
 