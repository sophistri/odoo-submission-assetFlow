import React, { useState } from 'react';

export function ActivityLogsScreen() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Critical: AC Unit malfunctioning in Main Office.', type: 'alert', time: '5m ago' },
    { id: 2, message: 'Audit pending for MacBook Pro 16".', type: 'warning', time: '1h ago' },
    { id: 3, message: 'Conference Room B2 successfully booked.', type: 'success', time: '2h ago' }
  ]);

  const [logs] = useState([
    { id: 501, user: 'Sarah Jenkins', action: 'Verified Asset Location', target: 'Dell Monitor 27"', time: '14:22' },
    { id: 502, user: 'David Miller', action: 'Dispatched Ticket', target: 'HQ Projector System', time: '13:05' },
    { id: 503, user: 'Alex Rivera', action: 'Modified Reservation', target: 'Conference Room B2', time: '11:40' },
    { id: 504, user: 'System Agent', action: 'Automated Class Sync', target: 'Inventory Database', time: '09:00' }
  ]);

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-white rounded-lg border border-gray-200 font-sans max-w-6xl mx-auto">
      
      {/* Activity Timeline Logs */}
      <div className="lg:col-span-2 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">System Activity Logs</h2>
          <p className="text-sm text-gray-500">A historical audit trail of all real-time infrastructure actions and changes.</p>
        </div>

        <div className="relative border-l border-gray-200 ml-3 pl-6 space-y-6 mt-4">
          {logs.map((log) => (
            <div key={log.id} className="relative group">
              <div className="absolute -left-[31px] top-1 bg-blue-500 rounded-full h-4 w-4 border-4 border-white shadow-sm group-hover:bg-blue-600 transition-colors" />
              <div className="text-sm">
                <span className="font-semibold text-gray-900">{log.user}</span>{' '}
                <span className="text-gray-600">{log.action.toLowerCase()}</span>{' '}
                <span className="font-medium text-blue-600">{log.target}</span>
                <div className="text-xs text-gray-400 mt-0.5 font-mono">{log.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Notifications Panel */}
      <div className="space-y-4 h-fit">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Alert Center</h3>
          <p className="text-sm text-gray-500">Actionable alerts requiring engineering or management review.</p>
        </div>

        <div className="space-y-3 mt-2">
          {notifications.length === 0 ? (
            <div className="p-4 bg-gray-50 text-gray-500 text-sm text-center rounded border border-dashed">
              Inbox clear! No unread notifications.
            </div>
          ) : (
            notifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`p-3.5 rounded border text-sm flex justify-between items-start gap-3 shadow-sm transition-all ${
                  notif.type === 'alert' ? 'bg-red-50 border-red-200 text-red-800' :
                  notif.type === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' :
                  'bg-green-50 border-green-200 text-green-800'
                }`}
              >
                <div className="space-y-1">
                  <p className="font-medium leading-tight">{notif.message}</p>
                  <span className="block text-xs opacity-60 font-mono">{notif.time}</span>
                </div>
                <button 
                  onClick={() => dismissNotification(notif.id)}
                  className="text-xs font-semibold opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap"
                >
                  Clear ×
                </button>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}