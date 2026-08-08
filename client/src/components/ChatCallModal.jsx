import React, { useState } from 'react';
import { X, Send, Phone, Mic, MicOff, PhoneOff, User } from 'lucide-react';

export const ChatCallModal = ({
  type,
  driverName,
  driverPhone,
  onClose,
}) => {
  // Chat state
  const [messages, setMessages] = useState([
    { id: 1, sender: 'driver', text: `Hi, I am on my way to Iskcon Circle. See you soon!` },
    { id: 2, sender: 'passenger', text: `Great! I'm waiting near the main bus stop.` },
  ]);
  const [inputText, setInputText] = useState('');

  // Call state
  const [isMuted, setIsMuted] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'passenger', text: inputText },
    ]);
    setInputText('');

    // Simulated driver response after 1 second
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'driver', text: 'Got it! Reaching in 2 minutes.' },
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white sketch-border w-full max-w-md overflow-hidden relative">
        {/* Header */}
        <div className="bg-slate-800 text-white p-4 flex items-center justify-between border-b-2 border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-sketch font-bold flex items-center justify-center border border-white">
              {driverName.charAt(0)}
            </div>
            <div>
              <h3 className="font-sketch font-bold text-lg">{driverName}</h3>
              <p className="font-mono text-xs text-slate-300">{driverPhone}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content depending on Chat or Call */}
        {type === 'chat' ? (
          <div className="flex flex-col h-[380px]">
            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'passenger' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3.5 py-2 rounded-xl text-sm font-sketch ${
                      msg.sender === 'passenger'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white border border-slate-300 text-slate-800 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-300 flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 sketch-input font-mono text-sm py-2"
              />
              <button
                type="submit"
                className="sketch-button p-2.5 px-4 font-sketch flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Voice Call View */
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-6">
            <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 border-4 border-blue-600 flex items-center justify-center animate-pulse">
              <Phone className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-sketch text-2xl font-bold text-slate-900">
                Calling {driverName}...
              </h3>
              <p className="font-mono text-xs text-green-600 font-bold mt-1">
                Connected (00:14)
              </p>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full border-2 border-slate-700 transition-colors ${
                  isMuted ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>

              <button
                onClick={onClose}
                className="p-4 rounded-full bg-red-600 text-white border-2 border-red-800 hover:bg-red-700 shadow-lg"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
