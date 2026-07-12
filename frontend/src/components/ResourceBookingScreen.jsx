import React, { useState, useEffect } from 'react';

export function ResourceBookingScreen({ selectedAssetId, assetName }) {
  const [bookings, setBookings] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Check overlap locally for this step until your Python server connects
    const hasOverlap = startTime && endTime && startTime < endTime; 
    
    if (!hasOverlap) {
      setErrorMessage('The requested time slot format is invalid.');
      return;
    }

    setSuccessMessage('Resource booked successfully!');
    setBookings([...bookings, {
      id: Date.now(),
      booked_by_id: 101,
      start_time: startTime,
      end_time: endTime,
      status: 'Upcoming'
    }]);
    setStartTime('');
    setEndTime('');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 min-h-screen font-sans">
      
      {/* Left 2 Columns: Schedule View */}
      <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Schedule for {assetName || 'Select a Resource'}
        </h2>
        
        {bookings.length === 0 ? (
          <p className="text-gray-500 italic">No upcoming bookings for this resource.</p>
        ) : (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div key={booking.id} className="p-4 rounded border-l-4 bg-green-50 border-green-500">
                <div className="flex justify-between font-medium text-gray-700">
                  <span>Booked by: Employee #{booking.booked_by_id}</span>
                  <span className="text-xs uppercase px-2 py-0.5 rounded bg-white border border-gray-300">
                    {booking.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {booking.start_time.replace('T', ' ')} to {booking.end_time.replace('T', ' ')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right 1 Column: Reservation Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Reserve Time Slot</h3>
        
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 text-sm rounded font-medium">
            Error: {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 text-green-700 border border-green-200 text-sm rounded font-medium">
            Success: {successMessage}
          </div>
        )}

        <form onSubmit={handleBookingSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
            <input 
              type="datetime-local" 
              className="w-full p-2 border border-gray-300 rounded outline-none text-gray-800"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time</label>
            <input 
              type="datetime-local" 
              className="w-full p-2 border border-gray-300 rounded outline-none text-gray-800"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition"
          >
            Confirm Reservation
          </button>
        </form>
      </div>

    </div>
  );
}