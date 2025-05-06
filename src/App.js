import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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

const MainLayout = ({ themeMode, toggleTheme, sidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const isTpoRegister = location.pathname === '/register-tpo';

  const bgColor = themeMode === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = themeMode === 'dark' ? 'text-white' : 'text-gray-800';

  return (
    <div className={`${themeMode} ${bgColor} ${textColor} min-h-screen flex flex-col`}>
      {  <Header themeMode={themeMode} toggleTheme={toggleTheme} />}

      <div className="flex flex-col md:flex-row flex-1">
        {  (
          <Sidebar
            themeMode={themeMode}
            sidebarOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        )}

        <div className="flex-1 p-4 overflow-y-auto">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tpo" element={<TpoTable />} />
            <Route path="/student" element={<StudentTable />} />
            <Route path="/register-tpo" element={<TPORegisterForm />} />
            <Route path="/verify-tpo" element={<VerifyTpos />} />
            <Route path="/" element={<TPOLogin />} />
            <Route path="/manage" element={<ManageTpos />} />
            <Route path='/approved-tpo' element={<ApprovedTPOList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [themeMode, setThemeMode] = useState('dark');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleTheme = () => {
    setThemeMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
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
