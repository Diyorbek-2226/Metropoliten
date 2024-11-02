import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';

import Login from "./pages/login/Login";
import { MetroLayout } from './layout/metro-layout';
import AdminLayout from './pages/admiLayout/AdminLayout';
import { NotFound } from "./components/notFound/not-found";
import { routeItem } from "./routes/route";
import Footer from './components/footer/Footer';
 // Assuming you have created this component

function App() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const roleFromLogin = localStorage.getItem('userRole'); 
    setUserRole(roleFromLogin);
  }, []);

  if (!userRole) {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      {/* Login Route */}
      <Route path="/" element={<Login setUserRole={setUserRole} />} />
      
      {/* Admin Layout with Suspense */}
      {userRole === 'admin' && (
        <Route path="/admin" element={<AdminLayout />}>
          {routeItem.map(({ id, path, element: Element }) => (
            <Route
              key={id}
              path={path}
              element={
                <Suspense fallback={ <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>}>
                  <Element />
                </Suspense>
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      )}

      {/* Student Layout with Suspense */}
      {userRole === 'student' && (
        <Route path="/student" element={<MetroLayout />}>
          {routeItem.map(({ id, path, element: Element }) => (
            <Route
              key={id}
              path={path}
              element={
                <Suspense fallback={ <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>}>
                  <Element />
                </Suspense>
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      )}

      {/* Teacher Layout with Suspense */}
      {userRole === 'teacher' && (
        <Route path="/teacher" element={<Footer />}>
          {routeItem.map(({ id, path, element: Element }) => (
            <Route
              key={id}
              path={path}
              element={
                <Suspense fallback={ <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>}>
                  <Element />
                </Suspense>
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      )}

      {/* Catch-All Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
