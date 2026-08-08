import React from 'react';
import { Car, Shield, LogOut } from 'lucide-react';

export const Header = ({
  activeTab,
  setActiveTab,
  currentUser,
  onLogout,
  onSwitchRole,
}) => {
  const tabs = [
    'Dashboard',
    'My Trips',
    'Ride History',
    'My Vehicle',
    'Wallet',
    'Setting',
    'Report',
  ];

  if (currentUser?.role === 'admin') {
    tabs.push('Admin');
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-900/10 bg-white/82 shadow-[0_10px_30px_rgba(15,23,42,0.07)] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-18 py-3 flex items-center justify-between gap-4">
        <div 
          className="flex items-center gap-3 cursor-pointer shrink-0"
          onClick={() => setActiveTab('Dashboard')}
        >
          <div className="bg-yellow-400 text-slate-950 p-2.5 rounded-2xl shadow-[0_12px_24px_rgba(250,204,21,0.28)] flex items-center justify-center">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-950">
              Carpooling
            </span>
            <span className="hidden sm:inline-block text-[11px] bg-yellow-100 text-yellow-900 px-2 py-0.5 rounded-full ml-2 font-bold uppercase tracking-wide">
              Enterprise
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 overflow-x-auto rounded-full bg-slate-100/80 p-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-white hover:text-slate-950'
                }`}
              >
                {tab === 'Setting' ? 'Settings' : tab}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {currentUser && (
            <button
              onClick={onSwitchRole}
              title="Click to toggle Admin / Employee view"
              className="text-xs font-semibold bg-white hover:bg-yellow-50 text-slate-700 px-2.5 py-2 rounded-full border border-slate-200 flex items-center gap-1.5 shadow-sm"
            >
              <Shield className="w-3.5 h-3.5 text-yellow-600" />
              <span className="hidden sm:inline">Role:</span>
              <span className="font-bold text-slate-950 capitalize">{currentUser.role}</span>
            </button>
          )}

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="hidden sm:flex items-center gap-2 bg-white border border-slate-200 rounded-full px-2.5 py-1.5 shadow-sm">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt="Profile"
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="font-bold text-sm text-slate-800 max-w-32 truncate">
                {currentUser?.name || 'Dero Addict'}
              </span>
            </div>

            <button
              onClick={onLogout}
              title="Sign Out"
              className="text-slate-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex overflow-x-auto px-3 py-2 bg-white/78 border-t border-slate-200 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold ${
              activeTab === tab
                ? 'bg-slate-950 text-white'
                : 'bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {tab === 'Setting' ? 'Settings' : tab}
          </button>
        ))}
      </div>
    </header>
  );
};
