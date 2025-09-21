"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg bg-gray900 border border-stroke dark:border-strokedark">
      <CardHeader className="text-center">
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent className="px-6 pb-4">{children}</CardContent>
      <CardFooter className="px-6 pt-0">
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
