import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Banknote, QrCode, Wallet as WalletIcon, CheckCircle, AlertCircle } from 'lucide-react';

export const PaymentModal = ({
  trip,
  currentUser,
  onPaymentSuccess,
  onBack,
}) => {
  const [method, setMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('raj@icici');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/trips/${trip._id}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: method,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Payment failed');
      }

      onPaymentSuccess();
    } catch (err) {
      setError(err.message || 'Error completing payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="bg-white sketch-border p-6">
        {/* Header matching Wireframe: < Payment Method */}
        <div className="flex items-center justify-between border-b-2 border-slate-700 pb-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 font-sketch font-bold text-slate-700 hover:text-blue-600 text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Payment Method</span>
          </button>

          <span className="font-sketch font-extrabold text-2xl text-blue-700">
            Fare: ₹ {trip.fare}
          </span>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-300 rounded-lg text-red-700 text-sm flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handlePay} className="space-y-6">
          {/* Radio Payment Options matching wireframe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cash Payment */}
            <label
              className={`p-4 border-2 rounded-xl cursor-pointer flex items-center space-x-3 transition-all ${
                method === 'Cash'
                  ? 'border-blue-600 bg-blue-50 shadow-[2px_2px_0px_#2563eb]'
                  : 'border-slate-300 bg-white hover:border-slate-400'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="Cash"
                checked={method === 'Cash'}
                onChange={() => setMethod('Cash')}
                className="w-4 h-4 text-blue-600"
              />
              <Banknote className="w-5 h-5 text-green-600" />
              <span className="font-sketch font-bold text-slate-800">Cash Payment</span>
            </label>

            {/* Card Payment */}
            <label
              className={`p-4 border-2 rounded-xl cursor-pointer flex items-center space-x-3 transition-all ${
                method === 'Card'
                  ? 'border-blue-600 bg-blue-50 shadow-[2px_2px_0px_#2563eb]'
                  : 'border-slate-300 bg-white hover:border-slate-400'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="Card"
                checked={method === 'Card'}
                onChange={() => setMethod('Card')}
                className="w-4 h-4 text-blue-600"
              />
              <CreditCard className="w-5 h-5 text-purple-600" />
              <span className="font-sketch font-bold text-slate-800">Card Payment</span>
            </label>

            {/* UPI Payment */}
            <label
              className={`p-4 border-2 rounded-xl cursor-pointer flex items-center space-x-3 transition-all ${
                method === 'UPI'
                  ? 'border-blue-600 bg-blue-50 shadow-[2px_2px_0px_#2563eb]'
                  : 'border-slate-300 bg-white hover:border-slate-400'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="UPI"
                checked={method === 'UPI'}
                onChange={() => setMethod('UPI')}
                className="w-4 h-4 text-blue-600"
              />
              <QrCode className="w-5 h-5 text-blue-600" />
              <span className="font-sketch font-bold text-slate-800">UPI Payment</span>
            </label>

            {/* Wallet Payment */}
            <label
              className={`p-4 border-2 rounded-xl cursor-pointer flex items-center space-x-3 transition-all ${
                method === 'Wallet'
                  ? 'border-blue-600 bg-blue-50 shadow-[2px_2px_0px_#2563eb]'
                  : 'border-slate-300 bg-white hover:border-slate-400'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="Wallet"
                checked={method === 'Wallet'}
                onChange={() => setMethod('Wallet')}
                className="w-4 h-4 text-blue-600"
              />
              <WalletIcon className="w-5 h-5 text-amber-600" />
              <div>
                <span className="font-sketch font-bold text-slate-800 block">Wallet Payment</span>
                <span className="font-mono text-xs text-slate-500">
                  Balance: ₹ {currentUser.walletBalance}
                </span>
              </div>
            </label>
          </div>

          {/* Context details for selected payment method */}
          {method === 'UPI' && (
            <div className="bg-slate-50 border border-slate-300 p-5 rounded-xl space-y-3 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-2/3">
                <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">
                  UPI ID
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="name@upi"
                  className="w-full sketch-input font-mono text-sm"
                />
              </div>

              {/* QR Code Simulation matching wireframe */}
              <div className="text-center bg-white p-2 border-2 border-slate-700 rounded-lg">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=upi://pay?pa=carpool@odoo&pn=CarpoolingPlatform&am=120"
                  alt="UPI QR Code"
                  className="w-20 h-20 mx-auto"
                />
                <span className="font-mono text-[10px] text-slate-500 mt-1 block">Scan & Pay</span>
              </div>
            </div>
          )}

          {method === 'Card' && (
            <div className="bg-slate-50 border border-slate-300 p-4 rounded-xl space-y-3">
              <div>
                <label className="block font-sketch text-xs font-bold text-slate-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full sketch-input font-mono text-sm"
                />
              </div>
            </div>
          )}

          {/* Action Pay Button matching wireframe: Pay ₹ 120 */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full sketch-button py-3.5 font-sketch text-xl font-bold flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <CheckCircle className="w-6 h-6" />
              <span>{loading ? 'Processing Transaction...' : `Pay ₹ ${trip.fare}`}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
