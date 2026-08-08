import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { ArrowLeft, MapPin, Search, CheckCircle } from 'lucide-react';

export const RouteConfirmationModal = ({
  startLocation,
  destinationLocation,
  onConfirm,
  onBack,
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Coords for Ahmedabad (Iskcon) to Gandhinagar (Infocity)
  const iskconCoords = [23.0275, 72.5074];
  const infocityCoords = [23.197, 72.628];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView([23.112, 72.567], 11);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      // Custom Pins
      const startIcon = L.divIcon({
        className: 'custom-pin-start',
        html: `<div style="background-color: #2563eb; color: white; padding: 6px 10px; border-radius: 20px; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); font-size: 11px;">📍 Start: Iskcon</div>`,
      });

      const destIcon = L.divIcon({
        className: 'custom-pin-dest',
        html: `<div style="background-color: #dc2626; color: white; padding: 6px 10px; border-radius: 20px; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); font-size: 11px;">🏁 Drop: Infocity</div>`,
      });

      L.marker(iskconCoords, { icon: startIcon }).addTo(map);
      L.marker(infocityCoords, { icon: destIcon }).addTo(map);

      // Route Polyline
      const polylinePoints = [
        iskconCoords,
        [23.05, 72.52],
        [23.09, 72.55],
        [23.14, 72.59],
        infocityCoords,
      ];

      L.polyline(polylinePoints, {
        color: '#2563eb',
        weight: 5,
        opacity: 0.85,
        dashArray: '8, 8',
      }).addTo(map);

      map.fitBounds(L.latLngBounds(iskconCoords, infocityCoords).pad(0.2));

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <div className="bg-white sketch-border p-6">
        {/* Header Breadcrumb matching Wireframe */}
        <div className="flex items-center justify-between border-b-2 border-slate-700 pb-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 font-sketch font-bold text-slate-700 hover:text-blue-600 text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Trip</span>
          </button>

          <h2 className="font-sketch text-2xl font-bold text-slate-900">
            Route Confirmation
          </h2>
        </div>

        {/* Main Content: Left Details & Right Map preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Details Panel */}
          <div className="lg:col-span-4 space-y-6 bg-slate-50 p-5 rounded-xl border border-slate-300">
            <div>
              <label className="block font-sketch text-sm font-bold text-slate-700 mb-1">
                Start Location
              </label>
              <div className="flex items-center space-x-2 bg-white p-2.5 sketch-input font-mono text-sm">
                <Search className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-bold text-slate-800">{startLocation}</span>
              </div>
            </div>

            <div>
              <label className="block font-sketch text-sm font-bold text-slate-700 mb-1">
                Destination Location
              </label>
              <div className="flex items-center space-x-2 bg-white p-2.5 sketch-input font-mono text-sm">
                <Search className="w-4 h-4 text-red-600 shrink-0" />
                <span className="font-bold text-slate-800">{destinationLocation}</span>
              </div>
            </div>

            <div className="pt-2">
              <label className="block font-sketch text-sm font-bold text-slate-700 mb-1">
                Pickup Location Point
              </label>
              <select className="w-full sketch-input font-mono text-sm bg-white">
                <option>Pick up location: Iskcon Circle</option>
                <option>Pick up location: SG Highway Flyover</option>
                <option>Pick up location: Vaishnodevi Circle</option>
              </select>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs font-mono text-blue-800 space-y-1">
              <p>📍 Estimated Distance: 24.5 km</p>
              <p>⏱️ Estimated Travel Time: ~35 mins</p>
            </div>
          </div>

          {/* Right Map Preview Panel matching Wireframe */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="border-2 border-slate-700 rounded-xl overflow-hidden h-[380px] relative shadow-inner">
              <div ref={mapContainerRef} className="w-full h-full z-0" />
            </div>

            {/* Bottom Action Button matching Wireframe */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={onConfirm}
                className="sketch-button px-8 py-3 font-sketch text-xl font-bold flex items-center space-x-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Confirm Route</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
