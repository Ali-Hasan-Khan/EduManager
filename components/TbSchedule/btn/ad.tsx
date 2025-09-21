"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { Lessons, Classrooms } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2, Calendar } from "lucide-react";

interface AdProps {
  lessons: Lessons[];
  classrooms: Classrooms[];
}

const Ad = ({ lessons, classrooms }: AdProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [lesson, setLesson] = useState("");
  const [classroom, setClassroom] = useState("");
  const router = useRouter();

  const handleAdd = async (e: SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(`/api/schedule`, {
        day: day,
        time: time,
        lesson: lesson,
        classroom: classroom,
      });
      toast({
        title: "Schedule Added Successfully",
        description: "New schedule has been created.",
      });
      setDay("");
      setTime("");
      setLesson("");
      setClassroom("");
      setShowModal(false);
      router.refresh();
    } catch (error: any) {
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
        className="h-auto w-auto p-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        <span>Add schedule</span>
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px] dark:bg-black bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-green-600" />
              Add Schedule
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Create a new schedule with lesson, classroom, date, and time.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lesson" className="text-sm font-medium">
                Lesson
              </Label>
              <Select value={lesson} onValueChange={setLesson}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select lesson" />
                </SelectTrigger>
                <SelectContent className="dark:bg-black bg-white">
                  {lessons.map((lesson) => (
                    <SelectItem key={lesson.id} value={lesson.id}>
                      {lesson.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="classroom" className="text-sm font-medium">
                Classroom
              </Label>
              <Select value={classroom} onValueChange={setClassroom}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select classroom" />
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

            <div className="space-y-2">
              <Label htmlFor="day" className="text-sm font-medium">
                Date
              </Label>
              <Input
                id="day"
                type="date"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="h-10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm font-medium">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="h-10"
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
                disabled={isLoading || !lesson || !classroom || !day || !time}
                className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Schedule
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
