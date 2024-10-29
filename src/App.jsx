// import Havola from './pages/homePage/havola/Havola'
// import Darsjadvali from './components/darsjagvali/Darsjadvali'
// import Fanlar from './components/fanlar/Fanlar'
// import Footer from './components/footer/Footer'
// import { HomePage } from './pages/homePage/HomePage'
// import { MenuBar } from './components/menubar/MenuBar'
// import Login from './pages/login/Login'
// import Login2 from './pages/login2/Login2'

import { MetroLayout } from "./layout/metro-layout";
import Login from "./pages/login/Login";

import { Route, Routes } from "react-router-dom";
import { routeItem } from "./routes/route";
import { NotFound } from "./components/notFound/not-found";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/metro" element={<MetroLayout />}>
          {routeItem.map(({ id, path, element: Element }) => (
            <Route
              path={path}
              key={id}
              index={path ? false : true}
              element={<Element />}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
