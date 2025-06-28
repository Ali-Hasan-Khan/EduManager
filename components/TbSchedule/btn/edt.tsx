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
import { Edit, Loader2, Calendar } from "lucide-react";

type Schedule = {
  id: string;
  lessonId: string;
  classId: string;
  day: Date;
  time: string;
  lesson?: {
    name: string;
  };
  classroom?: {
    name: string;
  };
};

interface EdtProps {
  lessons: Lessons[];
  classrooms: Classrooms[];
  schedule: Schedule;
}

const Edt = ({ schedule, lessons, classrooms }: EdtProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [day, setDay] = useState(
    schedule.day.toISOString().split("T")[0] || ""
  );
  const [time, setTime] = useState(schedule.time || "");
  const [lessonId, setLesson] = useState(schedule.lessonId || "");
  const [classId, setClass] = useState(schedule.classId || "");
  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (
        day === schedule.day.toISOString().split("T")[0] &&
        time === schedule.time &&
        classId === schedule.classId &&
        lessonId === schedule.lessonId
      ) {
        setIsLoading(false);
        setShowModal(false);
        return;
      }
      const response = await axios.patch(`/api/schedule/${schedule.id}`, {
        day: day,
        time: time,
        lessonId: lessonId,
        classId: classId,
      });
      toast({
        title: "Schedule Updated Successfully",
        description: "Schedule details have been updated.",
      });
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
        className="h-8 w-8 p-0 hover:bg-yellow-50 hover:text-yellow-600 dark:hover:bg-yellow-950 dark:hover:text-yellow-400 transition-colors"
      >
        <Edit className="h-4 w-4" />
        <span className="sr-only">Edit schedule</span>
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[500px] dark:bg-black bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-yellow-600" />
              Edit Schedule
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Update schedule information for {schedule.lesson?.name || "this lesson"}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lesson" className="text-sm font-medium">
                  Lesson
                </Label>
                <Select value={lessonId} onValueChange={setLesson}>
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
                <Select value={classId} onValueChange={setClass}>
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
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                disabled={isLoading || !lessonId || !classId || !day || !time}
                className="bg-yellow-600 hover:bg-yellow-700 flex-1 sm:flex-none text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" />
                    Update Schedule
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
