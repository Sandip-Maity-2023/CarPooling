import React, { useEffect, useState } from 'react'
import AdminEmployees from '../components/AdminEmployees'
import AdminVehicles from '../components/AdminVehicles'
import AdminSettings from '../components/AdminSettings'

const tabs = ['Employees', 'Vehicles', 'Settings']

const AdminDashboard = () => {
  const [active, setActive] = useState('Employees')

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-4 flex gap-2">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 rounded ${active === tab ? 'bg-black text-white' : 'bg-gray-100'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div>
        {active === 'Employees' && <AdminEmployees />}
        {active === 'Vehicles' && <AdminVehicles />}
        {active === 'Settings' && <AdminSettings />}
      </div>
    </div>
  )
}

export default AdminDashboard
