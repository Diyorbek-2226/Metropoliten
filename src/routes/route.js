import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import("../pages/homePage/HomePage"));
const Person = lazy(() => import("../components/person/Person"));
const SubjectsTable = lazy(() => import("../components/subjectTable/SubjectTable"));
const TasksTable = lazy(() => import("../components/taskTable/TaskTable"));
const Table = lazy(() => import("../components/Table/Table"));
const Liberary = lazy(() => import("../components/libery/Libery"));
const ChildrenLibery = lazy(() => import("../components/childrenLibery/ChildrenLibery"));
const TestTable = lazy(() => import("../components/testTable/TestTable"));
const Quiz = lazy(() => import("../components/quiz/Quiz"));
const TableTask = lazy(() => import("../components/tableTask/TableTask"));

export const routeItem = [
  {
    id: 1,
    element: HomePage,
    path: "/",
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
    id: 7,
    element: ChildrenLibery,
    path: "/metro/liberary/liberys",
  },
  {
    id: 8,
    element: TestTable,
    path: "/metro/testtable",
  },
  {
    id: 9,
    element: Quiz,
    path: "/metro/testtable/quiz",
  },
  {
    id: 10,
    element: TableTask,
    path: "/metro/tasks/task",
  },
];
