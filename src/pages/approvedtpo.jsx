import React, { useEffect, useState } from 'react';

const ApprovedTPOList = () => {
  const [approvedTPOs, setApprovedTPOs] = useState([]);

  useEffect(() => {
    const storedTPOs = JSON.parse(localStorage.getItem('tpos')) || [];
    const approved = storedTPOs.filter(tpo => tpo.status === 'approved');
    setApprovedTPOs(approved);
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Approved TPOs with Placement Coordinators</h2>

      {approvedTPOs.length === 0 ? (
        <p className="text-center text-gray-500">No approved TPOs found.</p>
      ) : (
        approvedTPOs.map((tpo, index) => (
          <div key={index} className="mb-8 border border-gray-300 rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-semibold text-blue-700">{tpo.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{tpo.email} | {tpo.campus}</p>

            <h4 className="text-md font-semibold mt-4 text-gray-800 underline">Placement Coordinators:</h4>

            {tpo.placementCoordinators && tpo.placementCoordinators.length > 0 ? (
              <ul className="list-disc list-inside mt-2 space-y-1">
                {tpo.placementCoordinators.map((pc, pcIndex) => (
                  <li key={pcIndex} className="ml-4 text-gray-700">
                    <span className="font-medium">{pc.name}</span> ({pc.department}) - <span className="text-sm text-gray-500">{pc.email}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 mt-1 ml-4">No placement coordinators added yet.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ApprovedTPOList;
