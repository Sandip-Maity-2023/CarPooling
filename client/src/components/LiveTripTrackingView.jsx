import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { ArrowLeft, MessageSquare, Phone, MapPin, Clock, Car, CheckCircle } from 'lucide-react';
import { ChatCallModal } from './ChatCallModal.jsx';

export const LiveTripTrackingView = ({
  trip,
  currentUser,
  onBack,
  onTripCompleted,
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const carMarkerRef = useRef(null);

  const [etaMinutes, setEtaMinutes] = useState(5);
  const [activeModal, setActiveModal] = useState(null);

  // Coords for Ahmedabad (Iskcon) to Gandhinagar (Infocity)
  const routePoints = [
    [23.0275, 72.5074], // Iskcon
    [23.05, 72.52],
    [23.09, 72.55],
    [23.14, 72.59],
    [23.197, 72.628], // Infocity
  ];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView([23.112, 72.567], 11);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // Start & Dest markers
      const startIcon = L.divIcon({
        className: 'custom-pin-start',
        html: `<div style="background-color: #2563eb; color: white; padding: 4px 8px; border-radius: 12px; font-weight: bold; border: 2px solid white; font-size: 10px;">📍 Start: Iskcon</div>`,
      });

      const destIcon = L.divIcon({
        className: 'custom-pin-dest',
        html: `<div style="background-color: #dc2626; color: white; padding: 4px 8px; border-radius: 12px; font-weight: bold; border: 2px solid white; font-size: 10px;">🏁 Drop: Infocity</div>`,
      });

      L.marker(routePoints[0], { icon: startIcon }).addTo(map);
      L.marker(routePoints[routePoints.length - 1], { icon: destIcon }).addTo(map);

      // Route line
      L.polyline(routePoints, {
        color: '#2563eb',
        weight: 6,
        opacity: 0.8,
      }).addTo(map);

      // Moving vehicle marker icon
      const vehicleIcon = L.divIcon({
        className: 'moving-car-icon',
        html: `<div style="background-color: #10b981; color: white; padding: 6px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-size: 16px;">🚗</div>`,
      });

      const carMarker = L.marker(routePoints[0], { icon: vehicleIcon }).addTo(map);
      carMarkerRef.current = carMarker;

      map.fitBounds(L.latLngBounds(routePoints[0], routePoints[routePoints.length - 1]).pad(0.2));
      mapInstanceRef.current = map;
    }

    // Animation interval for vehicle moving along route
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % 100;
      const progress = step / 100;

      // Calculate interpolated lat/lng position
      const totalSegments = routePoints.length - 1;
      const segmentIndex = Math.min(
        Math.floor(progress * totalSegments),
        totalSegments - 1
      );
      const segmentProgress = (progress * totalSegments) - segmentIndex;

      const p1 = routePoints[segmentIndex];
      const p2 = routePoints[segmentIndex + 1];

      const lat = p1[0] + (p2[0] - p1[0]) * segmentProgress;
      const lng = p1[1] + (p2[1] - p1[1]) * segmentProgress;

      if (carMarkerRef.current) {
        carMarkerRef.current.setLatLng([lat, lng]);
      }

      // Update ETA
      const remMins = Math.max(1, Math.round(5 * (1 - progress)));
      setEtaMinutes(remMins);
    }, 1000);

    return () => {
      clearInterval(interval);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleCompleteTrip = async () => {
    try {
      await fetch(`/api/trips/${trip._id}/complete`, {
        method: 'POST',
      });
      onTripCompleted();
    } catch (err) {
      console.error('Failed to complete trip', err);
      onTripCompleted();
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <div className="bg-white sketch-border p-6">
        {/* Header matching Wireframe: < Track Ride */}
        <div className="flex items-center justify-between border-b-2 border-slate-700 pb-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 font-sketch font-bold text-slate-700 hover:text-blue-600 text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Track Ride</span>
          </button>

          <span className="bg-green-100 text-green-800 border border-green-300 px-3 py-1 rounded-full font-mono text-xs font-bold animate-pulse flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-green-600"></span>
            <span>Live Trip Tracking</span>
          </span>
        </div>

        {/* Content Layout matching wireframe */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel: Info & Controls */}
          <div className="lg:col-span-4 space-y-5 bg-slate-50 p-5 rounded-xl border border-slate-300">
            <div>
              <label className="block font-sketch text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Start Location
              </label>
              <div className="font-sketch text-base font-bold text-slate-900 bg-white p-2 rounded border border-slate-300 flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{trip.startLocation}</span>
              </div>
            </div>

            <div>
              <label className="block font-sketch text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                Destination Location
              </label>
              <div className="font-sketch text-base font-bold text-slate-900 bg-white p-2 rounded border border-slate-300 flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                <span>{trip.destinationLocation}</span>
              </div>
            </div>

            {/* Driver & Vehicle Details */}
            <div className="p-3 bg-white rounded-lg border border-slate-300 space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold font-sketch flex items-center justify-center border border-blue-300">
                  {trip.driverName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-sketch font-bold text-slate-900 text-base">
                    {trip.driverName}
                  </h4>
                  <p className="font-mono text-xs text-slate-500">
                    {trip.vehicleModel} ({trip.vehicleNumber})
                  </p>
                </div>
              </div>
            </div>

            {/* Chat & Call Buttons matching wireframe */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveModal('chat')}
                className="sketch-button bg-slate-800 hover:bg-slate-900 py-2.5 px-3 font-sketch text-sm font-bold flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Driver</span>
              </button>

              <button
                onClick={() => setActiveModal('call')}
                className="sketch-button bg-green-600 hover:bg-green-700 py-2.5 px-3 font-sketch text-sm font-bold flex items-center justify-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Driver</span>
              </button>
            </div>

            {/* Finish Trip Action */}
            <div className="pt-2 border-t border-slate-200">
              <button
                onClick={handleCompleteTrip}
                className="w-full sketch-button py-3 font-sketch text-lg font-bold flex items-center justify-center space-x-2 bg-blue-600"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Arrived at Destination (Pay)</span>
              </button>
            </div>
          </div>

          {/* Right Live Map Preview matching Wireframe */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="border-2 border-slate-700 rounded-xl overflow-hidden h-[380px] relative shadow-inner">
              <div ref={mapContainerRef} className="w-full h-full z-0" />

              {/* Dynamic ETA Overlay matching wireframe: "Coming in 5 Minutes" */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white border-2 border-slate-700 px-6 py-2.5 rounded-full shadow-lg font-sketch text-lg font-bold flex items-center space-x-2 z-10 backdrop-blur-sm">
                <Clock className="w-5 h-5 text-amber-400 animate-spin" />
                <span>Coming in {etaMinutes} Minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Chat / Call Modal */}
      {activeModal && (
        <ChatCallModal
          type={activeModal}
          driverName={trip.driverName}
          driverPhone={trip.driverPhone || '+91 9876543210'}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
};
