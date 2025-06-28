"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { LessonCategory } from "@prisma/client";
import { Teachers } from "@prisma/client";
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
import { Edit, Loader2, BookOpen } from "lucide-react";

type Lesson = {
  id: string;
  cat: LessonCategory;
  name: string;
  teacherId: string;
};

interface EdtProps {
  lesson: Lesson;
  teachers: Teachers[];
}

const Edt = ({ lesson, teachers }: EdtProps) => {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(lesson.name || "");
  const [cat, setCat] = useState<LessonCategory>(lesson.cat);
  const [teacherId, setTeacher] = useState(lesson.teacherId || "");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (
        name === lesson.name &&
        cat === lesson.cat &&
        teacherId === lesson.teacherId
      ) {
        setIsLoading(false);
        setShowModal(false);
        return;
      }
      const response = await axios.patch(`/api/lesson/${lesson.id}`, {
        name: name,
        cat: cat,
        teacherId: teacherId,
      });
      toast({
        title: "Lesson Updated Successfully",
        description: `Lesson: ${response.data.name}`,
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
        <span className="sr-only">Edit lesson</span>
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px] dark:bg-black bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-yellow-600" />
              Edit Lesson
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Update lesson information for {lesson.name}.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Lesson Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter lesson name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cat" className="text-sm font-medium">
                Category
              </Label>
              <Select value={cat} onValueChange={(value) => setCat(value as LessonCategory)}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="dark:bg-black bg-white">
                  <SelectItem value={LessonCategory.ART}>Art</SelectItem>
                  <SelectItem value={LessonCategory.LANGUANGES}>Languages</SelectItem>
                  <SelectItem value={LessonCategory.SCIENCE}>Science</SelectItem>
                  <SelectItem value={LessonCategory.SPORT}>Sport</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="teacher" className="text-sm font-medium">
                Teacher
              </Label>
              <Select value={teacherId} onValueChange={setTeacher}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent className="dark:bg-black bg-white">
                  {teachers.map((teacher) => (
                    <SelectItem key={teacher.userId} value={teacher.userId}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                disabled={isLoading || !name || !cat || !teacherId}
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
                    Update Lesson
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
