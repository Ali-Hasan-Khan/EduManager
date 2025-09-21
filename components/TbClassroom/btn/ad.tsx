"use client";
import axios from "axios";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
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
import { Plus, Loader2, Building2 } from "lucide-react";

const Ad = () => {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [cap, setCap] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/classroom`, {
        name: name,
        cap: cap,
      });
      toast({
        title: "Classroom Added Successfully",
        description: `Classroom: ${response.data.name} | Capacity: ${response.data.cap}`,
      });
      setName("");
      setCap("");
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
        <span>Add classroom</span>
      </Button>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px] dark:bg-black bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Building2 className="h-5 w-5 text-green-600" />
              Add Classroom
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Create a new classroom with name and capacity.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Classroom Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter classroom name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cap" className="text-sm font-medium">
                Capacity
              </Label>
              <Input
                id="cap"
                type="number"
                placeholder="Enter capacity"
                value={cap}
                onChange={(e) => setCap(e.target.value)}
                className="h-10"
                required
                min="1"
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
                disabled={isLoading || !name || !cap}
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
                    Create Classroom
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
