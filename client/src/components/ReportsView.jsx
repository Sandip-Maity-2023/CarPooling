import React from 'react';
import { ArrowLeft, BarChart3, Fuel } from 'lucide-react';

export const ReportsView = ({ onBack }) => {
  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <div className="bg-white sketch-border p-6">
        {/* Header matching Wireframe: < Report */}
        <div className="flex items-center justify-between border-b-2 border-slate-700 pb-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 font-sketch font-bold text-slate-700 hover:text-blue-600 text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Report</span>
          </button>

          <span className="font-sketch font-bold text-slate-500 text-sm">
            Analytics & Transportation Cost Insights
          </span>
        </div>

        {/* Top Key Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-50 border-2 border-slate-700 p-4 rounded-xl shadow-[2px_2px_0px_#1e293b]">
            <span className="font-sketch text-xs text-slate-500 uppercase font-bold block">
              Total Trips
            </span>
            <span className="font-sketch text-3xl font-extrabold text-slate-900 mt-1 block">
              24
            </span>
            <span className="font-mono text-[10px] text-green-600 font-bold">↑ +18% this month</span>
          </div>

          <div className="bg-slate-50 border-2 border-slate-700 p-4 rounded-xl shadow-[2px_2px_0px_#1e293b]">
            <span className="font-sketch text-xs text-slate-500 uppercase font-bold block">
              Total Distance
            </span>
            <span className="font-sketch text-3xl font-extrabold text-blue-700 mt-1 block">
              340 km
            </span>
            <span className="font-mono text-[10px] text-blue-600 font-bold">Iskcon ↔ Infocity</span>
          </div>

          <div className="bg-slate-50 border-2 border-slate-700 p-4 rounded-xl shadow-[2px_2px_0px_#1e293b]">
            <span className="font-sketch text-xs text-slate-500 uppercase font-bold block">
              Fuel Cost Saved
            </span>
            <span className="font-sketch text-3xl font-extrabold text-green-700 mt-1 block">
              ₹ 2,150
            </span>
            <span className="font-mono text-[10px] text-green-600 font-bold">Cost per KM: ₹ 8.00</span>
          </div>

          <div className="bg-slate-50 border-2 border-slate-700 p-4 rounded-xl shadow-[2px_2px_0px_#1e293b]">
            <span className="font-sketch text-xs text-slate-500 uppercase font-bold block">
              CO2 Offsetting
            </span>
            <span className="font-sketch text-3xl font-extrabold text-emerald-700 mt-1 block">
              45 kg
            </span>
            <span className="font-mono text-[10px] text-emerald-600 font-bold">Eco Commute</span>
          </div>
        </div>

        {/* Charts Grid matching wireframe screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Fuel Efficiency Trend (km/L) Line Chart Sketch */}
          <div className="border-2 border-slate-700 rounded-xl p-5 bg-slate-50 space-y-3 shadow-[2px_2px_0px_#1e293b]">
            <div className="flex items-center justify-between border-b border-slate-300 pb-2">
              <h3 className="font-sketch font-bold text-lg text-slate-900 flex items-center space-x-2">
                <Fuel className="w-5 h-5 text-amber-600" />
                <span>Fuel Efficiency Trend (km/L)</span>
              </h3>
            </div>

            {/* Hand-sketched Line Chart Container */}
            <div className="h-48 bg-white border border-slate-300 rounded-lg p-4 relative flex items-end justify-between px-6">
              {/* Grid lines */}
              <div className="absolute inset-x-0 top-1/4 border-b border-dashed border-slate-200"></div>
              <div className="absolute inset-x-0 top-2/4 border-b border-dashed border-slate-200"></div>
              <div className="absolute inset-x-0 top-3/4 border-b border-dashed border-slate-200"></div>

              {/* Data points & sketch lines */}
              <svg className="absolute inset-0 w-full h-full p-4 overflow-visible">
                <path
                  d="M 30 110 L 100 80 L 170 120 L 240 50 L 310 70 L 380 30"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                  strokeDasharray="4 2"
                />
                <circle cx="30" cy="110" r="5" fill="#2563eb" />
                <circle cx="100" cy="80" r="5" fill="#2563eb" />
                <circle cx="170" cy="120" r="5" fill="#2563eb" />
                <circle cx="240" cy="50" r="5" fill="#2563eb" />
                <circle cx="310" cy="70" r="5" fill="#2563eb" />
                <circle cx="380" cy="30" r="5" fill="#2563eb" />
              </svg>

              <span className="font-mono text-[10px] text-slate-500 z-10">Jan</span>
              <span className="font-mono text-[10px] text-slate-500 z-10">Feb</span>
              <span className="font-mono text-[10px] text-slate-500 z-10">Mar</span>
              <span className="font-mono text-[10px] text-slate-500 z-10">Apr</span>
              <span className="font-mono text-[10px] text-slate-500 z-10">May</span>
              <span className="font-mono text-[10px] text-slate-500 z-10">Jun</span>
            </div>
          </div>

          {/* Top 5 Costliest Vehicles Bar Chart Sketch */}
          <div className="border-2 border-slate-700 rounded-xl p-5 bg-slate-50 space-y-3 shadow-[2px_2px_0px_#1e293b]">
            <div className="flex items-center justify-between border-b border-slate-300 pb-2">
              <h3 className="font-sketch font-bold text-lg text-slate-900 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>Top 5 Costliest Vehicles</span>
              </h3>
            </div>

            {/* Hand-sketched Bar Chart */}
            <div className="h-48 bg-white border border-slate-300 rounded-lg p-4 flex items-end justify-around">
              <div className="flex flex-col items-center space-y-1 h-full justify-end">
                <div className="w-8 bg-blue-600 border border-slate-700 rounded-t h-[75%]"></div>
                <span className="font-mono text-[10px] text-slate-600">Innova</span>
              </div>
              <div className="flex flex-col items-center space-y-1 h-full justify-end">
                <div className="w-8 bg-blue-500 border border-slate-700 rounded-t h-[55%]"></div>
                <span className="font-mono text-[10px] text-slate-600">City</span>
              </div>
              <div className="flex flex-col items-center space-y-1 h-full justify-end">
                <div className="w-8 bg-blue-400 border border-slate-700 rounded-t h-[40%]"></div>
                <span className="font-mono text-[10px] text-slate-600">Swift</span>
              </div>
              <div className="flex flex-col items-center space-y-1 h-full justify-end">
                <div className="w-8 bg-blue-300 border border-slate-700 rounded-t h-[25%]"></div>
                <span className="font-mono text-[10px] text-slate-600">Alto</span>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Summary Table matching wireframe screenshot */}
        <div className="border-2 border-slate-700 rounded-xl bg-slate-50 p-5 shadow-[2px_2px_0px_#1e293b]">
          <h3 className="font-sketch font-bold text-xl text-slate-900 mb-4 border-b border-slate-300 pb-2">
            Financial Summary of Month
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse bg-white rounded-lg border border-slate-300">
              <thead>
                <tr className="bg-slate-800 text-white font-sketch text-sm">
                  <th className="p-3 border-b">Month</th>
                  <th className="p-3 border-b">Revenue</th>
                  <th className="p-3 border-b">Fuel Cost</th>
                  <th className="p-3 border-b">Maintenance</th>
                  <th className="p-3 border-b">Net Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-bold font-sketch text-base">Jan 2026</td>
                  <td className="p-3 text-green-700 font-bold">₹ 18,400</td>
                  <td className="p-3 text-red-600">₹ 6,200</td>
                  <td className="p-3 text-amber-600">₹ 1,500</td>
                  <td className="p-3 font-bold text-blue-700">₹ 10,700</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold font-sketch text-base">Feb 2026</td>
                  <td className="p-3 text-green-700 font-bold">₹ 22,100</td>
                  <td className="p-3 text-red-600">₹ 7,100</td>
                  <td className="p-3 text-amber-600">₹ 1,200</td>
                  <td className="p-3 font-bold text-blue-700">₹ 13,800</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
