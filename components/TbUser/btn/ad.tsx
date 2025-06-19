"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { UserRole, UserStatus, UserGender } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Plus, 
  Loader2, 
  User, 
  Mail, 
  Lock, 
  Shield, 
  Activity,
  UserPlus,
  Save
} from "lucide-react";

const Ad = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState<UserGender | "">("");
  const [role, setRole] = useState<UserRole | "">("");
  const [status, setStatus] = useState<UserStatus | "">("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleAdd = async (e: SyntheticEvent) => {
    e.preventDefault();

    // Validation
    if (!name.trim() || !email.trim() || !password.trim() || !role || !status) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Password Error",
        description: "Password must be at least 6 characters long.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`/api/user`, {
        name: name.trim(),
        email: email.trim(),
        role,
        password,
        status,
        emailVerified: new Date(),
        gender: gender || undefined
      });
      
      toast({
        title: "User created successfully",
        description: `${response.data.name} has been added as a ${response.data.role.toLowerCase()}.`,
      });
      
      // Reset form
      setName("");
      setPassword("");
      setEmail("");
      setGender("");
      setRole("");
      setStatus("");
      setShowPassword(false);
      
      setShowModal(false);
      router.refresh();
    } catch (error: any) {
      let errorMessage = "An error occurred while creating the user";
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      toast({
        variant: "destructive",
        title: "Creation Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setPassword("");
    setEmail("");
    setGender("");
    setRole("");
    setStatus("");
    setShowPassword(false);
    setShowModal(false);
  };

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
        size="sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add User
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="dark:bg-black bg-white sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <UserPlus className="h-5 w-5 text-blue-600" />
              Create New User
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Add a new user to the system. Fill in all required fields to create the account.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAdd} className="space-y-5">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <User className="h-4 w-4" />
                Basic Information
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password *
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    {showPassword ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Account Settings
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium">
                    Role *
                  </Label>
                  <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                    <SelectTrigger className="h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                      <SelectItem value={UserRole.TEACHER}>Teacher</SelectItem>
                      <SelectItem value={UserRole.STUDENT}>Student</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-sm font-medium">
                    Status *
                  </Label>
                  <Select value={status} onValueChange={(value) => setStatus(value as UserStatus)}>
                    <SelectTrigger className="h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserStatus.ACTIVE}>Active</SelectItem>
                      <SelectItem value={UserStatus.IN_ACTIVE}>Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-sm font-medium">
                    Gender
                  </Label>
                  <Select value={gender} onValueChange={(value) => setGender(value as UserGender)}>
                    <SelectTrigger className="h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserGender.MALE}>Male</SelectItem>
                      <SelectItem value={UserGender.FEMALE}>Female</SelectItem>
                      <SelectItem value={UserGender.UNKNOW}>Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                disabled={isLoading}
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Create User
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Ad;
