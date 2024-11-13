// src/routes/studentRoutes.js
// import HomePage from "./../pages/homePage/HomePage";
// import Table from "./../components/studentcomponent/Table/Table";
// import Person from "./../components/studentcomponent/person/Person";
// import SubjectsTable from "./../components/studentcomponent/subjectTable/SubjectTable";
// import TasksTable from "./../components/studentcomponent/taskTable/TaskTable";
// import Library from "./../components/studentcomponent/libery/Libery";
// import ChildrenLibrary from "./../components/studentcomponent/childrenLibery/ChildrenLibery";
// import TestTable from "./../components/studentcomponent/testTable/TestTable";
// import Quiz from "./../components/studentcomponent/quiz/Quiz";
// import TeacherList from "./../components/studentcomponent/teacherList/TeacherList";
import HomePage from "../pages/homePage/HomePage";
import Table from "../components/studentcomponent/Table/Table";
import Person from "../components/studentcomponent/person/Person";
import SubjectsTable from "../components/studentcomponent/subjectTable/SubjectTable";
import TasksTable from "../components/taskTable/TaskTable";
import Library from "../components/studentcomponent/libery/Libery";
import TestTable from "../components/studentcomponent/testTable/TestTable";
import Quiz from "../components/studentcomponent/quiz/Quiz";
import TeacherList from "../components/studentcomponent/teacherList/TeacherList";



const studentRoutes = [
  { id: 1, path: "/student", element: HomePage },
  { id: 2, path: "/student/havola", element: Table },
  { id: 3, path: "/student/person", element: Person },
  { id: 4, path: "/student/tasks", element: SubjectsTable },
  { id: 5, path: "/student/tasktable", element: TasksTable },
  { id: 6, path: "/student/liberary", element: Library },
  { id: 7, path: "/student/testtable", element: TestTable },
  { id: 8, path: "/student/testtable/quiz", element: Quiz },
  { id: 9, path: "/student/teacherlist", element: TeacherList },
];

export default studentRoutes;
