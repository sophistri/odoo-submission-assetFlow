import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes/AppRoutes';
// @ts-ignore
import { ResourceBookingScreen } from './components/ResourceBookingScreen';
// @ts-ignore
import { MaintenanceManagementScreen } from './components/MaintenanceManagementScreen';

function App() {
  const mockAssetId = 1;
  const mockAssetName = "Conference Room B2";

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Keeping your teammate's routes active */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      
      {/* Displaying AssetFlow Core Modules */}
      <main className="space-y-12 pb-12">
        <div>
          <ResourceBookingScreen selectedAssetId={mockAssetId} assetName={mockAssetName} />
        </div>
        
        <div className="border-t border-gray-300 pt-6">
          <MaintenanceManagementScreen />
        </div>
      </main>
    </div>
  );
}

export default App;