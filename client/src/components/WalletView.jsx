import React, { useState } from 'react';
import { Wallet as WalletIcon, ArrowLeft, CreditCard, QrCode, PlusCircle, CheckCircle2 } from 'lucide-react';

export const WalletView = ({
  currentUser,
  onUpdateUser,
  onBack,
}) => {
  const [amount, setAmount] = useState(500);
  const [rechargeMethod, setRechargeMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('raj@icici');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRecharge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/wallet/recharge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser._id,
          amount,
          paymentMethod: rechargeMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Recharge failed');

      onUpdateUser(data.user);
      setMessage(`Successfully added ₹${amount} to your wallet!`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="bg-white sketch-border p-6">
        {/* Header matching Wireframe: Wallet / Balance ₹ 120 */}
        <div className="flex items-center justify-between border-b-2 border-slate-700 pb-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 font-sketch font-bold text-slate-700 hover:text-blue-600 text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Recharge Wallet</span>
          </button>

          <div className="flex items-center space-x-2 bg-blue-50 border border-blue-300 px-4 py-1.5 rounded-full">
            <WalletIcon className="w-5 h-5 text-blue-600" />
            <span className="font-sketch font-bold text-slate-800 text-sm">Balance:</span>
            <span className="font-sketch font-extrabold text-blue-700 text-xl">
              ₹ {currentUser.walletBalance}
            </span>
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 bg-green-50 border-2 border-green-400 rounded-xl text-green-800 font-sketch text-base flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleRecharge} className="space-y-6">
          {/* Amount input matching Wireframe: Amount ₹ 500 */}
          <div>
            <label className="block font-sketch text-sm font-bold text-slate-700 mb-2">
              Recharge Amount (₹)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                required
                min={50}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full sketch-input font-sketch text-2xl font-bold py-3 text-blue-700"
              />
            </div>
            <div className="flex space-x-2 mt-2">
              {[100, 200, 500, 1000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(amt)}
                  className={`px-3 py-1 font-mono text-xs rounded border ${
                    amount === amt
                      ? 'bg-blue-600 text-white border-blue-700 font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  +₹{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Payment options matching wireframe */}
          <div className="space-y-3">
            <label className="block font-sketch text-sm font-bold text-slate-700">
              Select Preferred Payment Method
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label
                className={`p-4 border-2 rounded-xl cursor-pointer flex items-center space-x-3 transition-all ${
                  rechargeMethod === 'Card'
                    ? 'border-blue-600 bg-blue-50 shadow-[2px_2px_0px_#2563eb]'
                    : 'border-slate-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="rechargeMethod"
                  value="Card"
                  checked={rechargeMethod === 'Card'}
                  onChange={() => setRechargeMethod('Card')}
                  className="w-4 h-4 text-blue-600"
                />
                <CreditCard className="w-5 h-5 text-purple-600" />
                <span className="font-sketch font-bold text-slate-800">Card Payment</span>
              </label>

              <label
                className={`p-4 border-2 rounded-xl cursor-pointer flex items-center space-x-3 transition-all ${
                  rechargeMethod === 'UPI'
                    ? 'border-blue-600 bg-blue-50 shadow-[2px_2px_0px_#2563eb]'
                    : 'border-slate-300 bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="rechargeMethod"
                  value="UPI"
                  checked={rechargeMethod === 'UPI'}
                  onChange={() => setRechargeMethod('UPI')}
                  className="w-4 h-4 text-blue-600"
                />
                <QrCode className="w-5 h-5 text-blue-600" />
                <span className="font-sketch font-bold text-slate-800">UPI Payment</span>
              </label>
            </div>
          </div>

          {/* UPI details & QR Code matching wireframe */}
          {rechargeMethod === 'UPI' && (
            <div className="bg-slate-50 border border-slate-300 p-5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-2/3">
                <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">
                  UPI ID or QR Code
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full sketch-input font-mono text-sm"
                />
              </div>

              <div className="text-center bg-white p-2 border-2 border-slate-700 rounded-lg">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=upi://pay?pa=carpoolwallet@odoo&am=${amount}`}
                  alt="Wallet QR Code"
                  className="w-20 h-20 mx-auto"
                />
                <span className="font-mono text-[10px] text-slate-500 mt-1 block">Scan QR</span>
              </div>
            </div>
          )}

          {/* Action Button matching wireframe: Add ₹ 500 */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sketch-button py-3.5 font-sketch text-xl font-bold flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <PlusCircle className="w-6 h-6" />
              <span>{loading ? 'Adding Money...' : `Add ₹ ${amount}`}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
