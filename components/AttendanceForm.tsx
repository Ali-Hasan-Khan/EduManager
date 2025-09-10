"use client";
import React, { useState } from "react";
import { Check, X, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface Student {
  id: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

interface AttendanceFormProps {
  students: Student[];
  scheduleId: string;
  classId: string;
  lessonId: string;
  date: string;
}

type AttendanceStatus = "present" | "absent";

const AttendanceForm = ({
  students,
  scheduleId,
  classId,
  lessonId,
  date,
}: AttendanceFormProps) => {
  const [attendance, setAttendance] = useState<
    Record<string, AttendanceStatus>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleAttendanceChange = (
    studentId: string,
    status: AttendanceStatus
  ) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const getStatusCount = (status: AttendanceStatus) => {
    return Object.values(attendance).filter((s) => s === status).length;
  };

  const markAllPresent = () => {
    const allPresent = students.reduce(
      (acc, student) => ({
        ...acc,
        [student.id]: "present" as AttendanceStatus,
      }),
      {}
    );
    setAttendance(allPresent);
  };

  const clearAll = () => {
    setAttendance({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(attendance).length === 0) {
      toast({
        title: "No attendance marked",
        description: "Please mark attendance for at least one student.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scheduleId,
          classId,
          lessonId,
          date,
          attendance,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save attendance");
      }
      toast({
        title: "Attendance saved",
        description: `Attendance has been successfully recorded for ${Object.keys(attendance).length} students.`,
      });

      router.push("/teacher/schedule");
    } catch (error: any) {
      console.error("Error saving attendance: ", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to save attendance. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle empty student list
  if (students.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 dark:bg-meta-4 rounded-lg border border-stroke dark:border-strokedark">
        <User className="mx-auto h-12 w-12 text-bodydark2 dark:text-bodydark mb-4" />
        <h3 className="text-lg font-medium text-black dark:text-white mb-2">
          No Students Found
        </h3>
        <p className="text-body dark:text-bodydark">
          There are no students enrolled in this classroom.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {getStatusCount("present")}
          </p>
          <p className="text-sm text-green-600 dark:text-green-400">Present</p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center mb-2">
            <X className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {getStatusCount("absent")}
          </p>
          <p className="text-sm text-red-600 dark:text-red-400">Absent</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 pb-4 border-b border-stroke dark:border-strokedark">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={markAllPresent}
          className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900/20"
        >
          <Check className="h-4 w-4 mr-2" />
          Mark All Present
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={clearAll}
          className="text-bodydark2 hover:text-black dark:text-bodydark dark:hover:text-white border-stroke dark:border-strokedark hover:bg-gray-50 dark:hover:bg-meta-4"
        >
          Clear All
        </Button>
      </div>

      {/* Attendance Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Mark Attendance ({students.length} students)
          </h3>
          {students.map((student) => (
            <div
              key={student.id}
              className={`p-4 border rounded-lg transition-all duration-200 ${
                attendance[student.id]
                  ? "border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800"
                  : "border-stroke bg-white dark:bg-boxdark-2 dark:border-strokedark"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-black dark:text-white">
                    {student.user.name}
                  </p>
                  <p className="text-sm text-body dark:text-bodydark">
                    {student.user.email}
                  </p>
                </div>
                <div className="flex gap-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name={`attendance-${student.id}`}
                      value="present"
                      checked={attendance[student.id] === "present"}
                      onChange={() =>
                        handleAttendanceChange(student.id, "present")
                      }
                      className="sr-only"
                    />
                    <div
                      className={`p-2 rounded-lg border-2 transition-all ${
                        attendance[student.id] === "present"
                          ? "border-green-500 bg-green-500 text-white dark:border-green-400 dark:bg-green-400"
                          : "border-green-200 hover:border-green-300 text-green-600 dark:border-green-700 dark:hover:border-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                      }`}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name={`attendance-${student.id}`}
                      value="absent"
                      checked={attendance[student.id] === "absent"}
                      onChange={() =>
                        handleAttendanceChange(student.id, "absent")
                      }
                      className="sr-only"
                    />
                    <div
                      className={`p-2 rounded-lg border-2 transition-all ${
                        attendance[student.id] === "absent"
                          ? "border-red-500 bg-red-500 text-white dark:border-red-400 dark:bg-red-400"
                          : "border-red-200 hover:border-red-300 text-red-600 dark:border-red-700 dark:hover:border-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      }`}
                    >
                      <X className="h-4 w-4" />
                    </div>
                  </label>
                </div>
              </div>
              {attendance[student.id] && (
                <div className="mt-2 text-sm font-medium">
                  Status:{" "}
                  <span
                    className={`capitalize ${
                      attendance[student.id] === "present"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {attendance[student.id]}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-3 pt-4 border-t border-stroke dark:border-strokedark">
          <Button
            type="submit"
            disabled={isLoading || Object.keys(attendance).length === 0}
            className="flex-1 bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? "Saving..."
              : `Save Attendance (${Object.keys(attendance).length}/${students.length})`}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
            className="border-stroke dark:border-strokedark text-black dark:text-white hover:bg-gray-50 dark:hover:bg-meta-4"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AttendanceForm;
