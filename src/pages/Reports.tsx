import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, FileText, TrendingUp, DollarSign, ShoppingBag, PieChart as PieChartIcon } from 'lucide-react';
import { motion } from 'motion/react';

const data = [
  { name: 'Senin', sales: 1200000 },
  { name: 'Selasa', sales: 1800000 },
  { name: 'Rabu', sales: 1500000 },
  { name: 'Kamis', sales: 2100000 },
  { name: 'Jumat', sales: 2800000 },
  { name: 'Sabtu', sales: 3500000 },
  { name: 'Minggu', sales: 4200000 },
];

const categoryData = [
  { name: 'Minuman', value: 400 },
  { name: 'Makanan Ringan', value: 300 },
  { name: 'Bumbu', value: 200 },
  { name: 'Kesehatan', value: 100 },
];

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

export default function Reports() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan Penjualan</h1>
          <p className="text-gray-500">Analisis performa bisnis UMKM Anda secara mendalam.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white text-gray-700 px-6 py-3 rounded-xl font-bold border border-gray-200 flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <FileText className="w-5 h-5" />
            PDF Laporan
          </button>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
            <Download className="w-5 h-5" />
            Ekspor Excel
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
            <DollarSign className="w-6 h-6" />
          </div>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Total Pendapatan</p>
          <h3 className="text-2xl font-black text-gray-900 mt-1">Rp 17.100.000</h3>
          <p className="text-green-500 text-xs font-bold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +20% dari bulan lalu
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Produk Terjual</p>
          <h3 className="text-2xl font-black text-gray-900 mt-1">1,240 Unit</h3>
          <p className="text-green-500 text-xs font-bold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +15% dari bulan lalu
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-4">
            <PieChartIcon className="w-6 h-6" />
          </div>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Margin Keuntungan</p>
          <h3 className="text-2xl font-black text-gray-900 mt-1">32.5%</h3>
          <p className="text-green-500 text-xs font-bold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +2% dari bulan lalu
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-gray-900 mb-8 uppercase tracking-widest">Tren Penjualan Mingguan</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} tickFormatter={(value) => `Rp ${value / 1000000}jt`} />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`Rp ${value.toLocaleString('id-ID')}`, 'Penjualan']}
                />
                <Bar dataKey="sales" fill="#4f46e5" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Chart */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-black text-gray-900 mb-8 uppercase tracking-widest">Distribusi Kategori</h3>
          <div className="h-80 w-full flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4 pr-8">
              {categoryData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-sm font-bold text-gray-600 uppercase tracking-widest">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
