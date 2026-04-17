import React, { useState } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, ArrowUpRight } from 'lucide-react';
import { MOCK_PRODUCTS, DEFAULT_SETTINGS } from '../mockData';
import { AppSettings } from '../types';

export default function Products() {
  const [settings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('app_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Produk</h1>
          <p className="text-gray-500">Tambah, edit, atau hapus produk dari inventaris Anda.</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 uppercase tracking-widest text-xs">
          <Plus className="w-5 h-5" />
          Tambah Produk
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/30">
          <div className="flex items-center bg-white px-4 py-2 rounded-xl w-full sm:w-96 border border-gray-100 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
            <Search className="w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari produk..." 
              className="bg-transparent border-none outline-none ml-3 w-full text-sm text-gray-700"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-2 text-gray-600 border border-gray-200 rounded-xl hover:bg-white transition-colors text-sm font-bold">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Produk</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Kategori</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Harga Beli</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Harga Jual</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Stok</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_PRODUCTS.map((product) => {
                const calculatedSellingPrice = settings.marginType === 'percentage'
                  ? product.purchasePrice * (1 + settings.marginValue / 100)
                  : product.purchasePrice + settings.marginValue;
                
                return (
                  <tr key={product.id} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border border-gray-100 shrink-0">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="font-bold text-gray-900 line-clamp-1">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-medium text-gray-500">
                        Rp {product.purchasePrice.toLocaleString('id-ID')}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-indigo-600">
                          Rp {calculatedSellingPrice.toLocaleString('id-ID')}
                        </span>
                        <div className="px-1.5 py-0.5 bg-green-50 text-[8px] font-black text-green-600 rounded flex items-center gap-0.5">
                          <ArrowUpRight className="w-2 h-2" />
                          {settings.marginType === 'percentage' ? `${settings.marginValue}%` : `+Rp ${settings.marginValue.toLocaleString('id-ID')}`}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className={`text-sm font-black ${product.stock < 15 ? 'text-red-500' : 'text-gray-900'}`}>
                          {product.stock} Unit
                        </span>
                        <div className="w-20 h-1 bg-gray-100 rounded-full mt-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${product.stock < 15 ? 'bg-red-500' : 'bg-indigo-500'}`}
                            style={{ width: `${Math.min(100, (product.stock / 50) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right whitespace-nowrap">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <button className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
