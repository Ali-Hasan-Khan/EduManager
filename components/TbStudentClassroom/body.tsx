import React from "react";
import { PageProps } from "@/types/pagination";
import { getClassroomIdByStudentUserId } from "@/data/student";
import { getClassroomById } from "@/data/classrooms";

const TbodyStudentClassroom = async (props: PageProps) => {
    const classroomId = await getClassroomIdByStudentUserId();

    // Handle the case where the classroomId is null or undefined
    if (!classroomId) {
        return <div>Classroom ID is missing or invalid.</div>;
    }

    // Fetch the classroom data using await
    const classroom = await getClassroomById(classroomId);
    // console.log(classroom);

    // Handle cases where the classroom is not found
    if (!classroom) {
        return <div>Classroom not found.</div>;
    }
    return (
        <>
            <tbody>
                {/* Displaying a single entry */}
                <tr key={classroom.id}>
                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                        <h5 className="font-medium text-black dark:text-white">
                            {classroom.name}
                        </h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-sm  text-black dark:text-white ml-5">
                            {classroom.cap}
                        </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-sm text-black dark:text-white ml-12">
                            {classroom.studentOnclassroom.length}
                        </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-sm text-black dark:text-white ml-12">
                            -
                        </p>
                    </td>
                </tr>
            </tbody>
        </>
    );
};

export default TbodyStudentClassroom;
