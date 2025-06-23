"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { UserRole } from "@prisma/client";
import { UserStatus } from "@prisma/client";
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
import { Edit2, Loader2, User, Mail, Shield, Activity, Save } from "lucide-react";

type User = {
  id: string;
  email: string | null;
  role: UserRole;
  status: UserStatus;
  name: string | null;
};

const Edt = ({ user }: { user: User }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [role, setRole] = useState<UserRole>(user.role);
  const [status, setStatus] = useState<UserStatus>(user.status);
  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (
      name === user.name &&
      email === user.email &&
      role === user.role &&
      status === user.status
    ) {
      toast({
        title: "No changes detected",
        description: "The user information hasn't been modified.",
      });
      setShowModal(false);
      return;
    }

    if (!name.trim() || !email.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Name and email are required fields.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.patch(`/api/user/${user.id}`, {
        name: name.trim(),
        email: email.trim(),
        role,
        status,
      });
      
      toast({
        title: "User updated successfully",
        description: `${response.data.name}'s information has been updated.`,
      });
      
      setShowModal(false);
      router.refresh();
    } catch (error: any) {
      let errorMessage = "An error occurred while updating the user";
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowModal(true)}
        className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400 transition-colors"
      >
        <Edit2 className="h-4 w-4" />
        <span className="sr-only">Edit user</span>
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[500px] dark:bg-black bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5 text-blue-600" />
              Edit User Profile
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Update {user.name}&apos;s information. All fields are required.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div className="space-y-3">
              <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4 text-gray-500" />
                Full Name
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

            <div className="space-y-3">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                <Mail className="h-4 w-4 text-gray-500" />
                Email Address
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="role" className="flex items-center gap-2 text-sm font-medium">
                  <Shield className="h-4 w-4 text-gray-500" />
                  Role
                </Label>
                <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                  <SelectTrigger className="h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserRole.TEACHER}>Teacher</SelectItem>
                    <SelectItem value={UserRole.STUDENT}>Student</SelectItem>
                    <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                  </SelectContent>
                </Select>
                </div>

              <div className="space-y-3">
                <Label htmlFor="status" className="flex items-center gap-2 text-sm font-medium">
                  <Activity className="h-4 w-4 text-gray-500" />
                  Status
                </Label>
                <Select value={status} onValueChange={(value) => setStatus(value as UserStatus)}>
                  <SelectTrigger className="h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserStatus.ACTIVE}>Active</SelectItem>
                    <SelectItem value={UserStatus.IN_ACTIVE}>Inactive</SelectItem>
                    <SelectItem value={UserStatus.BANNED}>Banned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowModal(false)}
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
                    Updating...
        </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Update User
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

export default Edt;
