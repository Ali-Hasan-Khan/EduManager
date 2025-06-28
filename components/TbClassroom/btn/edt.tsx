"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Edit2, 
  Loader2, 
  School, 
  Users,
  Save
} from "lucide-react";

type Classroom = {
  id: string;
  name: string;
  cap: number;
};

const Edt = ({ classroom }: { classroom: Classroom }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(classroom.name);
  const [capacity, setCapacity] = useState(classroom.cap.toString());
  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (name === classroom.name && parseInt(capacity) === classroom.cap) {
      toast({
        title: "No changes detected",
        description: "The classroom information hasn't been modified.",
      });
      setShowModal(false);
      return;
    }

    if (!name.trim() || !capacity.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Name and capacity are required fields.",
      });
      return;
    }

    const capacityNum = parseInt(capacity);
    if (isNaN(capacityNum) || capacityNum <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Capacity",
        description: "Capacity must be a positive number.",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.patch(`/api/classroom/${classroom.id}`, {
        name: name.trim(),
        cap: capacityNum,
      });
      
      toast({
        title: "Classroom updated successfully",
        description: `${response.data.name} has been updated.`,
      });
      
      setShowModal(false);
      router.refresh();
    } catch (error: any) {
      let errorMessage = "An error occurred while updating the classroom";
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
        <span className="sr-only">Edit classroom</span>
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[500px] dark:bg-black bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <School className="h-5 w-5 text-blue-600" />
              Edit Classroom
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Update {classroom.name}'s information. All fields are required.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div className="space-y-3">
              <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                <School className="h-4 w-4 text-gray-500" />
                Classroom Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter classroom name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="capacity" className="flex items-center gap-2 text-sm font-medium">
                <Users className="h-4 w-4 text-gray-500" />
                Capacity
              </Label>
              <Input
                id="capacity"
                type="number"
                placeholder="Enter capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="h-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
                required
              />
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
                    Update Classroom
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