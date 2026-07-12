import React, { useState } from 'react';

export function ReportsAnalyticsScreen() {
  // Mock aggregated metric analytics
  const metrics = [
    { title: 'Total Active Assets', value: '1,248', change: '+4.2%', context: 'vs last month', trend: 'up' },
    { title: 'Utilization Rate', value: '78.4%', change: '+2.1%', context: 'peak hours', trend: 'up' },
    { title: 'Pending Maintenance', value: '14', change: '-3 items', context: 'resolved quick', trend: 'down' },
    { title: 'Monthly Operations Cost', value: '$8,420', change: '+12.5%', context: 'due to AC repairs', trend: 'up' }
  ];

  const breakdownData = [
    { category: 'Workstations & Laptops', count: 640, cost: '$64,000', status: 'Optimal' },
    { category: 'Conference Facilities', count: 42, cost: '$18,500', status: 'High Wear' },
    { category: 'HVAC & Infrastructure', count: 18, cost: '$32,000', status: 'Maintenance Due' },
    { category: 'Office Furniture', count: 548, cost: '$22,000', status: 'Optimal' }
  ];

  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 font-sans max-w-6xl mx-auto space-y-6">
      
      {/* Header section */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">Reports & Operational Analytics</h2>
        <p className="text-sm text-gray-500">Real-time metrics on asset distributions, operational strain, and ecosystem expenses.</p>
      </div>

      {/* Grid Layout: Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{metric.title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
            <div className="flex items-center gap-1.5 mt-2 text-xs">
              <span className={`font-semibold ${metric.trend === 'up' ? 'text-green-600' : 'text-blue-600'}`}>
                {metric.change}
              </span>
              <span className="text-gray-400">{metric.context}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Data Section: Allocation Breakdown */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Inventory Class Distributions</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm font-semibold text-gray-600 bg-gray-50">
                <th className="p-3">Asset Category</th>
                <th className="p-3 text-center">Quantities Tracked</th>
                <th className="p-3">Estimated Valuation</th>
                <th className="p-3">Ecosystem Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {breakdownData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-3 font-medium text-gray-900">{row.category}</td>
                  <td className="p-3 text-center font-mono">{row.count}</td>
                  <td className="p-3 font-mono">{row.cost}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      row.status === 'Optimal' ? 'bg-green-50 text-green-700' :
                      row.status === 'High Wear' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}