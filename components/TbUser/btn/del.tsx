"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, Loader2, AlertTriangle, UserX } from "lucide-react";

type User = {
  id: string;
  name: string | null;
  email: string | null;
};

const Del = ({ user }: { user: User }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/user/${user.id}`);
      
      toast({
        title: "User deleted successfully",
        description: `${user.name} has been permanently removed from the system.`,
      });
      
      setShowModal(false);
      router.refresh();
    } catch (error: any) {
      let errorMessage = "An error occurred while deleting the user";
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      toast({
        variant: "destructive",
        title: "Delete Failed",
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
        className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 dark:hover:text-red-400 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete user</span>
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[450px] dark:bg-black bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <UserX className="h-5 w-5 text-red-600" />
              Delete User Account
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Are you sure you want to delete <strong className="text-gray-900 dark:text-white">{user.name}</strong>? 
              This action cannot be undone and will permanently remove the user account and all associated data from the system.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="gap-3 pt-4">
            <DialogClose disabled={isLoading} className="flex-1 sm:flex-none">
              Cancel
            </DialogClose>
            <Button
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600 flex-1 sm:flex-none dark:text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                    Delete User
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Del;
