
import Fanlar from "../components/fanlar/Fanlar";
import { HomePage } from "../pages/homePage/HomePage";
import Person from "../components/person/Person";
import SubjectsTable from "../components/subjectTable/SubjectTable";
import TasksTable from "../components/taskTable/TaskTable";

export const routeItem = [
  {
    id: 1,
    element: HomePage,
  },
  {
    id: 2,
    element: Fanlar,
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
  
];
