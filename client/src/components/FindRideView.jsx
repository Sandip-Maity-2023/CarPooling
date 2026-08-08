import React, { useState } from 'react';
import { Search, ArrowUpDown, Calendar, Users, Repeat } from 'lucide-react';

export const FindRideView = ({
  onSwitchToOffer,
  onSearch,
}) => {
  const [startLocation, setStartLocation] = useState('Iskcon Cross Road, Ahmedabad');
  const [destinationLocation, setDestinationLocation] = useState('Infocity, Gandhinagar');
  const [date, setDate] = useState('2026-07-18T17:12');
  const [seats, setSeats] = useState(1);
  const [recurringDays, setRecurringDays] = useState(['Mo', 'Tu', 'We', 'Th', 'Fr']);

  const daysList = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const handleSwap = () => {
    const temp = startLocation;
    setStartLocation(destinationLocation);
    setDestinationLocation(temp);
  };

  const toggleDay = (day) => {
    if (recurringDays.includes(day)) {
      setRecurringDays(recurringDays.filter((d) => d !== day));
    } else {
      setRecurringDays([...recurringDays, day]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      startLocation,
      destinationLocation,
      date,
      seats,
      recurringDays,
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="bg-white sketch-border p-6 sm:p-8">
        {/* Toggle Bar matching Wireframe: Find Ride | Offer Ride */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-300 mb-8">
          <button
            type="button"
            className="py-2.5 rounded-lg font-sketch text-lg font-bold bg-white text-blue-600 shadow border border-slate-300"
          >
            Find Ride
          </button>
          <button
            type="button"
            onClick={onSwitchToOffer}
            className="py-2.5 rounded-lg font-sketch text-lg font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Offer Ride
          </button>
        </div>

        {/* Find Ride Form matching wireframe layout */}
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

            {/* Swap Button (⇅) matching wireframe */}
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

          {/* Date & Time and Seats Row matching wireframe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-sketch text-sm font-bold text-slate-700 mb-1">
                Date & Time
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
                Seat Requirement
              </label>
              <div className="relative">
                <Users className="w-5 h-5 absolute left-3 top-3 text-slate-500" />
                <select
                  value={seats}
                  onChange={(e) => setSeats(Number(e.target.value))}
                  className="w-full pl-10 pr-3 py-2.5 sketch-input font-mono text-sm bg-white"
                >
                  <option value={1}>Seat 1</option>
                  <option value={2}>Seat 2</option>
                  <option value={3}>Seat 3</option>
                  <option value={4}>Seat 4</option>
                </select>
              </div>
            </div>
          </div>

          {/* Recurring Ride matching wireframe */}
          <div className="bg-slate-50 p-4 border border-slate-300 rounded-xl">
            <div className="flex items-center space-x-2 mb-2">
              <Repeat className="w-4 h-4 text-blue-600" />
              <span className="font-sketch text-sm font-bold text-slate-800">
                Recurring Ride Schedule
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {daysList.map((day) => {
                const isSelected = recurringDays.includes(day);
                return (
                  <button
                    type="button"
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`px-3 py-1 rounded font-mono text-xs border transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-700 font-bold'
                        : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full sketch-button py-3 font-sketch text-xl font-bold tracking-wide"
            >
              Find Ride
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
