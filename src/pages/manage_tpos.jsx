import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageTpos = () => {
  const [tpos, setTpos] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    campus: '',
    status: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedTpos = JSON.parse(localStorage.getItem('tpos')) || [];
    setTpos(storedTpos); // Show all TPOs (approved, pending, rejected)
  }, []);

  const updateLocalStorage = (updatedTpos) => {
    localStorage.setItem('tpos', JSON.stringify(updatedTpos));
    setTpos(updatedTpos);
  };

  const handleEdit = (index) => {
    setFormData(tpos[index]);
    setEditingIndex(index);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updated = [...tpos];
    updated[editingIndex] = {
      ...updated[editingIndex],
      name: formData.name,
      campus: formData.campus,
      status: formData.status,
    };
    updateLocalStorage(updated);
    setEditingIndex(null);
    setFormData({ name: '', email: '', campus: '', status: '' });
  };

  const handleDelete = (index) => {
    const updated = tpos.filter((_, i) => i !== index);
    updateLocalStorage(updated);
    toast.warn('TPO deleted successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Manage TPOs</h2>

      {editingIndex !== null && (
        <form onSubmit={handleUpdate} className="space-y-3 mb-6 text-gray-700">
          <input
            name="name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full border p-2 rounded text-gray-700"
            placeholder="Name"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
            placeholder="Email"
          />
       <select
  name="campus"
  className="w-full p-3 border rounded-lg text-black"
  value={formData.campus}
  onChange={e => setFormData({ ...formData, campus: e.target.value })}
  required
>
  <option value="" disabled>Select Campus</option>
  <option value="ICCS Universe">ICCS Universe</option>
  <option value="ICCS Unity">ICCS Unity</option>
  <option value="ICEM">ICEM</option>
  <option value="Indira MBA">Indira MBA</option>
</select>

          <select
            name="status"
            value={formData.status}
            onChange={e => setFormData({ ...formData, status: e.target.value })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">Update TPO</button>
        </form>
      )}

      <div>
        {tpos.length === 0 ? (
          <p className="text-gray-500">No TPOs found.</p>
        ) : (
          tpos.map((tpo, index) => (
            <div key={index} className="border p-4 rounded mb-3 shadow">
              <p className="text-gray-600"><strong >Name:</strong> {tpo.name}</p>
              <p className="text-gray-600"><strong>Email:</strong> {tpo.email}</p>
              <p className="text-gray-600"><strong>Campus:</strong> {tpo.campus}</p>
              <p className="text-gray-600"><strong>Status:</strong> {tpo.status}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
};

export default ManageTpos;
