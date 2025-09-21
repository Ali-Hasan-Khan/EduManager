"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { Lessons, Classrooms } from "@prisma/client";
import { storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { deleteFileOnZodError } from "@/actions/deleteFile";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2, FileText, Upload } from "lucide-react";

interface AdProps {
  lessons: Lessons[];
  classrooms: Classrooms[];
}

const Ad = ({ lessons, classrooms }: AdProps) => {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [time, setTime] = useState("");
  const [file, setFile] = useState<File>();
  const [task, setTask] = useState("");
  const [lesson, setLesson] = useState("");
  const [classroom, setClassroom] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 10000000) {
      setFile(files[0]);
      console.log(files[0]);
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "File Too BIG",
      });
    }
  };

  const handleUploadAndAdd = async (e: SyntheticEvent) => {
    setIsLoading(true);
    e.preventDefault();

    if (
      !file ||
      !deadline ||
      !time ||
      !lesson ||
      !teacherId ||
      !classroom ||
      !task
    ) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please fill in all fields and select a file",
      });
      setIsLoading(false);
      return;
    }

    let downloadURL: string | null = null;
    try {
      const name = file.name;
      const storageRef = ref(storage, `file/${lesson}/${classroom}/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      downloadURL = await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.error("Upload failed:", error);
            reject(error);
          },
          async () => {
            console.log("Upload complete");
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(url);
          }
        );
      });

      const response = await axios.post(`/api/assignment`, {
        deadline: deadline,
        time: time,
        lesson: lesson,
        createBy: teacherId,
        classroom: classroom,
        task: task,
        file: downloadURL,
      });
      toast({
        title: "Assignment Added Successfully",
        description: `Assignment: ${response.data.task}`,
      });
      setDeadline("");
      setTime("");
      setLesson("");
      setTask("");
      setClassroom("");
      setFile(undefined);
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
      await deleteFileOnZodError(downloadURL);
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
        <span>Add assignment</span>
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[500px] dark:bg-black bg-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-blue-600" />
              Add Assignment
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Create a new assignment with task details, lesson, classroom, and deadline.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUploadAndAdd} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="task" className="text-sm font-medium">
                Assignment Task
              </Label>
              <Input
                id="task"
                type="text"
                placeholder="Enter assignment task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="h-10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lesson" className="text-sm font-medium">
                Lesson
              </Label>
              <Select
                value={lesson}
                onValueChange={(value) => {
                  const selectedLesson = lessons.find((l) => l.id === value);
                  if (selectedLesson) {
                    setLesson(selectedLesson.id);
                    setTeacherId(selectedLesson.teacherId);
                  }
                }}
                required
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select a lesson" />
                </SelectTrigger>
                <SelectContent>
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
              <Select
                value={classroom}
                onValueChange={setClassroom}
                required
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select a classroom" />
                </SelectTrigger>
                <SelectContent>
                  {classrooms.map((classroom) => (
                    <SelectItem key={classroom.id} value={classroom.id}>
                      {classroom.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

            <div className="space-y-2">
              <Label htmlFor="file" className="text-sm font-medium">
                File Attachment
              </Label>
              <div className="relative">
                <Input
                  id="file"
                  type="file"
                  onChange={(files) => handleSelectedFile(files.target.files)}
                  className="h-10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
                <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                disabled={isLoading || !task || !lesson || !classroom || !deadline || !time || !file}
                className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Assignment
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
