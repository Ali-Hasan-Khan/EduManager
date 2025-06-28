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
import { Edit, Loader2, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/text-area";

type Assignment = {
  id: string;
  lessonId: string;
  classId: string;
  deadline: Date;
  time: string;
  task: string;
  createBy: string;
  fileUrl: string | null;
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
  assignment: Assignment;
}

const Edt = ({ assignment, lessons, classrooms }: EdtProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deadline, setDeadline] = useState(
    assignment.deadline.toISOString().split("T")[0] || ""
  );
  const [time, setTime] = useState(assignment.time || "");
  const [file, setFile] = useState(assignment.fileUrl || "");
  const [lessonId, setLesson] = useState(assignment.lessonId || "");
  const [classId, setClass] = useState(assignment.classId || "");
  const [task, setTask] = useState(assignment.task || "");
  const [teacherId, setTeacherId] = useState(assignment.createBy || "");
  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      if (
        deadline === assignment.deadline.toISOString().split("T")[0] &&
        time === assignment.time &&
        classId === assignment.classId &&
        task === assignment.task &&
        lessonId === assignment.lessonId &&
        teacherId === assignment.createBy
      ) {
        setIsLoading(false);
        setShowModal(false);
        return;
      }
      const response = await axios.patch(`/api/assignment/${assignment.id}`, {
        deadline: deadline,
        time: time,
        lessonId: lessonId,
        classId: classId,
        task: task,
        createBy: teacherId,
      });
      toast({
        title: "Assignment Updated Successfully",
        description: `Assignment: ${response.data.task}`,
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
        <span className="sr-only">Edit assignment</span>
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[600px] dark:bg-black bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-yellow-600" />
              Edit Assignment
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Update assignment information for {assignment.lesson?.name || "this lesson"}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="task" className="text-sm font-medium">
                Assignment Task
              </Label>
              <Textarea
                id="task"
                placeholder="Enter assignment description"
                value={task}
                onChange={(e: any) => setTask(e.target.value)}
                className="min-h-[80px]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lesson" className="text-sm font-medium">
                  Lesson
                </Label>
                <Select value={lessonId} onValueChange={(value) => {
                  setLesson(value);
                  const selectedLesson = lessons.find(l => l.id === value);
                  if (selectedLesson) {
                    setTeacherId(selectedLesson.teacherId);
                  }
                }}>
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

            <div className="space-y-2">
              <Label htmlFor="fileUrl" className="text-sm font-medium">
                File URL (Optional)
              </Label>
              <Input
                id="fileUrl"
                type="url"
                placeholder="https://example.com/file.pdf"
                value={file}
                onChange={(e) => setFile(e.target.value)}
                className="h-10"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deadline" className="text-sm font-medium">
                  Deadline
                </Label>
                <Input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
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
                disabled={isLoading || !task || !lessonId || !classId || !deadline || !time}
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
                    Update Assignment
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
