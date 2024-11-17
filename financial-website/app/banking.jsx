'use client';

import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { 
  LayoutGrid, 
  ArrowDownToLine, 
  BarChart2, 
  FileText, 
  Settings, 
  User,
  MoreVertical,
  Plus,
  CreditCard
} from 'lucide-react';

// Components
const Sidebar = ({ menuItems, userName }) => (
  <div className="w-60 bg-slate-800 rounded-3xl p-6">
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white text-lg">
          {userName[0]} {/* First letter of the username */}
        </div>
        <div className="text-white font-semibold text-xl">{userName}</div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button 
            key={item.label} 
            className={`flex w-full items-center gap-3 p-3 rounded-xl transition-colors ${
              item.active 
                ? 'bg-indigo-500 text-white' 
                : 'text-gray-400 hover:bg-slate-700'
            }`}
            onClick={item.onClick}  // Add onClick handler to open popups
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  </div>
);

const StatCard = ({ label, value, progress, subValue, change }) => (
  <div className="flex-1 bg-slate-800 p-6 rounded-3xl space-y-4">
    <div className="text-gray-400 text-sm">{label}</div>
    <div className="text-3xl text-white font-bold">{value}</div>
    {progress && (
      <div className="h-2 rounded-full overflow-hidden bg-slate-700">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" 
          style={{ width: `${progress}%` }} 
        />
      </div>
    )}
    {(subValue || change) && (
      <div className="flex justify-between items-center">
        {subValue && <div className="text-xl text-white">{subValue}</div>}
        {change && <div className="text-green-400">{change}</div>}
      </div>
    )}
  </div>
);

const TransactionList = ({ transactions }) => (
  <div className="space-y-3">
    <div className="flex justify-between items-center">
      <h2 className="text-white font-semibold">Transactions</h2>
      <button className="text-gray-400 hover:text-gray-300">
        <MoreVertical size={20} />
      </button>
    </div>
    {transactions.map((transaction) => (
      <div key={transaction.id} 
        className="flex items-center justify-between bg-slate-800 p-4 rounded-xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
            <span className="text-xs text-white">
              {transaction.type.substring(0, 2)}
            </span>
          </div>
          <div>
            <div className="text-white font-medium">{transaction.type}</div>
            <div className="text-gray-400 text-sm">{transaction.user}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-white font-medium">{transaction.amount}</div>
          <div className="text-gray-400 text-sm">{transaction.date}</div>
        </div>
      </div>
    ))}
  </div>
);

const StatisticsChart = ({ data }) => (
  <div className="bg-slate-800 p-6 rounded-3xl mt-8 mb-8">
    <div className="mb-6">
      <div className="text-xl text-white font-bold">Statistics</div>
      <div className="text-gray-400">Donations</div>
    </div>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            stroke="#64748B" 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="#64748B" 
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#6366F1" 
            fill="url(#colorGradient)" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// Popup components
const WithdrawPopup = ({ setActivePopup }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-slate-800 p-6 rounded-3xl max-w-sm w-full">
      <div className="text-white font-semibold text-lg mb-4">Withdraw</div>
      <div className="text-white mb-4">Enter amount to withdraw:</div>
      <input 
        type="number" 
        className="w-full p-2 rounded-lg bg-slate-700 text-white mb-4"
        placeholder="Amount"
      />
      <div className="flex justify-between">
        <button 
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          onClick={() => setActivePopup(null)}  // Close the popup
        >
          Cancel
        </button>
        <button 
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
        >
          Withdraw
        </button>
      </div>
    </div>
  </div>
);

const DepositPopup = ({ setActivePopup }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-slate-800 p-6 rounded-3xl max-w-sm w-full">
      <div className="text-white font-semibold text-lg mb-4">Deposit</div>
      <div className="text-white mb-4">Enter amount to deposit:</div>
      <input 
        type="number" 
        className="w-full p-2 rounded-lg bg-slate-700 text-white mb-4"
        placeholder="Amount"
      />
      <div className="flex justify-between">
        <button 
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          onClick={() => setActivePopup(null)}  // Close the popup
        >
          Cancel
        </button>
        <button 
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg"
        >
          Deposit
        </button>
      </div>
    </div>
  </div>
);

const HistoryPopup = ({ setActivePopup }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-slate-800 p-6 rounded-3xl max-w-sm w-full">
      <div className="text-white font-semibold text-lg mb-4">Transaction History</div>
      <div className="text-white mb-4">Here are your past transactions.</div>
      <div className="space-y-2">
        {/* Add history details here */}
        <div className="text-gray-400">Transaction 1: $100</div>
        <div className="text-gray-400">Transaction 2: $50</div>
        <div className="text-gray-400">Transaction 3: $200</div>
      </div>
      <div className="flex justify-between mt-4">
        <button 
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          onClick={() => setActivePopup(null)}  // Close the popup
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const StatementsPopup = ({ setActivePopup }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-slate-800 p-6 rounded-3xl max-w-sm w-full">
      <div className="text-white font-semibold text-lg mb-4">Statements</div>
      <div className="text-white mb-4">Download your statements here.</div>
      <div className="space-y-2">
        {/* Add statement options */}
        <button className="text-indigo-500">Download January Statement</button>
        <button className="text-indigo-500">Download February Statement</button>
      </div>
      <div className="flex justify-between mt-4">
        <button 
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          onClick={() => setActivePopup(null)}  // Close the popup
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const SettingsPopup = ({ setActivePopup }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-slate-800 p-6 rounded-3xl max-w-sm w-full">
      <div className="text-white font-semibold text-lg mb-4">Settings</div>
      <div className="text-white mb-4">Manage your settings here.</div>
      <div className="flex justify-between mt-4">
        <button 
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          onClick={() => setActivePopup(null)}  // Close the popup
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [activePopup, setActivePopup] = useState(null);

  const menuItems = [
    { label: 'Withdraw', icon: <ArrowDownToLine size={20} />, active: false, onClick: () => setActivePopup('withdraw') },
    { label: 'Deposit', icon: <Plus size={20} />, active: false, onClick: () => setActivePopup('deposit') },
    { label: 'History', icon: <FileText size={20} />, active: false, onClick: () => setActivePopup('history') },
    { label: 'Statements', icon: <CreditCard size={20} />, active: false, onClick: () => setActivePopup('statements') },
    { label: 'Settings', icon: <Settings size={20} />, active: false, onClick: () => setActivePopup('settings') },
  ];

  const data = [
    { date: 'Mon', value: 50000 },
    { date: 'Tue', value: 60000 },
    { date: 'Wed', value: 70000 },
    { date: 'Thu', value: 80000 },
    { date: 'Fri', value: 120000 },
    { date: 'Sat', value: 140000 },
    { date: 'Sun', value: 160000 },
  ];

  const transactions = [
    { id: 1, type: 'Withdraw', user: 'John Doe', amount: '$1000', date: 'Oct 10, 2024' },
    { id: 2, type: 'Deposit', user: 'Jane Doe', amount: '$500', date: 'Oct 15, 2024' },
    { id: 3, type: 'Transfer', user: 'Sam Smith', amount: '$200', date: 'Oct 20, 2024' },
  ];

  return (
    <div className="flex">
      <Sidebar menuItems={menuItems} userName="Sai Karthik Battula" />
      <div className="flex-1 p-8 space-y-8">
        <div className="flex gap-8">
          <StatCard label="Balance" value="$45,000" progress={50} subValue="Available" />
          <StatCard label="Investments" value="$200,000" progress={75} change="+2.5%" />
        </div>

        <StatisticsChart data={data} />
        <TransactionList transactions={transactions} />

        {activePopup === 'withdraw' && <WithdrawPopup setActivePopup={setActivePopup} />}
        {activePopup === 'deposit' && <DepositPopup setActivePopup={setActivePopup} />}
        {activePopup === 'history' && <HistoryPopup setActivePopup={setActivePopup} />}
        {activePopup === 'statements' && <StatementsPopup setActivePopup={setActivePopup} />}
        {activePopup === 'settings' && <SettingsPopup setActivePopup={setActivePopup} />}
      </div>
    </div>
  );
};

export default Dashboard;
