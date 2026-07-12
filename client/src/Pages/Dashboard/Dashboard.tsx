// @ts-ignore
import { ResourceBookingScreen } from '../../components/ResourceBookingScreen';
// @ts-ignore
import { MaintenanceManagementScreen } from '../../components/MaintenanceManagementScreen';
// @ts-ignore
import { AssetAuditScreen } from '../../components/AssetAuditScreen';
// @ts-ignore
import { ReportsAnalyticsScreen } from '../../components/ReportsAnalyticsScreen';
// @ts-ignore
import { ActivityLogsScreen } from '../../components/ActivityLogsScreen';

export default function Dashboard() {
  const mockAssetId = 1;
  const mockAssetName = "Conference Room B2";

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <nav className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-md">
        <span className="font-bold text-lg tracking-wide text-blue-400">AssetFlow Admin Portal</span>
        <a href="/org-setup" className="text-sm font-medium hover:text-blue-400">Organization Setup</a>
      </nav>

      <main className="space-y-12 pb-12">
        <div className="pt-6">
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