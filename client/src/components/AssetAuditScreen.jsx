import React, { useState } from 'react';

export function AssetAuditScreen() {
  const [auditItems, setAuditItems] = useState([
    { id: 'A-201', name: 'Dell Monitor 27"', location: 'Floor 2 - Cubicle Area', lastVerified: '2026-05-14', condition: 'Excellent', status: 'Verified' },
    { id: 'A-202', name: 'Ergonomic Desk Chair', location: 'Floor 1 - Conference B2', lastVerified: '2026-06-01', condition: 'Good', status: 'Pending' },
    { id: 'A-203', name: 'MacBook Pro 16"', location: 'Remote - Developer Kit', lastVerified: '2026-04-20', condition: 'Fair', status: 'Flagged' },
  ]);

  const [searchFilter, setSearchFilter] = useState('');

  const handleVerify = (id, newStatus) => {
    setAuditItems(prevItems =>
      prevItems.map(item =>
        item.id === id 
          ? { ...item, status: newStatus, lastVerified: new Date().toISOString().split('T')[0] } 
          : item
      )
    );
  };

  const filteredItems = auditItems.filter(item => 
    item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    item.id.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 font-sans max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Asset Verification & Audit</h2>
          <p className="text-sm text-gray-500">Perform physical inventory checks and resolve location or condition discrepancies.</p>
        </div>
        <input 
          type="text"
          placeholder="Search by ID or Asset Name..."
          className="p-2 border border-gray-300 rounded outline-none text-sm text-gray-700 w-full md:w-64"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-sm font-semibold text-gray-600 bg-gray-50">
              <th className="p-3">Asset ID</th>
              <th className="p-3">Asset Description</th>
              <th className="p-3">Assigned Location</th>
              <th className="p-3">Last Verified</th>
              <th className="p-3">Condition</th>
              <th className="p-3 text-right">Audit Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-3 font-mono font-medium text-blue-600">{item.id}</td>
                <td className="p-3 font-medium text-gray-900">{item.name}</td>
                <td className="p-3 text-gray-500">{item.location}</td>
                <td className="p-3 text-gray-500">{item.lastVerified}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    item.condition === 'Excellent' ? 'bg-green-50 text-green-700' :
                    item.condition === 'Good' ? 'bg-blue-50 text-blue-700' : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    {item.condition}
                  </span>
                </td>
                <td className="p-3 text-right">
                  {item.status === 'Pending' ? (
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleVerify(item.id, 'Verified')}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded shadow-sm transition"
                      >
                        Verify Match
                      </button>
                      <button 
                        onClick={() => handleVerify(item.id, 'Flagged')}
                        className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium rounded shadow-sm transition"
                      >
                        Flag Issue
                      </button>
                    </div>
                  ) : (
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                      item.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}