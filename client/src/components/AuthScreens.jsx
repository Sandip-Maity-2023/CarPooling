import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Car,
  Lock,
  Mail,
  Phone,
  Upload,
  User as UserIcon,
} from 'lucide-react';

export const AuthScreens = ({ onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('raj.patel@odoo.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message || 'Error logging in');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message || 'Error signing up');
    } finally {
      setLoading(false);
    }
  };

  const FieldLabel = ({ children }) => (
    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
      {children}
    </label>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl grid overflow-hidden bg-white sketch-border md:grid-cols-[1fr_1.05fr]">
        <aside className="relative hidden min-h-[620px] flex-col justify-between bg-slate-950 p-8 text-white md:flex">
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(250,204,21,0.24),transparent_42%),radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.13),transparent_24rem)]" />

          <div className="relative flex items-center gap-3">
            <div className="rounded-2xl bg-yellow-400 p-2.5 text-slate-950">
              <Car className="h-5 w-5" />
            </div>
            <span className="text-2xl font-black tracking-tight">Carpooling</span>
          </div>

          <div className="relative space-y-5">
            <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-yellow-200">
              Corporate commute, upgraded
            </div>
            <h1 className="max-w-sm text-5xl font-black leading-[0.95] tracking-tight">
              Ride together with less waiting.
            </h1>
            <p className="max-w-sm text-sm leading-6 text-slate-300">
              Find verified office rides, offer seats in your car, and settle trips from one clean workspace.
            </p>
          </div>

          <div className="relative grid grid-cols-3 gap-3 text-center">
            {['Verified', 'Wallet', 'Live trips'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-3 text-xs font-semibold text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </aside>

        <section className="p-6 sm:p-8 lg:p-10">
          <div className="mb-8 flex items-center justify-between md:hidden">
            <div className="flex items-center gap-2">
              <div className="rounded-2xl bg-yellow-400 p-2 text-slate-950">
                <Car className="h-5 w-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-950">Carpooling</span>
            </div>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {!isSignUp ? (
            <div>
              <div className="mb-7">
                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-yellow-700">Welcome back</p>
                <h1 className="text-4xl font-black tracking-tight text-slate-950">Login</h1>
                <p className="mt-2 text-sm text-slate-500">Use your employee account to continue.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <FieldLabel>Email / Mobile</FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email / Mobile"
                      className="w-full pl-10 pr-3 sketch-input text-sm"
                    />
                  </div>
                </div>

                <div>
                  <FieldLabel>Password</FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full pl-10 pr-3 sketch-input text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sketch-button py-3.5 text-base font-bold flex items-center justify-center gap-2"
                >
                  <span>{loading ? 'Authenticating...' : 'Login'}</span>
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </button>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-slate-200" />
                  <span className="mx-4 flex-shrink text-xs font-bold uppercase tracking-wide text-slate-400">Or</span>
                  <div className="flex-grow border-t border-slate-200" />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-medium text-slate-600">Create New Account</span>
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-900 hover:bg-yellow-50"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-sm font-bold uppercase tracking-wide text-yellow-700">Get started</p>
                  <h1 className="text-4xl font-black tracking-tight text-slate-950">Sign Up</h1>
                  <p className="mt-2 text-sm text-slate-500">Create your verified carpool profile.</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="mb-1 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                    <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const seed = Math.floor(Math.random() * 100);
                      setAvatar(`https://picsum.photos/seed/${seed}/150`);
                    }}
                    className="flex items-center gap-1 text-xs font-bold text-slate-700 underline"
                  >
                    <Upload className="h-3 w-3" />
                    <span>Upload</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSignUp} className="space-y-3">
                <div>
                  <FieldLabel>Name</FieldLabel>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full pl-9 pr-3 sketch-input text-sm" />
                  </div>
                </div>

                <div>
                  <FieldLabel>Phone</FieldLabel>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <input type="text" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="w-full pl-9 pr-3 sketch-input text-sm" />
                  </div>
                </div>

                <div>
                  <FieldLabel>Email / Mobile</FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email / Mobile" className="w-full pl-9 pr-3 sketch-input text-sm" />
                  </div>
                </div>

                <div>
                  <FieldLabel>Password</FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full pl-9 pr-3 sketch-input text-sm" />
                  </div>
                </div>

                <div>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" className="w-full pl-9 pr-3 sketch-input text-sm" />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full sketch-button py-3.5 text-base font-bold">
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>

                <div className="text-center pt-2">
                  <button type="button" onClick={() => setIsSignUp(false)} className="text-sm font-semibold text-slate-600 hover:text-slate-950 underline">
                    Already have an account? Login here
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
