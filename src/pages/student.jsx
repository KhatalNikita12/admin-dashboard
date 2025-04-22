import React from 'react';

const StudentTable = () => {
  const students = [
    { id: 1, name: 'Nikita Khatal', email: 'nikita@example.com', score: 92, status: 'Top Performer' },
    { id: 2, name: 'Sakshi Hase', email: 'sakshi@example.com', score: 88, status: 'Active' },
    { id: 3, name: 'Om Kanawade', email: 'omKanawade@gmail.com', score: 75, status: 'Active' },
    { id: 4, name: 'Prashant Lamkhade', email: 'PrashantLamkhade@gmail.com', score: 64, status: 'Average' },
    { id: 5, name: 'Rushikesh Patne', email: 'RJPatne@gmail.com', score: 59, status: 'Low Performer' },
  ];
  
  return (
    <div className="p-6 dark:bg-gray-900">
      <h2 className="text-xl font-bold mb-4 text-white-800 dark:text-white">Student Performance Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow">
          <thead>
            <tr className="bg-indigo-600 text-white text-left text-sm uppercase tracking-wider">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Score (%)</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const isGray = index % 2 === 0;
              return (
                <tr 
                  key={student.id} 
                  className={isGray ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}
                >
                  <td className="py-2 px-4 text-gray-900 dark:text-gray-200">{student.id}</td>
                  <td className="py-2 px-4 text-gray-900 dark:text-gray-200">{student.name}</td>
                  <td className="py-2 px-4 text-gray-900 dark:text-gray-200">{student.email}</td>
                  <td className="py-2 px-4 font-semibold text-gray-900 dark:text-gray-200">{student.score}%</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        student.status === 'Top Performer'
                          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                          : student.status === 'Active'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                          : student.status === 'Average'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                          : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;