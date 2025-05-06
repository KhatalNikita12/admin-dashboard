import React, { useEffect, useState } from 'react';

const VerifyTpos = () => {
  const [tpos, setTpos] = useState([]);

  useEffect(() => {
    const storedTPOs = JSON.parse(localStorage.getItem('tpos')) || [];
    setTpos(storedTPOs);
  }, []);

  const updateStatus = (email, newStatus) => {
    const updatedTPOs = tpos.map((tpo) =>
      tpo.email === email ? { ...tpo, status: newStatus } : tpo
    );
    setTpos(updatedTPOs);
    localStorage.setItem('tpos', JSON.stringify(updatedTPOs));
  };

  // Only show TPOs with "pending" status
  const pendingTPOs = tpos.filter((tpo) => tpo.status === 'pending');

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-500">Admin Panel - Approve TPOs</h2>
      {pendingTPOs.length === 0 ? (
        <p className="text-center text-gray-500">No TPOs Pending Approval.</p>
      ) : (
        pendingTPOs.map((tpo, index) => (
          <div key={index} className="border p-4 mb-4 rounded-md text-gray-500">
            <p><strong>Name:</strong> {tpo.name}</p>
            <p><strong>Email:</strong> {tpo.email}</p>
            <p><strong>Campus:</strong> {tpo.campus}</p>
            <p><strong>Status:</strong>
              <span className="ml-2 text-yellow-600">{tpo.status}</span>
            </p>
            <div className="mt-2 flex gap-4">
              <button onClick={() => updateStatus(tpo.email, 'approved')} className="bg-green-500 text-white px-4 py-2 rounded-md">Approve</button>
              <button onClick={() => updateStatus(tpo.email, 'rejected')} className="bg-red-500 text-white px-4 py-2 rounded-md">Reject</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default VerifyTpos;
