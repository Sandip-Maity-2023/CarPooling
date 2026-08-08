import React, { useEffect, useState } from 'react';
import { Car, ShieldCheck, Users, Sparkles } from 'lucide-react';

export const SplashScreen = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 400);
          return 100;
        }
        return prev + 20;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      {/* Hand-sketched wireframe container */}
      <div className="w-full max-w-xl bg-white sketch-border p-8 text-center relative overflow-hidden">
        {/* Wireframe Header Label */}
        <h2 className="font-sketch text-3xl font-bold text-blue-600 mb-6 underline decoration-wavy decoration-blue-400">
          Splash Screen
        </h2>

        {/* Illustration Container matching wireframe sketch */}
        <div className="border-2 border-slate-700 rounded-xl p-8 bg-slate-50 relative mb-8 flex flex-col items-center justify-center min-h-[220px]">
          {/* Clouds Sketch */}
          <div className="absolute top-4 left-6 text-slate-300 font-sketch text-xl select-none">
            ☁️ ☁️
          </div>
          <div className="absolute top-4 right-6 text-slate-300 font-sketch text-xl select-none">
            ☁️
          </div>

          {/* Car Graphic */}
          <div className="relative z-10 bg-white border-2 border-slate-800 p-6 rounded-2xl shadow-[4px_4px_0px_#1e293b] flex items-center justify-center mb-4">
            <Car className="w-20 h-20 text-blue-600 stroke-[1.8]" />
            <div className="absolute -top-2 -right-2 bg-amber-400 border border-slate-800 rounded-full p-1.5">
              <Sparkles className="w-4 h-4 text-slate-900" />
            </div>
          </div>

          {/* Wireframe Tagline */}
          <h1 className="font-sketch text-3xl font-extrabold text-slate-800 tracking-wide mb-1">
            Ride Together
          </h1>
          <h1 className="font-sketch text-3xl font-extrabold text-blue-600 tracking-wide">
            Save Together
          </h1>

          {/* Road baseline sketch */}
          <div className="w-3/4 h-0.5 bg-slate-700 mt-6 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-1/2 h-0.5 bg-dashed border-t-2 border-dashed border-slate-400" />
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-left">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
            <Users className="w-4 h-4 text-blue-600 shrink-0" />
            <span>Enterprise Employee Carpooling</span>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
            <span>Verified Employee Profiles</span>
          </div>
        </div>

        {/* Loading Progress Bar */}
        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden border border-slate-400 mb-4">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={onFinish}
          className="font-sketch text-lg sketch-button px-6 py-2.5 w-full font-bold"
        >
          Skip & Continue to Platform →
        </button>
      </div>
    </div>
  );
};
