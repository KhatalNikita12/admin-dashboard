import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import Sidebar from './components/sidebar';
import Header from './components/header';
import Dashboard from './pages/dashboard';
import TpoTable from './pages/tpo';
import StudentTable from './pages/student';
import TPORegisterForm from './pages/register_top';
import VerifyTpos from './pages/verify_tpo';
import TPOLogin from './pages/Tpologin';
import ManageTpos from './pages/manage_tpos';
import ApprovedTPOList from './pages/approvedtpo';
import ControlPanel from './pages/controlpanel';
import TpoDashboard from './pages/tpodashboard'; // Corrected component name

// ✅ Role-based ProtectedRoute
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return user.role === 'admin' ? (
      <Navigate to="/dashboard" />
    ) : (
      <Navigate to="/tpo-dashboard" />
    );
  }

  return children;
};

const MainLayout = ({ themeMode, toggleTheme, sidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const bgColor = themeMode === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = themeMode === 'dark' ? 'text-white' : 'text-gray-800';

  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role;

  return (
    <div className={`${themeMode} ${bgColor} ${textColor} min-h-screen flex flex-col`}>
      <Header themeMode={themeMode} toggleTheme={toggleTheme} />

      <div className="flex flex-col md:flex-row flex-1">
        {userRole === 'admin' && (
          <Sidebar
            themeMode={themeMode}
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        )}

        <div className="flex-1 p-4 overflow-y-auto">
         
            {/* All your routes remain unchanged */}
              <Routes>
            {/* Public Routes */}
            <Route path="/" element={<TPOLogin />} />
            <Route path="/register-tpo" element={<TPORegisterForm />} />

            {/* Admin Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tpo"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <TpoTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <StudentTable />
                </ProtectedRoute>
              }
            />
            <Route
              path="/verify-tpo"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <VerifyTpos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageTpos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/approved-tpo"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ApprovedTPOList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/controlpanel"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ControlPanel />
                </ProtectedRoute>
              }
            />

            {/* TPO-only Dashboard */}
            <Route
              path="/tpo-dashboard"
              element={
                <ProtectedRoute allowedRoles={['tpo']}>
                  <TpoDashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      
        </div>
      </div>
    </div>
  );
};


const App = () => {
  // const [themeMode, setThemeMode] = useState('dark');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem('themeMode') || 'dark'
  );
  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Router>
      <MainLayout
        themeMode={themeMode}
        toggleTheme={toggleTheme}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </Router>
  );
};

export default App;
