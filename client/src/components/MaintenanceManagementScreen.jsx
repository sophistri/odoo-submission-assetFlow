import React, { useState } from 'react';

export function MaintenanceManagementScreen() {
  const [tickets, setTickets] = useState([
    { id: 101, asset: 'Conference Room B2', type: 'Electrical', status: 'In Progress', priority: 'High', date: '2026-07-10' },
    { id: 102, asset: 'Main Office AC Unit', type: 'HVAC', status: 'Pending', priority: 'Critical', date: '2026-07-12' },
    { id: 103, asset: 'HQ Projector System', type: 'Hardware', status: 'Resolved', priority: 'Low', date: '2026-07-08' }
  ]);

  const [assetName, setAssetName] = useState('');
  const [issueType, setIssueType] = useState('Hardware');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTicket = {
      id: Date.now(),
      asset: assetName,
      type: issueType,
      status: 'Pending',
      priority: priority,
      date: new Date().toISOString().split('T')[0]
    };

    setTickets([newTicket, ...tickets]);
    setSuccess(true);

    // Reset Form
    setAssetName('');
    setDescription('');
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-gray-50 min-h-screen font-sans">
      
      {/* Left 2 Columns: Maintenance Work Orders */}
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Active Maintenance Log</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm font-semibold text-gray-600 bg-gray-50">
                <th className="p-3">ID</th>
                <th className="p-3">Asset Description</th>
                <th className="p-3">Category</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="p-3 font-mono text-gray-500">#{ticket.id.toString().slice(-3)}</td>
                  <td className="p-3 font-medium text-gray-900">{ticket.asset}</td>
                  <td className="p-3">{ticket.type}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      ticket.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                      ticket.priority === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                      ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right 1 Column: File Ticket Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Report Asset Malfunction</h3>
        
        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 text-sm rounded font-medium">
            Ticket submitted to engineering crew successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Asset Name</label>
            <input 
              type="text" 
              placeholder="e.g. Printer Room 3"
              className="w-full p-2 border border-gray-300 rounded outline-none text-gray-800"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issue Class</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded outline-none text-gray-800 bg-white"
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
              >
                <option value="Hardware">Hardware</option>
                <option value="Electrical">Electrical</option>
                <option value="HVAC">HVAC</option>
                <option value="Facilities">Facilities</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded outline-none text-gray-800 bg-white"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fault Symptoms Description</label>
            <textarea 
              rows="3"
              placeholder="Describe what went wrong..."
              className="w-full p-2 border border-gray-300 rounded outline-none text-gray-800 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition shadow-sm"
          >
            Dispatch Maintenance Ticket
          </button>
        </form>
      </div>

    </div>
  );
}