import React from 'react';
import { Search, Filter, Download, Eye, Calendar } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../mockData';

export default function History() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Riwayat Transaksi</h1>
          <p className="text-gray-500">Lihat dan kelola semua transaksi yang telah dilakukan.</p>
        </div>
        <button className="bg-white text-gray-700 px-6 py-3 rounded-xl font-bold border border-gray-200 flex items-center gap-2 hover:bg-gray-50 transition-colors">
          <Download className="w-5 h-5" />
          Ekspor Laporan
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-50 px-4 py-2 rounded-xl w-full sm:w-80 border border-gray-100 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
              <Search className="w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Cari ID transaksi..." 
                className="bg-transparent border-none outline-none ml-3 w-full text-sm text-gray-700"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Calendar className="w-5 h-5" />
              Pilih Tanggal
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID Transaksi</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Tanggal & Waktu</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Metode</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_TRANSACTIONS.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="font-bold text-indigo-600">{trx.id}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(trx.date).toLocaleString('id-ID', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {trx.items[0].name} {trx.items.length > 1 ? `+${trx.items.length - 1} lainnya` : ''}
                      </span>
                      <span className="text-xs text-gray-500">{trx.items.reduce((a, b) => a + b.quantity, 0)} unit</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    Rp {trx.total.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      trx.paymentMethod === 'qris' ? 'bg-purple-50 text-purple-600' :
                      trx.paymentMethod === 'cash' ? 'bg-green-50 text-green-600' :
                      'bg-blue-50 text-blue-600'
                    }`}>
                      {trx.paymentMethod}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
