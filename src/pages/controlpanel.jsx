import React, { useState, useEffect } from 'react';

const ControlPanel = () => {
  const [settings, setSettings] = useState({
    allowRegistrations: true,
    freezeEdits: false,
  });

  // Load settings from localStorage when component mounts
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('systemSettings'));
    if (stored) {
      setSettings(stored);
    }
  }, []);

  // Update localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('systemSettings', JSON.stringify(settings));
  }, [settings]);

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-700">⚙️ Control Panel</h2>

      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-800">Allow Registrations</span>
        <button
          onClick={() => toggleSetting('allowRegistrations')}
          className={`px-4 py-1 rounded text-white ${settings.allowRegistrations ? 'bg-green-600' : 'bg-red-500'}`}
        >
          {settings.allowRegistrations ? 'Enabled' : 'Disabled'}
        </button>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-800">Freeze All Student Edits</span>
        <button
          onClick={() => toggleSetting('freezeEdits')}
          className={`px-4 py-1 rounded text-white ${settings.freezeEdits ? 'bg-red-600' : 'bg-green-500'}`}
        >
          {settings.freezeEdits ? 'Frozen' : 'Active'}
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
