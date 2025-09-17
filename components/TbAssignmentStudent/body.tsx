import React from "react";
import Link from "next/link";

// Type definitions for the assignment data structure
interface Assignment {
  id: string;
  task: string;
  createBy: string;
  fileUrl: string;
  deadline: Date;
  deadlineFormatted: string;
  time: string;
}

interface Lesson {
  id: string;
  name: string;
  assingment: Assignment[];
}

interface AssignmentData {
  id: string;
  name: string;
  lesson: Lesson[];
}

interface TbbodyAssignmentProps {
  data: AssignmentData[];
}

// Component for opening links in new tab
const OpenOnNewTabLink: React.FC<{
  url: string;
  children: React.ReactNode;
}> = ({ url, children }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const TbbodyAssignment: React.FC<TbbodyAssignmentProps> = ({ data }) => {
  return (
    <tbody>
      {data.map((assingmentItem) =>
        assingmentItem.lesson.map((lesson) => (
          <tr key={`${lesson.id}-${lesson.name}`}>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <ul className="font-medium text-black dark:text-white py-5">
                {lesson.name}
              </ul>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <ul className="text-sm text-black dark:text-white py-5">
                {lesson.assingment.map((assignment) => (
                  <li
                    key={assignment.id}
                    className="text-sm text-black dark:text-white py-1.5"
                  >
                    {assignment.task}
                  </li>
                ))}
              </ul>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <ul className="text-sm text-black dark:text-white py-5">
                {lesson.assingment.map((assignment) => (
                  <li
                    key={assignment.id}
                    className="text-sm text-black dark:text-white py-1.5"
                  >
                    {assignment.createBy}
                  </li>
                ))}
              </ul>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <ul className="text-sm text-black dark:text-white py-5">
                {lesson.assingment.map((assignment) => (
                  <li
                    key={assignment.id}
                    className="text-sm text-black dark:text-white py-1.5"
                  >
                    <button className="btnDownload" type="button">
                      <OpenOnNewTabLink url={assignment.fileUrl}>
                        Click Here
                      </OpenOnNewTabLink>
                    </button>
                  </li>
                ))}
              </ul>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <ul className="text-sm text-black dark:text-white py-5">
                {lesson.assingment.map((assignment) => (
                  <li
                    key={assignment.id}
                    className="text-sm text-black dark:text-white py-1.5"
                  >
                    {assignment.deadlineFormatted}
                  </li>
                ))}
              </ul>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <ul className="text-sm text-black dark:text-white py-5">
                {lesson.assingment.map((assignment) => (
                  <li
                    key={assignment.id}
                    className="text-sm text-black dark:text-white py-1.5"
                  >
                    {assignment.time}
                  </li>
                ))}
              </ul>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <ul className="text-sm text-black dark:text-white py-5">
                {lesson.assingment.map((assignment) => {
                  const isLate = new Date() > new Date(assignment.deadline);

                  return (
                    <li
                      key={assignment.id}
                      className="text-sm text-center text-black dark:text-white py-1"
                    >
                      {isLate ? (
                        <div className="bg-red-100 text-red-700 px-2 py-1 rounded">
                          <span>Late</span>
                        </div>
                      ) : (
                        <button className="btnDownload" type="button">
                          <Link href="/student/assignment/submit">
                            Submit
                          </Link>
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </td>
          </tr>
        ))
      )}
    </tbody>
  );
};

export default TbbodyAssignment;
