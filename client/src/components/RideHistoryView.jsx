import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, CheckCircle } from 'lucide-react';

export const RideHistoryView = ({ onBack }) => {
  const [historyTrips, setHistoryTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/trips');
      const data = await res.json();
      // Filter for paid/completed trips
      const completed = data.filter((t) => t.status === 'Paid' || t.status === 'Completed');
      setHistoryTrips(completed);
    } catch (err) {
      console.error('Failed to load ride history', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <div className="bg-white sketch-border p-6">
        {/* Header matching Wireframe: < Ride History */}
        <div className="flex items-center justify-between border-b-2 border-slate-700 pb-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 font-sketch font-bold text-slate-700 hover:text-blue-600 text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Ride History</span>
          </button>

          <span className="font-sketch font-bold text-sm bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-300">
            {historyTrips.length} Completed Rides
          </span>
        </div>

        {loading ? (
          <div className="py-12 text-center font-sketch text-xl text-slate-600">
            Loading ride history...
          </div>
        ) : historyTrips.length === 0 ? (
          <div className="py-12 text-center font-sketch text-lg text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300 p-8">
            No completed rides in your history log yet.
          </div>
        ) : (
          <div className="overflow-x-auto border-2 border-slate-700 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white font-sketch text-sm">
                  <th className="p-3 border-b border-slate-700">Driver / Rider</th>
                  <th className="p-3 border-b border-slate-700">Route</th>
                  <th className="p-3 border-b border-slate-700">Vehicle</th>
                  <th className="p-3 border-b border-slate-700">Date & Time</th>
                  <th className="p-3 border-b border-slate-700">Fare</th>
                  <th className="p-3 border-b border-slate-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-xs">
                {historyTrips.map((trip) => (
                  <tr key={trip._id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900 font-sketch text-base">
                      {trip.driverName}
                    </td>
                    <td className="p-3">
                      <span className="flex items-center space-x-1 font-bold text-blue-700">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>{trip.startLocation} → {trip.destinationLocation}</span>
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">
                      <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-300 font-bold">
                        {trip.vehicleNumber || 'GJ01AB1234'}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">
                      {trip.departureTime}
                    </td>
                    <td className="p-3 font-bold text-slate-900 font-sketch text-base">
                      ₹ {trip.fare}
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center space-x-1 bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full font-bold border border-green-300">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span>{trip.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
