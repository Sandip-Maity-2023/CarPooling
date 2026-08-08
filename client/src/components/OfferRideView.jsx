import React, { useState, useEffect } from 'react';
import { Search, ArrowUpDown, Calendar, Users, IndianRupee, Car, Plus, AlertTriangle } from 'lucide-react';

export const OfferRideView = ({
  currentUser,
  onSwitchToFind,
  onNavigateToVehicles,
  onPublishSuccess,
}) => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [startLocation, setStartLocation] = useState('Iskcon Cross Road, Ahmedabad');
  const [destinationLocation, setDestinationLocation] = useState('Infocity, Gandhinagar');
  const [date, setDate] = useState('2026-07-18T17:12');
  const [availableSeats, setAvailableSeats] = useState(4);
  const [farePerSeat, setFarePerSeat] = useState(120);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, [currentUser]);

  const fetchVehicles = async () => {
    try {
      const res = await fetch(`/api/vehicles?userId=${currentUser._id}`);
      const data = await res.json();
      setVehicles(data);
      if (data.length > 0) {
        setSelectedVehicleId(data[0]._id);
      }
    } catch (err) {
      console.error('Failed to fetch vehicles', err);
    }
  };

  const handleSwap = () => {
    const temp = startLocation;
    setStartLocation(destinationLocation);
    setDestinationLocation(temp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (vehicles.length === 0) {
      setError('You must register at least one vehicle before publishing a ride.');
      return;
    }

    const selectedVeh = vehicles.find((v) => v._id === selectedVehicleId) || vehicles[0];

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/rides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          driverId: currentUser._id,
          driverName: currentUser.name,
          driverAvatar: currentUser.avatar,
          vehicleModel: selectedVeh?.model || 'Swift Dzire',
          vehicleNumber: selectedVeh?.registrationNumber || 'GJ01AB1234',
          startLocation,
          destinationLocation,
          departureTime: '07:00 PM 18/July/26',
          availableSeats,
          farePerSeat,
          recurringDays: ['Mo', 'Tu', 'We', 'Th', 'Fr'],
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to publish ride');
      }

      onPublishSuccess();
    } catch (err) {
      setError(err.message || 'Error publishing ride');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="bg-white sketch-border p-6 sm:p-8">
        {/* Toggle Bar matching Wireframe */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-300 mb-8">
          <button
            type="button"
            onClick={onSwitchToFind}
            className="py-2.5 rounded-lg font-sketch text-lg font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Find Ride
          </button>
          <button
            type="button"
            className="py-2.5 rounded-lg font-sketch text-lg font-bold bg-white text-blue-600 shadow border border-slate-300"
          >
            Offer Ride
          </button>
        </div>

        {/* Vehicle check prompt */}
        {vehicles.length === 0 && (
          <div className="mb-6 bg-amber-50 border-2 border-amber-400 p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <p className="font-sketch font-bold text-amber-900">
                  No Registered Vehicle Found
                </p>
                <p className="text-xs text-amber-800 font-mono">
                  Before publishing a ride, drivers must register at least one vehicle.
                </p>
              </div>
            </div>
            <button
              onClick={onNavigateToVehicles}
              className="sketch-button bg-amber-600 hover:bg-amber-700 px-3 py-1.5 text-xs font-sketch font-bold shrink-0 flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Vehicle</span>
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Offer Ride Form matching wireframe layout */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative space-y-4">
            {/* Start Location */}
            <div>
              <label className="block font-sketch text-sm font-bold text-slate-700 mb-1">
                Start Location
              </label>
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  required
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  placeholder="Enter Your location"
                  className="w-full pl-10 pr-10 py-2.5 sketch-input font-mono text-sm"
                />
              </div>
            </div>

            {/* Swap Button (⇅) */}
            <div className="absolute right-2 top-[38%] -translate-y-1/2 z-10">
              <button
                type="button"
                onClick={handleSwap}
                title="Swap Locations"
                className="p-2 bg-slate-100 hover:bg-slate-200 border-2 border-slate-700 rounded-full shadow transition-transform active:scale-90"
              >
                <ArrowUpDown className="w-4 h-4 text-slate-800" />
              </button>
            </div>

            {/* Destination Location */}
            <div>
              <label className="block font-sketch text-sm font-bold text-slate-700 mb-1">
                Destination Location
              </label>
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  required
                  value={destinationLocation}
                  onChange={(e) => setDestinationLocation(e.target.value)}
                  placeholder="Enter Drop location"
                  className="w-full pl-10 pr-10 py-2.5 sketch-input font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Selector */}
          {vehicles.length > 0 && (
            <div>
              <label className="block font-sketch text-sm font-bold text-slate-700 mb-1">
                Select Vehicle
              </label>
              <div className="relative">
                <Car className="w-5 h-5 absolute left-3 top-3 text-slate-500" />
                <select
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 sketch-input font-mono text-sm bg-white"
                >
                  {vehicles.map((v) => (
                    <option key={v._id} value={v._id}>
                      {v.model} ({v.registrationNumber}) - {v.seatingCapacity} seats
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Date & Time, Seats, and Fare per seat */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block font-sketch text-sm font-bold text-slate-700 mb-1">
                Departure Time
              </label>
              <div className="relative">
                <Calendar className="w-5 h-5 absolute left-3 top-3 text-slate-500" />
                <input
                  type="datetime-local"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 sketch-input font-mono text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-sketch text-sm font-bold text-slate-700 mb-1">
                Available Seats
              </label>
              <div className="relative">
                <Users className="w-5 h-5 absolute left-3 top-3 text-slate-500" />
                <select
                  value={availableSeats}
                  onChange={(e) => setAvailableSeats(Number(e.target.value))}
                  className="w-full pl-10 pr-3 py-2.5 sketch-input font-mono text-sm bg-white"
                >
                  <option value={1}>Seat 1</option>
                  <option value={2}>Seat 2</option>
                  <option value={3}>Seat 3</option>
                  <option value={4}>Seat 4</option>
                  <option value={5}>Seat 5</option>
                  <option value={6}>Seat 6</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-sketch text-sm font-bold text-slate-700 mb-1">
                Fare Per Seat (₹)
              </label>
              <div className="relative">
                <IndianRupee className="w-5 h-5 absolute left-3 top-3 text-slate-500" />
                <input
                  type="number"
                  required
                  min={10}
                  value={farePerSeat}
                  onChange={(e) => setFarePerSeat(Number(e.target.value))}
                  placeholder="120"
                  className="w-full pl-10 pr-3 py-2.5 sketch-input font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div className="text-right text-xs font-mono text-slate-500 italic">
            ₹ {farePerSeat} / Seat · {availableSeats} Available
          </div>

          {/* Publish Ride Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || vehicles.length === 0}
              className="w-full sketch-button py-3 font-sketch text-xl font-bold tracking-wide"
            >
              {loading ? 'Publishing Ride...' : 'Publish Ride'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
