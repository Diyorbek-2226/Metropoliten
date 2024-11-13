// src/routes/studentRoutes.js
import HomePage from "../pages/homePage/HomePage";
import Information from "../components/teachercomponent/information/Information";

// import Table from "./../components/Table/Table";
// import Person from "./../components/person/Person";
// import SubjectsTable from "./../components/subjectTable/SubjectTable";
// import TasksTable from "./../components/taskTable/TaskTable";
// import Library from "./../components/libery/Libery";
// import ChildrenLibrary from "../components/studentcomponent/childrenLibery/ChildrenLibery";
// import TestTable from "./../components/testTable/TestTable";
// import Quiz from "../components/studentcomponent/quiz/Quiz";
import Table from "../components/studentcomponent/Table/Table";

const teacherRoutes = [
  { id: 1, path: "/teacher", element: HomePage },
  { id: 2, path: "/teacher/information", element: Information },
  { id: 3, path: "/teacher/table", element: Table },
  
 
];

export default teacherRoutes;
