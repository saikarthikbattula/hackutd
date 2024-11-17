'use client';
import React, { useState } from 'react';
import Banking from './banking.jsx';

const CreditCard = ({ cardNumber, cardHolder, expireDate }) => (
  <div className="relative w-80 h-48 group cursor-pointer animate-slide-in">
    <div className="absolute -right-4 top-4 transform rotate-6">
      <div className="w-80 h-48 bg-purple-900 rounded-2xl" />
    </div>
    <div className="absolute -right-2 top-2 transform rotate-3">
      <div className="w-80 h-48 bg-purple-800 rounded-2xl" />
    </div>
    <div className="relative w-80 h-48">
      <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-6">
        <div className="flex justify-between items-start">
          <div className="text-2xl font-bold text-white">VISA</div>
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full" />
        </div>
        <div className="mt-12 space-y-2 text-white">
          <div className="text-lg font-medium">{cardNumber}</div>
          <div className="text-sm">{cardHolder}</div>
          <div className="text-sm opacity-75">Expire Date: {expireDate}</div>
        </div>
      </div>
    </div>
  </div>
);

const NavigationBar = ({ user, onLogout }) => (
  <nav className="flex items-center justify-between px-8 py-4 bg-[#0f1118]">
    <div className="flex items-center gap-2">
      <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded">
        <span className="font-bold text-white">iB</span>
      </div>
      <span className="font-bold text-white">iBank</span>
    </div>
    <div className="flex gap-8">
      {['Home', 'Services', 'Contact', 'Support'].map((item) => (
        <button
          key={item}
          onClick={() => {
            const element = document.getElementById(item.toLowerCase());
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-gray-300 hover:text-green-400 transition-colors"
        >
          {item}
        </button>
      ))}
      {user && (
        <button
          onClick={onLogout}
          className="text-gray-300 hover:text-green-400 transition-colors"
        >
          Logout
        </button>
      )}
    </div>
  </nav>
);

const BankingDashboard = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      setUser({ username, displayName: username });
      setError('');
    } else {
      setError('Please enter both username and password');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="bg-[#0f1118] text-white min-h-screen">
      <NavigationBar user={user} onLogout={handleLogout} />
      
      {user ? (
        <Banking />
      ) : (
        <div className="flex flex-col px-8 py-8 space-y-16">
          <div id="home" className="flex flex-row gap-16 min-h-screen items-center justify-center">
            <div className="w-1/2 space-y-6">
              <h2 className="text-2xl font-bold">Login to Your Account</h2>
              <form className="space-y-4 w-full" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full p-3 bg-[#1a1f2e] text-white rounded-lg border border-gray-700 focus:border-green-400 focus:outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-3 bg-[#1a1f2e] text-white rounded-lg border border-gray-700 focus:border-green-400 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-3 rounded-lg hover:opacity-90 transition-all transform hover:scale-105"
                >
                  Login
                </button>
              </form>
              <button className="text-sm text-green-400 hover:text-green-300">
                Forgot Password?
              </button>
            </div>
            <div className="w-1/2 flex items-center justify-center">
              <div className="w-full text-center">
                <span className="px-3 py-1 bg-purple-900/50 text-green-400 rounded-full text-sm inline-block">
                  New Service
                </span>
                <h1 className="text-5xl font-light text-white leading-tight mt-3" style={{ fontFamily: 'Helvetica, sans-serif' }}>
                  Welcome to Modern Banking Management
                </h1>
                <p className="text-gray-400 text-lg mt-4">
                  Experience banking reimagined with smart features, real-time analytics, and seamless integration.
                </p>
              </div>
            </div>
          </div>

          <div id="services" className="min-h-screen flex flex-col items-center justify-center">
            <div className="w-full text-center mb-16">
              <span className="px-3 py-1 bg-purple-900/50 text-green-400 rounded-full text-sm inline-block">
                Premium Cards
              </span>
              <h1 className="text-4xl font-bold text-white leading-tight mt-4">
                Next-Generation Banking Cards
              </h1>
              <p className="text-gray-400 text-lg mt-4">
                Discover our premium collection of smart banking cards with advanced security features.
              </p>
            </div>
            <div className="flex gap-8">
              <CreditCard
                cardNumber="4766 1901 **** 2751"
                cardHolder="Morris Stevenson"
                expireDate="06/25"
              />
            </div>
          </div>

          <div id="contact" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="w-96 h-96 bg-green-400/20 blur-3xl rounded-full absolute top-20 left-10 animate-pulse"></div>
              <div className="w-80 h-80 bg-blue-500/20 blur-3xl rounded-full absolute bottom-10 right-10 animate-pulse"></div>
              <div className="w-64 h-64 bg-purple-500/20 blur-3xl rounded-full absolute top-40 right-20 animate-pulse"></div>
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
              <div className="bg-[#1a1f2e]/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Name"
                      className="p-3 bg-[#0f1118] rounded-lg border border-gray-700 focus:border-green-400 focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="p-3 bg-[#0f1118] rounded-lg border border-gray-700 focus:border-green-400 focus:outline-none"
                    />
                  </div>
                  <textarea
                    placeholder="Your Message"
                    className="w-full p-3 bg-[#0f1118] rounded-lg border border-gray-700 focus:border-green-400 focus:outline-none"
                    rows="4"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-3 rounded-lg hover:opacity-90 transition-all transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
          
          <div id="support" className="min-h-screen flex items-center justify-center">
            <div className="w-full text-center">
              <span className="px-3 py-1 bg-purple-900/50 text-green-400 rounded-full text-sm inline-block">
                Support Center
              </span>
              <h1 className="text-4xl font-bold text-white leading-tight mt-4">
                We're Here to Help
              </h1>
              <p className="text-gray-400 text-lg mt-4">
                Have a question or need assistance? Our support team is here to assist you 24/7.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankingDashboard;