"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, Loader2, AlertTriangle, FileText } from "lucide-react";

type Assignment = {
  id: string;
  fileUrl: string | null;
  task?: string;
  lesson?: {
    name: string;
  };
  classroom?: {
    name: string;
  };
};

const Del = ({ assignment }: { assignment: Assignment }) => {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      if (assignment.fileUrl) {
        const storage = getStorage();
        const fileRef = ref(storage, assignment.fileUrl);
        await deleteObject(fileRef);
      }
      console.log(assignment);
      await axios.delete(`/api/assignment/${assignment.id}`);
      toast({
        title: "Assignment Deleted Successfully",
        description: "The assignment and associated files have been removed.",
      });
      setShowModal(false);
      router.refresh();
    } catch (error: any) {
      console.log(error);
      let errorMessage = "An error occurred";
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
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
        <span className="sr-only">Delete assignment</span>
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px] dark:bg-black bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Delete Assignment
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              This action cannot be undone. This will permanently delete the assignment and any associated files.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-900 dark:text-red-100">
                  Are you sure you want to delete this assignment?
                </p>
                {assignment.task && (
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                    <span className="font-semibold">{assignment.task}</span>
                    {assignment.lesson && (
                      <> for <span className="font-semibold">{assignment.lesson.name}</span></>
                    )}
                    {assignment.classroom && (
                      <> in <span className="font-semibold">{assignment.classroom.name}</span></>
                    )}
                  </p>
                )}
                {assignment.fileUrl && (
                  <div className="flex items-center gap-2 mt-2 text-xs text-red-600 dark:text-red-400">
                    <FileText className="h-3 w-3" />
                    <span>Associated file will also be deleted</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="gap-3">
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
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 flex-1 sm:flex-none text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Assignment
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
