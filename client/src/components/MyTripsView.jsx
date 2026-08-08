import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageSquare, Phone, Navigation, IndianRupee, MapPin, CheckCircle, Car } from 'lucide-react';
import { ChatCallModal } from './ChatCallModal.jsx';

export const MyTripsView = ({
  currentUser,
  onTrackRide,
  onPayTrip,
  onBack,
}) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChatModal, setActiveChatModal] = useState(null);
  const [selectedFinishTrip, setSelectedFinishTrip] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/trips');
      const data = await res.json();
      setTrips(data);
    } catch (err) {
      console.error('Error fetching trips', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <div className="bg-white sketch-border p-6">
        {/* Header matching Wireframe */}
        <div className="flex items-center justify-between border-b-2 border-slate-700 pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 font-sketch font-bold text-slate-700 hover:text-blue-600 text-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>My Trips</span>
            </button>
          </div>

          <h1 className="font-sketch text-2xl font-bold text-slate-900">
            {selectedFinishTrip ? 'Trip Finish' : 'My Trips - Trip Details'}
          </h1>
        </div>

        {/* TRIP FINISH WIREFRAME VIEW */}
        {selectedFinishTrip ? (
          <div className="max-w-2xl mx-auto bg-slate-50 border-2 border-slate-700 p-8 rounded-2xl shadow-[4px_4px_0px_#1e293b] text-center space-y-6">
            <div className="flex justify-between items-start border-b border-slate-300 pb-4">
              <div className="text-left">
                <h2 className="font-sketch text-3xl font-bold text-slate-900">
                  {selectedFinishTrip.startLocation} to {selectedFinishTrip.destinationLocation}
                </h2>
                <p className="font-mono text-xs text-slate-500 mt-1">
                  {selectedFinishTrip.departureTime}
                </p>
              </div>
              <span className="bg-amber-100 text-amber-800 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold font-mono">
                Payment Pending
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="bg-white p-3 rounded-xl border border-slate-300">
                <p className="font-sketch text-xs text-slate-500 uppercase font-bold">Pick UP Point</p>
                <p className="font-mono text-sm font-bold text-slate-800 mt-0.5">{selectedFinishTrip.pickupPoint}</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-300">
                <p className="font-sketch text-xs text-slate-500 uppercase font-bold">Drop Point</p>
                <p className="font-mono text-sm font-bold text-slate-800 mt-0.5">{selectedFinishTrip.dropPoint}</p>
              </div>
            </div>

            <div className="py-4 bg-blue-50 border-2 border-blue-300 rounded-xl">
              <span className="font-sketch text-lg text-slate-600 block">Total Ride Fare</span>
              <span className="font-sketch text-5xl font-extrabold text-blue-700">
                ₹ {selectedFinishTrip.fare}
              </span>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setSelectedFinishTrip(null)}
                className="w-1/3 sketch-button bg-slate-200 text-slate-800 border-slate-400 hover:bg-slate-300 py-3 font-sketch font-bold"
              >
                Back
              </button>
              <button
                onClick={() => {
                  const t = selectedFinishTrip;
                  setSelectedFinishTrip(null);
                  onPayTrip(t);
                }}
                className="w-2/3 sketch-button bg-green-600 hover:bg-green-700 py-3 font-sketch text-xl font-bold"
              >
                Pay Now →
              </button>
            </div>
          </div>
        ) : (
          /* MY TRIPS LIST VIEW matching wireframe */
          <div>
            {loading ? (
              <div className="py-12 text-center font-sketch text-xl text-slate-600">
                Loading your trips...
              </div>
            ) : trips.length === 0 ? (
              <div className="py-12 text-center font-sketch text-lg text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300 p-8">
                No active or past trips found. Use Find Ride to book a journey!
              </div>
            ) : (
              <div className="space-y-6">
                {trips.map((trip) => (
                  <div
                    key={trip._id}
                    className="bg-slate-50 border-2 border-slate-700 rounded-2xl p-5 shadow-[3px_3px_0px_#1e293b] space-y-4"
                  >
                    {/* Header: Driver Name & Time */}
                    <div className="flex flex-wrap items-center justify-between border-b border-slate-300 pb-3 gap-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-sketch font-bold flex items-center justify-center border-2 border-slate-700">
                          {trip.driverName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-sketch font-bold text-xl text-slate-900">
                            {trip.driverName}
                          </h3>
                          <p className="font-sketch text-sm text-slate-600">
                            {trip.startLocation} to {trip.destinationLocation}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-xs text-slate-600 block">
                          {trip.departureTime}
                        </span>
                        <span className={`inline-block mt-1 font-mono text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                          trip.status === 'In Progress'
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : trip.status === 'Payment Pending'
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : 'bg-blue-100 text-blue-800 border-blue-300'
                        }`}>
                          Status: {trip.status}
                        </span>
                      </div>
                    </div>

                    {/* Vehicle & Pickup/Drop Points matching wireframe */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                      <div className="bg-white p-2.5 rounded-lg border border-slate-300 flex items-center space-x-2">
                        <Car className="w-4 h-4 text-blue-600 shrink-0" />
                        <div>
                          <span className="text-slate-400 block">Vehicle</span>
                          <span className="font-bold text-slate-800">{trip.vehicleModel} ({trip.vehicleNumber})</span>
                        </div>
                      </div>

                      <div className="bg-white p-2.5 rounded-lg border border-slate-300 flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-green-600 shrink-0" />
                        <div>
                          <span className="text-slate-400 block">Pick UP Point</span>
                          <span className="font-bold text-slate-800">{trip.pickupPoint}</span>
                        </div>
                      </div>

                      <div className="bg-white p-2.5 rounded-lg border border-slate-300 flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                        <div>
                          <span className="text-slate-400 block">Drop Point</span>
                          <span className="font-bold text-slate-800">{trip.dropPoint}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons & Fare matching wireframe */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setActiveChatModal({ type: 'chat', trip })}
                          className="sketch-button bg-slate-800 hover:bg-slate-900 px-3.5 py-1.5 font-sketch text-xs font-bold flex items-center space-x-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Chat with Driver</span>
                        </button>

                        <button
                          onClick={() => setActiveChatModal({ type: 'call', trip })}
                          className="sketch-button bg-slate-700 hover:bg-slate-800 px-3.5 py-1.5 font-sketch text-xs font-bold flex items-center space-x-1"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call To Driver</span>
                        </button>

                        {trip.status === 'In Progress' && (
                          <button
                            onClick={() => onTrackRide(trip)}
                            className="sketch-button bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 font-sketch text-xs font-bold flex items-center space-x-1"
                          >
                            <Navigation className="w-3.5 h-3.5" />
                            <span>Track Live Ride</span>
                          </button>
                        )}
                      </div>

                      <div className="flex items-center space-x-3">
                        <span className="font-sketch font-bold text-lg text-slate-900">
                          ₹ {trip.fare} / Seat 1
                        </span>

                        {(trip.status === 'Payment Pending' || trip.status === 'In Progress') && (
                          <button
                            onClick={() => setSelectedFinishTrip(trip)}
                            className="sketch-button bg-green-600 hover:bg-green-700 px-4 py-1.5 font-sketch text-sm font-bold"
                          >
                            Pay Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Interactive Chat / Call Modal */}
      {activeChatModal && (
        <ChatCallModal
          type={activeChatModal.type}
          driverName={activeChatModal.trip.driverName}
          driverPhone={activeChatModal.trip.driverPhone || '+91 9876543210'}
          onClose={() => setActiveChatModal(null)}
        />
      )}
    </div>
  );
};
