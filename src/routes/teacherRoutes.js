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

const teacherRoutes = [
  { id: 1, path: "/teacher", element: HomePage },
  { id: 2, path: "/teacher/havola", element: Table },
  { id: 3, path: "/teacher/person", element: Person },
  { id: 4, path: "/teacher/tasks", element: SubjectsTable },
  { id: 5, path: "/teacher/tasktable", element: TasksTable },
  { id: 6, path: "/teacher/liberary", element: Library },
  { id: 7, path: "/teacher/liberary/liberys", element: ChildrenLibrary },
  { id: 8, path: "/teacher/testtable", element: TestTable },
  { id: 9, path: "/teacher/testtable/quiz", element: Quiz },
];

export default teacherRoutes;
