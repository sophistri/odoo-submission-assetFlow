import React from 'react';
import { ResourceBookingScreen } from './components/ResourceBookingScreen';

function App() {
  const mockAssetId = 1;
  const mockAssetName = "Conference Room B2";

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <nav className="bg-blue-600 p-4 shadow-md">
        <h1 className="text-white font-bold text-xl tracking-tight">AssetFlow Management Platform</h1>
      </nav>
      <main>
        <ResourceBookingScreen selectedAssetId={mockAssetId} assetName={mockAssetName} />
      </main>
    </div>
  );
}

export default App;