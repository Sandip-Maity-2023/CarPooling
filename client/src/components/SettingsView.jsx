import React, { useState } from 'react';
import { ArrowLeft, Route, Car, CreditCard, Clock, MapPin, HelpCircle, MessageSquare, Plus, Save } from 'lucide-react';

export const SettingsView = ({ onNavigateTab, onBack }) => {
  const [savedPlaces, setSavedPlaces] = useState([
    { id: 1, name: 'Home Location', address: 'Iskcon Cross Road, Ahmedabad' },
    { id: 2, name: 'Office Location', address: 'Infocity Gate 1, Gandhinagar' },
  ]);

  const [newPlaceName, setNewPlaceName] = useState('');
  const [newPlaceAddr, setNewPlaceAddr] = useState('');
  const [showAddPlace, setShowAddPlace] = useState(false);

  const handleAddPlace = (e) => {
    e.preventDefault();
    if (!newPlaceName || !newPlaceAddr) return;
    setSavedPlaces([
      ...savedPlaces,
      { id: Date.now(), name: newPlaceName, address: newPlaceAddr },
    ]);
    setNewPlaceName('');
    setNewPlaceAddr('');
    setShowAddPlace(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="bg-white sketch-border p-6">
        {/* Header matching Wireframe: < Settings / My Trips */}
        <div className="flex items-center justify-between border-b-2 border-slate-700 pb-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 font-sketch font-bold text-slate-700 hover:text-blue-600 text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Settings</span>
          </button>

          <span className="font-sketch font-bold text-slate-500 text-sm">
            Quick Access & Preferences
          </span>
        </div>

        {/* Quick Access Menu Grid matching wireframe options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => onNavigateTab('My Trips')}
            className="bg-slate-50 border-2 border-slate-700 p-4 rounded-xl hover:bg-blue-50 transition-all text-left flex items-center space-x-3 shadow-[2px_2px_0px_#1e293b]"
          >
            <div className="p-2 bg-blue-100 text-blue-700 rounded-lg border border-blue-300">
              <Route className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sketch font-bold text-base text-slate-900">My Trips</h3>
              <p className="font-mono text-xs text-slate-500">View active & upcoming trips</p>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('My Vehicle')}
            className="bg-slate-50 border-2 border-slate-700 p-4 rounded-xl hover:bg-blue-50 transition-all text-left flex items-center space-x-3 shadow-[2px_2px_0px_#1e293b]"
          >
            <div className="p-2 bg-green-100 text-green-700 rounded-lg border border-green-300">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sketch font-bold text-base text-slate-900">My Vehicle</h3>
              <p className="font-mono text-xs text-slate-500">Manage registered vehicles</p>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('Wallet')}
            className="bg-slate-50 border-2 border-slate-700 p-4 rounded-xl hover:bg-blue-50 transition-all text-left flex items-center space-x-3 shadow-[2px_2px_0px_#1e293b]"
          >
            <div className="p-2 bg-purple-100 text-purple-700 rounded-lg border border-purple-300">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sketch font-bold text-base text-slate-900">Payment Methods</h3>
              <p className="font-mono text-xs text-slate-500">Wallet, Cards, UPI</p>
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('Ride History')}
            className="bg-slate-50 border-2 border-slate-700 p-4 rounded-xl hover:bg-blue-50 transition-all text-left flex items-center space-x-3 shadow-[2px_2px_0px_#1e293b]"
          >
            <div className="p-2 bg-amber-100 text-amber-700 rounded-lg border border-amber-300">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sketch font-bold text-base text-slate-900">Ride History</h3>
              <p className="font-mono text-xs text-slate-500">Past ride records</p>
            </div>
          </button>

          <div className="bg-slate-50 border-2 border-slate-700 p-4 rounded-xl flex items-center space-x-3 shadow-[2px_2px_0px_#1e293b]">
            <div className="p-2 bg-rose-100 text-rose-700 rounded-lg border border-rose-300">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sketch font-bold text-base text-slate-900">Help & Support</h3>
              <p className="font-mono text-xs text-slate-500">Contact admin & support</p>
            </div>
          </div>

          <div className="bg-slate-50 border-2 border-slate-700 p-4 rounded-xl flex items-center space-x-3 shadow-[2px_2px_0px_#1e293b]">
            <div className="p-2 bg-cyan-100 text-cyan-700 rounded-lg border border-cyan-300">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sketch font-bold text-base text-slate-900">Chat & Support</h3>
              <p className="font-mono text-xs text-slate-500">In-app messaging</p>
            </div>
          </div>
        </div>

        {/* Saved Places Section matching Wireframe */}
        <div className="bg-slate-50 border-2 border-slate-700 p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-300 pb-3">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h3 className="font-sketch font-bold text-xl text-slate-900">
                Saved Places (Home, Office, Frequent Stops)
              </h3>
            </div>
            <button
              onClick={() => setShowAddPlace(!showAddPlace)}
              className="sketch-button px-3 py-1 text-xs font-sketch font-bold flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Location</span>
            </button>
          </div>

          {showAddPlace && (
            <form onSubmit={handleAddPlace} className="bg-white p-4 border border-slate-300 rounded-xl space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Label (e.g. Gym, Client Office)"
                  value={newPlaceName}
                  onChange={(e) => setNewPlaceName(e.target.value)}
                  className="sketch-input font-mono text-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="Address or Stop Point"
                  value={newPlaceAddr}
                  onChange={(e) => setNewPlaceAddr(e.target.value)}
                  className="sketch-input font-mono text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="sketch-button px-4 py-1.5 font-sketch text-sm font-bold flex items-center space-x-1"
              >
                <Save className="w-4 h-4" />
                <span>Save Place</span>
              </button>
            </form>
          )}

          <div className="space-y-2">
            {savedPlaces.map((place) => (
              <div
                key={place.id}
                className="bg-white p-3 border border-slate-300 rounded-xl flex items-center justify-between font-mono text-xs"
              >
                <div>
                  <span className="font-sketch font-bold text-base text-slate-900 block">
                    {place.name}
                  </span>
                  <span className="text-slate-500">{place.address}</span>
                </div>
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px] font-bold">
                  Quick Select
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
