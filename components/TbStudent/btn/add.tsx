"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2, GraduationCap } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

interface AddProps {
  classrooms: any[];
  student: any;
}

const Add = ({ classrooms, student }: AddProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState("");

  const handleAdd = async () => {
    if (!selectedClassroom) return;
    
    setIsLoading(true);
    try {
      console.log("Adding student to classroom:", selectedClassroom);
      const response = await axios.post('/api/student', {
        studentId: student.userId,
        classroomId: selectedClassroom
      });
      toast({
        title: "Student Added Successfully",
        description: "New student has been added to the classroom.",
      });
      setShowModal(false);
      setSelectedClassroom("");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error adding the student to the classroom. Student may already be in other classroom.",
        variant: "destructive",
      });
      console.error("Error adding student to classroom:", error);
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
        className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-950 dark:hover:text-green-400 transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span className="sr-only">Add to classroom</span>
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[400px] dark:bg-black bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <GraduationCap className="h-5 w-5 text-green-600" />
              Add to Classroom
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Add {student.name} to a classroom.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Classroom</label>
              <Select value={selectedClassroom} onValueChange={setSelectedClassroom}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Choose a classroom" />
                </SelectTrigger>
                <SelectContent className="dark:bg-black bg-white">
                  {classrooms.map((classroom) => (
                    <SelectItem key={classroom.id} value={classroom.id}>
                      {classroom.name}
                    </SelectItem>
                  ))}
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
              onClick={handleAdd}
              disabled={isLoading || !selectedClassroom}
              className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Classroom
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Add;
