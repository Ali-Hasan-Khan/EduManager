"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { LessonCategory, Teachers } from "@prisma/client";
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
import { Plus, Loader2, BookOpen } from "lucide-react";

const Ad = ({ teachers }: { teachers: Teachers[] }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [cat, setCat] = useState("");
  const [teacher, setTeacher] = useState("");
  const router = useRouter();

  const handleAdd = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/lesson`, {
        name: name,
        cat: cat,
        teacher: teacher,
      });
      toast({
        title: "Lesson Added Successfully",
        description: `Lesson: ${response.data.name}`,
      });
      setName("");
      setCat("");
      setTeacher("");
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
        <span>Add lesson</span>
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px] dark:bg-black bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-green-600" />
              Add Lesson
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Create a new lesson with name, category, and assigned teacher.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAdd} className="space-y-4">
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
              <Select value={cat} onValueChange={setCat}>
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
              <Select value={teacher} onValueChange={setTeacher}>
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
                disabled={isLoading || !name || !cat || !teacher}
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
                    Create Lesson
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
