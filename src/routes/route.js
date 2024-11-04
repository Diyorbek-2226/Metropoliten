
import { HomePage } from "../pages/homePage/HomePage";
import Person from "../components/person/Person";
import SubjectsTable from "../components/subjectTable/SubjectTable";
import TasksTable from "../components/taskTable/TaskTable";
import Table from "../components/Table/Table";
import Liberary from "../components/libery/Libery";
import ChildrenLibery from "../components/childrenLibery/ChildrenLibery";
import TestTable from "../components/testTable/TestTable";
import Quiz from "../components/quiz/Quiz";
import AdminLayout from "../components/adminLayout/AdminLayout";
export const routeItem = [
  {
    id: 1,
    element: HomePage,
  },
  {
    id: 2,
    element: Table,
    path: "/metro/havola",
  },
  {
    id: 3,
    element: Person,
    path: "/metro/person",
  },
  {
    id: 4,
    element: SubjectsTable,
    path: "/metro/tasks",
  },
  {
    id: 5,
    element: TasksTable,
    path: "/metro/tasktable",
  },
  {
    id: 6,
    element: Liberary,
    path: "/metro/liberary",
  },
  {
    id: 6,
    element: ChildrenLibery,
    path: "/metro/liberary/liberys",
  },
  {
    id: 7,
    element: TestTable,
    path: "/metro/testtable",
  },
  {
    id: 8,
    element: Quiz,
    path: "/metro/testtable/quiz",
  },
  
];

export const routeAdmin = [
  {
    id: 1,
    element: AdminLayout,
    path: "/admin",
  },
];
