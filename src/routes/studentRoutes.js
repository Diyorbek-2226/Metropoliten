// src/routes/studentRoutes.js
import HomePage from "./../pages/homePage/HomePage";
import Table from "./../components/Table/Table";
import Person from "./../components/person/Person";
import SubjectsTable from "./../components/subjectTable/SubjectTable";
import TasksTable from "./../components/taskTable/TaskTable";
import Library from "./../components/libery/Libery";
import ChildrenLibrary from "./../components/childrenLibery/ChildrenLibery";
import TestTable from "./../components/testTable/TestTable";
import Quiz from "./../components/quiz/Quiz";

const studentRoutes = [
  { id: 1, path: "/student", element: HomePage },
  { id: 2, path: "/student/havola", element: Table },
  { id: 3, path: "/student/person", element: Person },
  { id: 4, path: "/student/tasks", element: SubjectsTable },
  { id: 5, path: "/student/tasktable", element: TasksTable },
  { id: 6, path: "/student/liberary", element: Library },
  { id: 7, path: "/student/liberary/liberys", element: ChildrenLibrary },
  { id: 8, path: "/student/testtable", element: TestTable },
  { id: 9, path: "/student/testtable/quiz", element: Quiz },
];

export default studentRoutes;
