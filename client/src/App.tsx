import React, { useState } from 'react';
import AppRoutes from './AppRoutes/AppRoutes';
// @ts-ignore
import Login from './Pages/Login/Login';
// @ts-ignore
import Signup from './Pages/Login/Signup';
// @ts-ignore
import { ResourceBookingScreen } from './components/ResourceBookingScreen';
// @ts-ignore
import { MaintenanceManagementScreen } from './components/MaintenanceManagementScreen';
// @ts-ignore
import { AssetAuditScreen } from './components/AssetAuditScreen';
// @ts-ignore
import { ReportsAnalyticsScreen } from './components/ReportsAnalyticsScreen';
// @ts-ignore
import { ActivityLogsScreen } from './components/ActivityLogsScreen';

function App() {
  const mockAssetId = 1;
  const mockAssetName = "Conference Room B2";
  
  // State to easily toggle screens during testing
  const [currentView, setCurrentView] = useState<'dashboard' | 'login' | 'signup'>('dashboard');

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Quick Development Navigation Bar */}
      <nav className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-md">
        <span className="font-bold text-lg tracking-wide text-blue-400">AssetFlow Admin Portal</span>
        <div className="flex gap-4 text-sm font-medium">
          <button 
            onClick={() => setCurrentView('dashboard')} 
            className={`px-3 py-1.5 rounded transition ${currentView === 'dashboard' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
          >
            Dashboard Panels
          </button>
          <button 
            onClick={() => setCurrentView('login')} 
            className={`px-3 py-1.5 rounded transition ${currentView === 'login' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
          >
            Login View
          </button>
          <button 
            onClick={() => setCurrentView('signup')} 
            className={`px-3 py-1.5 rounded transition ${currentView === 'signup' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
          >
            Signup View
          </button>
        </div>
      </nav>

      {/* Conditionally Render the Selected View */}
      <div className="p-4">
        {currentView === 'login' && (
          <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-lg shadow border border-gray-200">
            <Login />
          </div>
        )}

        {currentView === 'signup' && (
          <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-lg shadow border border-gray-200">
            <Signup />
          </div>
        )}

        {currentView === 'dashboard' && (
          <>
            {/* Teammate's Core Navigation Routes */}
            <AppRoutes />
            
            {/* AssetFlow Workspace Panels */}
            <main className="space-y-12 pb-12 mt-6">
              <div className="border-t border-gray-200 pt-6">
                <ResourceBookingScreen selectedAssetId={mockAssetId} assetName={mockAssetName} />
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <MaintenanceManagementScreen />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <AssetAuditScreen />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <ReportsAnalyticsScreen />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <ActivityLogsScreen />
              </div>
            </main>
          </>
        )}
      </div>
    </div>
  );
}

export default App;