import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes/AppRoutes';
// @ts-ignore
import { ResourceBookingScreen } from './components/ResourceBookingScreen';

function App() {
  const mockAssetId = 1;
  const mockAssetName = "Conference Room B2";

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Keeping your teammate's routes active */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      
      {/* Displaying your AssetFlow booking module below */}
      <main className="border-t border-gray-300 mt-6">
        <ResourceBookingScreen selectedAssetId={mockAssetId} assetName={mockAssetName} />
      </main>
    </div>
  );
}

export default App;