import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, User as UserIcon, Calendar, CheckCircle, IndianRupee } from 'lucide-react';

export const AvailableRidesView = ({
  currentUser,
  onBack,
  onBookRide,
}) => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/rides');
      const data = await res.json();
      setRides(data);
    } catch (err) {
      console.error('Error fetching available rides', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="bg-white sketch-border p-6">
        {/* Header matching Wireframe: < Available Ride */}
        <div className="flex items-center justify-between border-b-2 border-slate-700 pb-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 font-sketch font-bold text-slate-700 hover:text-blue-600 text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Available Ride</span>
          </button>

          <span className="font-mono text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">
            {rides.length} Rides Found
          </span>
        </div>

        {loading ? (
          <div className="py-12 text-center font-sketch text-xl text-slate-600">
            Searching for matching employee rides...
          </div>
        ) : rides.length === 0 ? (
          <div className="py-12 text-center font-sketch text-lg text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300 p-8">
            No active rides matching this route at the moment.
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {rides.map((ride) => (
              <div
                key={ride._id}
                className="bg-slate-50 border-2 border-slate-700 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[2px_2px_0px_#1e293b]"
              >
                {/* Left: Driver Avatar & Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={ride.driverAvatar}
                    alt={ride.driverName}
                    className="w-12 h-12 rounded-full border-2 border-slate-700 object-cover shrink-0"
                  />

                  <div>
                    <h3 className="font-sketch font-bold text-lg text-slate-900">
                      {ride.driverName}
                    </h3>
                    <p className="font-sketch text-sm text-slate-600">
                      {ride.startLocation.split(',')[0]} to {ride.destinationLocation.split(',')[0]}
                    </p>
                    <p className="font-mono text-xs text-slate-500 mt-0.5">
                      Vehicle: {ride.vehicleModel} ({ride.vehicleNumber})
                    </p>
                  </div>
                </div>

                {/* Right: Time, Price, Seats, Book button */}
                <div className="flex flex-wrap sm:flex-col items-start sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                  <div className="flex items-center space-x-1 font-mono text-xs text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{ride.departureTime}</span>
                  </div>

                  <div className="font-sketch font-bold text-slate-800 text-sm">
                    ₹ {ride.farePerSeat} / Seat · <span className="text-blue-600">{ride.availableSeats} Available</span>
                  </div>

                  <button
                    onClick={() => onBookRide(ride)}
                    className="sketch-button px-5 py-1.5 font-sketch text-sm font-bold flex items-center space-x-1"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Book now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Refresh Button matching wireframe */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={fetchRides}
            className="sketch-button bg-slate-800 hover:bg-slate-900 px-8 py-2.5 font-sketch text-lg font-bold flex items-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};
