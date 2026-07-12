import AppRoutes from './AppRoutes/AppRoutes';
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

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
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
    </div>
  );
}

export default App;