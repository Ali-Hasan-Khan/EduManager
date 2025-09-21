import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { DemoLoginForm } from "@/components/auth/demo-login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, PlayCircle } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <Tabs defaultValue="login" className="w-full">
        <div className="top-0">
          <TabsList className="bg-gray900 w-full max-w-[350px] mx-auto grid grid-cols-2">
            <TabsTrigger
              value="login"
              className="flex items-center gap-3 px-4 py-2 text-sm font-medium"
            >
              <LogIn className="h-4 w-4" />
              <span>Account Login</span>
            </TabsTrigger>
            <TabsTrigger
              value="demo"
              className="flex items-center gap-3 px-4 py-2 text-sm font-medium relative"
            >
              <PlayCircle className="h-4 w-4" />
              <span>Try Demo</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="login">
          <Suspense fallback={<div className="flex justify-center items-center p-8">Loading...</div>}>
            <LoginForm />
          </Suspense>
        </TabsContent>

        <TabsContent value="demo">
          <DemoLoginForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginPage;
