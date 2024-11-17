'use client';

import React from 'react';
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
const Sidebar = ({ menuItems, userName, userHandle }) => (
  <div className="w-60 bg-slate-800 rounded-3xl p-6">
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-8">
        <div className="text-white font-semibold text-xl">SpinMaster</div>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button 
            key={item.label} 
            className={`flex w-full items-center gap-3 p-3 rounded-xl transition-colors
              ${item.active 
                ? 'bg-indigo-500 text-white' 
                : 'text-gray-400 hover:bg-slate-700'}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>

    <div className="mt-8 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
        <span className="text-white">{userName.split(' ').map(n => n[0]).join('')}</span>
      </div>
      <div>
        <div className="text-white">{userName}</div>
        <div className="text-sm text-gray-400">{userHandle}</div>
      </div>
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
  <div className="bg-slate-800 p-6 rounded-3xl">
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

// Data
const chartData = [
  { date: '2024-01', value: 82000 },
  { date: '2024-02', value: 91000 },
  { date: '2024-03', value: 84000 },
  { date: '2024-04', value: 89000 },
  { date: '2024-05', value: 86000 },
  { date: '2024-06', value: 95000 },
];

const transactions = [
  { 
    id: 1, 
    type: 'Required Fund',
    amount: '+4500.00',
    date: 'Sep 07 2024',
    user: 'Jenny Wilson'
  },
  { 
    id: 2, 
    type: 'Contribution',
    amount: '+2900.00',
    date: 'Sep 07 2024',
    user: 'Jenny Wilson'
  },
  { 
    id: 3, 
    type: 'Required Fund',
    amount: '+1200.00',
    date: 'Sep 07 2024',
    user: 'Jenny Wilson'
  },
  { 
    id: 4, 
    type: 'CF',
    amount: '+1850.00',
    date: 'Sep 06 2024',
    user: 'Jenny Wilson'
  },
  { 
    id: 5, 
    type: 'Contribution',
    amount: '+3450.00',
    date: 'Sep 06 2024',
    user: 'Jenny Wilson'
  }
];

const menuItems = [
  { icon: <LayoutGrid size={20} />, label: 'Dashboard', active: true },
  { icon: <ArrowDownToLine size={20} />, label: 'Withdraw' },
  { icon: <BarChart2 size={20} />, label: 'Statistics' },
  { icon: <FileText size={20} />, label: 'Overview' },
  { icon: <FileText size={20} />, label: 'Mission Set' },
  { icon: <Settings size={20} />, label: 'Settings' },
  { icon: <CreditCard size={20} />, label: 'Payment' },
  { icon: <User size={20} />, label: 'My Profile' }
];

export default function Dashboard() {
  return (
    <div className="bg-slate-900 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-6">
          <Sidebar 
            menuItems={menuItems} 
            userName="Daniel Lewis" 
            userHandle="@daniellewis" 
          />

          <main className="flex-1 space-y-6">
            <header className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="text-xs text-gray-400">
                  <span className="text-indigo-500">• </span>
                  $325,064.34
                  <span className="text-indigo-500 ml-4">• </span>
                  Contribution $541,840.00
                  <span className="text-purple-500 ml-4">• </span>
                  Required Fund $285,371.00
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors">
                  Donate
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-300">
                  <Plus />
                </button>
              </div>
            </header>

            <h1 className="text-2xl text-white font-semibold">Welcome, Daniel!</h1>

            <div className="flex gap-6">
              <StatCard 
                label="Total Balance"
                value="$541,840.00"
                progress={75}
                subValue="$285,371.00"
                change="+3.5%"
              />
              <StatCard 
                label="Available Balance"
                value="$120,184.34"
              />
            </div>

            <StatisticsChart data={chartData} />
            <TransactionList transactions={transactions} />
          </main>
        </div>
      </div>
    </div>
  );
}