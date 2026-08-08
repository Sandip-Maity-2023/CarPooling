import React, { useState, useEffect } from 'react';
import { Users, Car, Settings, Plus, CheckCircle2, Save, Building, Fuel } from 'lucide-react';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Employees');
  const [employees, setEmployees] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [companySettings, setCompanySettings] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Add Employee Modal state
  const [showAddEmpModal, setShowAddEmpModal] = useState(false);
  const [empName, setEmpName] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  const [empDept, setEmpDept] = useState('Engineering');
  const [empManager, setEmpManager] = useState('S. Maity');
  const [empLoc, setEmpLoc] = useState('Kolkata');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [uRes, vRes, sRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/vehicles'),
        fetch('/api/admin/settings'),
      ]);

      const [usersData, vehiclesData, settingsData] = await Promise.all([
        uRes.json(),
        vRes.json(),
        sRes.json(),
      ]);

      setEmployees(usersData);
      setVehicles(vehiclesData);
      setCompanySettings(settingsData);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAccess = async (userId, currentAccess) => {
    const nextAccess = currentAccess === 'Granted' ? 'Revoked' : 'Granted';
    try {
      const res = await fetch(`/api/users/${userId}/access`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platformAccess: nextAccess }),
      });
      if (res.ok) {
        setEmployees(
          employees.map((e) =>
            e._id === userId ? { ...e, platformAccess: nextAccess } : e
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleVehicleStatus = async (vehId, currentStatus) => {
    const nextStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    try {
      const res = await fetch(`/api/vehicles/${vehId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        setVehicles(
          vehicles.map((v) =>
            v._id === vehId ? { ...v, status: nextStatus } : v
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: empName,
          email: empEmail,
          phone: '+91 9876543210',
          password: 'password123',
        }),
      });
      if (res.ok) {
        await fetchAdminData();
        setShowAddEmpModal(false);
        setEmpName('');
        setEmpEmail('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    if (!companySettings) return;
    setSaveSuccess(false);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companySettings),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateCompanySetting = (key, value) => {
    setCompanySettings((current) => ({
      ...(current || {}),
      [key]: value,
    }));
  };

  const settings = companySettings || {};

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <div className="bg-white sketch-border p-6 space-y-6">
        {/* Top KPI Cards matching wireframe screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 border-2 border-slate-700 p-4 rounded-xl shadow-[2px_2px_0px_#1e293b] flex items-center justify-between">
            <div>
              <span className="font-sketch text-xs text-slate-500 uppercase font-bold block">
                Total Employees
              </span>
              <span className="font-sketch text-4xl font-extrabold text-slate-900 mt-1 block">
                {employees.length || settings.totalEmployees || 0}
              </span>
            </div>
            <Users className="w-10 h-10 text-blue-600 opacity-80" />
          </div>

          <div className="bg-slate-50 border-2 border-slate-700 p-4 rounded-xl shadow-[2px_2px_0px_#1e293b] flex items-center justify-between">
            <div>
              <span className="font-sketch text-xs text-slate-500 uppercase font-bold block">
                Registered Vehicles
              </span>
              <span className="font-sketch text-4xl font-extrabold text-blue-700 mt-1 block">
                {vehicles.length || settings.registeredVehicles || 0}
              </span>
            </div>
            <Car className="w-10 h-10 text-green-600 opacity-80" />
          </div>

          <div className="bg-slate-50 border-2 border-slate-700 p-4 rounded-xl shadow-[2px_2px_0px_#1e293b] flex items-center justify-between">
            <div>
              <span className="font-sketch text-xs text-slate-500 uppercase font-bold block">
                Rides This Month
              </span>
              <span className="font-sketch text-4xl font-extrabold text-purple-700 mt-1 block">
                {settings.ridesThisMonth || 0}
              </span>
            </div>
            <Settings className="w-10 h-10 text-purple-600 opacity-80" />
          </div>
        </div>

        {/* Navigation Tabs matching wireframe: Employees | Vehicles | Settings */}
        <div className="flex border-b-2 border-slate-700 space-x-2">
          {['Employees', 'Vehicles', 'Settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 font-sketch font-bold text-lg rounded-t-xl transition-all border-t-2 border-x-2 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white border-slate-700 -mb-0.5 z-10'
                  : 'bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200'
              }`}
            >
              {tab === 'Settings' ? 'Carpooling Settings' : tab}
            </button>
          ))}
        </div>

        {/* TAB 1: EMPLOYEES TAB matching Wireframe */}
        {activeTab === 'Employees' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-sketch text-xl font-bold text-slate-900">
                Employee Access Directory
              </h3>
              <button
                onClick={() => setShowAddEmpModal(true)}
                className="sketch-button px-4 py-1.5 font-sketch font-bold text-sm flex items-center space-x-1"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Employee</span>
              </button>
            </div>

            <div className="overflow-x-auto border-2 border-slate-700 rounded-xl">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-white font-sketch text-sm">
                    <th className="p-3 border-b">Name</th>
                    <th className="p-3 border-b">Email</th>
                    <th className="p-3 border-b">Department</th>
                    <th className="p-3 border-b">Manager</th>
                    <th className="p-3 border-b">Location</th>
                    <th className="p-3 border-b">Platform Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {employees.map((emp) => (
                    <tr key={emp._id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-slate-900 font-sketch text-base">
                        {emp.name}
                      </td>
                      <td className="p-3 text-slate-600">{emp.email}</td>
                      <td className="p-3 text-slate-700 font-bold">{emp.department || 'Engineering'}</td>
                      <td className="p-3 text-slate-600">{emp.manager || 'A. Shah'}</td>
                      <td className="p-3 text-slate-600">{emp.location || 'Ahmedabad'}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleToggleAccess(emp._id, emp.platformAccess)}
                          className={`px-3 py-1 rounded-full font-bold text-xs border transition-transform active:scale-95 ${
                            emp.platformAccess === 'Granted'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : 'bg-red-100 text-red-800 border-red-300'
                          }`}
                        >
                          [{emp.platformAccess}]
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: VEHICLES TAB matching Wireframe */}
        {activeTab === 'Vehicles' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-sketch text-xl font-bold text-slate-900">
                Registered Vehicles Control
              </h3>
            </div>

            <div className="overflow-x-auto border-2 border-slate-700 rounded-xl">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-white font-sketch text-sm">
                    <th className="p-3 border-b">Registration Number</th>
                    <th className="p-3 border-b">Model</th>
                    <th className="p-3 border-b">Seating Capacity</th>
                    <th className="p-3 border-b">Driver</th>
                    <th className="p-3 border-b">Approval Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {vehicles.map((v) => (
                    <tr key={v._id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold font-mono text-slate-900">
                        <span className="bg-slate-100 px-2 py-1 rounded border border-slate-300">
                          {v.registrationNumber}
                        </span>
                      </td>
                      <td className="p-3 font-sketch text-base font-bold text-slate-800">
                        {v.model}
                      </td>
                      <td className="p-3 font-bold text-slate-700">
                        {v.seatingCapacity}
                      </td>
                      <td className="p-3 font-sketch text-base text-slate-700">
                        {v.driverName}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleToggleVehicleStatus(v._id, v.status)}
                          className={`px-3 py-1 rounded-full font-bold text-xs border transition-transform active:scale-95 ${
                            v.status === 'Active'
                              ? 'bg-green-100 text-green-800 border-green-300'
                              : 'bg-red-100 text-red-800 border-red-300'
                          }`}
                        >
                          [{v.status}]
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SETTINGS TAB matching Wireframe screenshot */}
        {activeTab === 'Settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-6">
            {loading && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 font-sketch text-base">
                Loading organization settings from database...
              </div>
            )}

            {saveSuccess && (
              <div className="p-4 bg-green-50 border-2 border-green-400 rounded-xl text-green-800 font-sketch text-base flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Organization carpooling settings saved successfully!</span>
              </div>
            )}

            {/* Company Details Section matching Wireframe */}
            <div className="bg-slate-50 border-2 border-slate-700 p-5 rounded-xl space-y-4">
              <h3 className="font-sketch font-bold text-xl text-slate-900 border-b border-slate-300 pb-2 flex items-center space-x-2">
                <Building className="w-5 h-5 text-blue-600" />
                <span>Company Details</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={settings.companyName || ''}
                    onChange={(e) => updateCompanySetting('companyName', e.target.value)}
                    className="w-full sketch-input font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={settings.industry || ''}
                    onChange={(e) => updateCompanySetting('industry', e.target.value)}
                    className="w-full sketch-input font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">
                    Registered Address
                  </label>
                  <input
                    type="text"
                    value={settings.registeredAddress || ''}
                    onChange={(e) => updateCompanySetting('registeredAddress', e.target.value)}
                    className="w-full sketch-input font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">
                    Admin Contact
                  </label>
                  <input
                    type="text"
                    value={settings.adminContact || ''}
                    onChange={(e) => updateCompanySetting('adminContact', e.target.value)}
                    className="w-full sketch-input font-mono text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Carpooling Configuration Section matching Wireframe */}
            <div className="bg-slate-50 border-2 border-slate-700 p-5 rounded-xl space-y-4">
              <h3 className="font-sketch font-bold text-xl text-slate-900 border-b border-slate-300 pb-2 flex items-center space-x-2">
                <Fuel className="w-5 h-5 text-amber-600" />
                <span>Carpooling Configuration</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">
                    Fuel Cost / Liter (Rs.)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.fuelCostPerLiter ?? ''}
                    onChange={(e) => updateCompanySetting('fuelCostPerLiter', Number(e.target.value))}
                    className="w-full sketch-input font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">
                    Cost Per KM (Rs.)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.costPerKm ?? ''}
                    onChange={(e) => updateCompanySetting('costPerKm', Number(e.target.value))}
                    className="w-full sketch-input font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">
                    Travel Cost Operational (Rs./Km)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.travelCostOperational ?? ''}
                    onChange={(e) => updateCompanySetting('travelCostOperational', Number(e.target.value))}
                    className="w-full sketch-input font-mono text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!companySettings || loading}
                className="sketch-button px-8 py-3 font-sketch text-lg font-bold flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
              >
                <Save className="w-5 h-5" />
                <span>Save Settings</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Add Employee Modal */}
      {showAddEmpModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white sketch-border w-full max-w-md p-6">
            <h3 className="font-sketch text-2xl font-bold text-slate-900 mb-4 border-b pb-2">
              Add New Employee
            </h3>
            <form onSubmit={handleAddEmployee} className="space-y-3">
              <div>
                <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                  className="w-full sketch-input font-mono text-sm"
                />
              </div>
              <div>
                <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={empEmail}
                  onChange={(e) => setEmpEmail(e.target.value)}
                  className="w-full sketch-input font-mono text-sm"
                />
              </div>
              <div>
                <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  value={empDept}
                  onChange={(e) => setEmpDept(e.target.value)}
                  className="w-full sketch-input font-mono text-sm"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddEmpModal(false)}
                  className="px-4 py-2 font-sketch text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="sketch-button px-5 py-2 font-sketch font-bold"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
