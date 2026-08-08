import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';

export const MyVehicleView = ({ currentUser, onBack }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [model, setModel] = useState('Swift Dzire');
  const [registrationNumber, setRegistrationNumber] = useState('GJ01AB' + Math.floor(1000 + Math.random() * 9000));
  const [seatingCapacity, setSeatingCapacity] = useState(4);
  const [fuelType, setFuelType] = useState('Petrol');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, [currentUser]);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/vehicles?userId=${currentUser._id}`);
      const data = await res.json();
      setVehicles(data);
    } catch (err) {
      console.error('Failed to fetch vehicles', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser._id,
          driverName: currentUser.name,
          model,
          registrationNumber,
          seatingCapacity,
          fuelType,
        }),
      });

      if (!res.ok) throw new Error('Failed to add vehicle');

      await fetchVehicles();
      setShowAddModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <div className="bg-white sketch-border p-6">
        {/* Header matching Wireframe: < My Vehicle */}
        <div className="flex items-center justify-between border-b-2 border-slate-700 pb-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 font-sketch font-bold text-slate-700 hover:text-blue-600 text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>My Vehicle</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="sketch-button bg-blue-600 hover:bg-blue-700 px-4 py-2 font-sketch font-bold text-sm flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vehicle</span>
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center font-sketch text-xl text-slate-600">
            Loading registered vehicles...
          </div>
        ) : vehicles.length === 0 ? (
          <div className="py-12 text-center font-sketch text-lg text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300 p-8">
            No registered vehicles found. Add a vehicle to start offering rides!
          </div>
        ) : (
          <div className="overflow-x-auto border-2 border-slate-700 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white font-sketch text-sm">
                  <th className="p-3 border-b border-slate-700">Reg. Number</th>
                  <th className="p-3 border-b border-slate-700">Model</th>
                  <th className="p-3 border-b border-slate-700">Seating Capacity</th>
                  <th className="p-3 border-b border-slate-700">Driver</th>
                  <th className="p-3 border-b border-slate-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-xs">
                {vehicles.map((v) => (
                  <tr key={v._id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900 font-mono text-sm">
                      <span className="bg-slate-100 px-2 py-1 rounded border border-slate-300">
                        {v.registrationNumber}
                      </span>
                    </td>
                    <td className="p-3 font-sketch text-base font-bold text-slate-800">
                      {v.model} ({v.fuelType})
                    </td>
                    <td className="p-3 font-bold text-slate-700 text-sm">
                      {v.seatingCapacity} Passengers
                    </td>
                    <td className="p-3 font-sketch text-base text-slate-700">
                      {v.driverName}
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full font-bold font-mono text-xs border ${
                          v.status === 'Active'
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : 'bg-red-100 text-red-800 border-red-300'
                        }`}
                      >
                        [{v.status}]
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Vehicle Modal matching wireframe */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white sketch-border w-full max-w-md p-6 relative">
            <div className="flex items-center justify-between border-b-2 border-slate-700 pb-3 mb-4">
              <h3 className="font-sketch text-2xl font-bold text-slate-900">
                Register New Vehicle
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div>
                <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">
                  Vehicle Model
                </label>
                <input
                  type="text"
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Swift Dzire, Honda City, etc."
                  className="w-full sketch-input font-mono text-sm"
                />
              </div>

              <div>
                <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  required
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  placeholder="GJ01AB1234"
                  className="w-full sketch-input font-mono text-sm uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">
                    Seating Capacity
                  </label>
                  <select
                    value={seatingCapacity}
                    onChange={(e) => setSeatingCapacity(Number(e.target.value))}
                    className="w-full sketch-input font-mono text-sm bg-white"
                  >
                    <option value={2}>2 Seats</option>
                    <option value={3}>3 Seats</option>
                    <option value={4}>4 Seats</option>
                    <option value={6}>6 Seats</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">
                    Fuel Type
                  </label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value)}
                    className="w-full sketch-input font-mono text-sm bg-white"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="EV">Electric (EV)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sketch-button py-2.5 font-sketch text-lg font-bold"
                >
                  {submitting ? 'Registering...' : 'Register Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
