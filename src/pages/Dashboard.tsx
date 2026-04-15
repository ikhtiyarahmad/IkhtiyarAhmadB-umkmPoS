import React from 'react';
import { TrendingUp, Users, Package, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
  { label: 'Total Penjualan', value: 'Rp 4.250.000', icon: DollarSign, color: 'bg-green-500', trend: '+12.5%' },
  { label: 'Total Transaksi', value: '156', icon: TrendingUp, color: 'bg-blue-500', trend: '+8.2%' },
  { label: 'Produk Terjual', value: '342', icon: Package, color: 'bg-purple-500', trend: '+5.4%' },
  { label: 'Pelanggan Baru', value: '24', icon: Users, color: 'bg-orange-500', trend: '+15.3%' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ringkasan Bisnis</h1>
        <p className="text-gray-500">Pantau performa UMKM Anda hari ini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-xl text-white`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-green-500 text-sm font-medium">{stat.trend}</span>
            </div>
            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Penjualan Terakhir</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Pelanggan #{i}</p>
                    <p className="text-xs text-gray-500">2 jam yang lalu</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-900">Rp {(Math.random() * 200000).toFixed(0)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Produk Terlaris</h3>
          <div className="space-y-6">
            {['Kopi Gayo', 'Keripik Tempe', 'Madu Hutan'].map((item, i) => (
              <div key={item} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item}</p>
                    <p className="text-xs text-gray-500">Terjual {Math.floor(Math.random() * 100)} unit</p>
                  </div>
                </div>
                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500" 
                    style={{ width: `${Math.random() * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
