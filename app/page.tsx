import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { lusitana } from "@/components/ui/fonts";
import Link from "next/link";
import Image from 'next/image';
import { ImagesSliderDemo } from "@/components/image-slider/Demo";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-black bg-grid-small-white/[0.2] overflow-hidden">
      <div className="mt-4 flex-grow flex flex-col gap-4 md:flex-row">

        <div className="flex flex-col text-boxdark shadow-xl justify-center gap-6 rounded-lg bg-slate-400 border border-gray800 px-6 py-10 md:w-2/5 md:px-20 xsm:px-[125px] 2xsm:px-[100px]">
          <div className="flex flex-col justify-center items-center">
            <Link href="/">
              <Image
                width={165}
                height={122}
                src={"./school-management-logo-homepage.svg"}
                alt="Logo"
                priority
              />
            </Link>
          </div>
          <CardHeader>

            <CardTitle className="text-3xl">Welcome to our School Management System</CardTitle>
          </CardHeader>
          <CardContent>
            <h1 className="mb-4">Streamline Your School&apos;s Operations</h1>
            <div className="mb-8">
              Our powerful school management system helps you effortlessly manage
              student records, schedules, attendance, and more. Say goodbye to
              tedious paperwork and embrace a digital future for your school.
            </div>
            <LoginButton asChild>
              <Button
                variant="secondary"
                size="lg"
                className="hover:bg-green-700 bg-transparent border-2 border-boxdark transition-colors duration-300 text-boxdark "
              >
                Sign in
              </Button>
            </LoginButton>
          </CardContent>

        </div>
        <div className="hidden md:flex flex-col shadow-xl justify-end gap-6 rounded-lg bg-gray900 border border-gray800 px-6 py-4 md:w-4/5 md:px-4 xsm:px-[125px] 2xsm:px-[100px]">
          <ImagesSliderDemo />
        </div>

      </div>
    </main>
  );
}
