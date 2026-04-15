import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center bg-gray-50 px-4 py-2 rounded-xl w-96 border border-gray-100 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
        <Search className="w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Cari produk atau transaksi..." 
          className="bg-transparent border-none outline-none ml-3 w-full text-sm text-gray-700"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-500 hover:bg-gray-50 rounded-full transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">Admin UMKM</p>
            <p className="text-xs text-gray-500">Toko Berkah Jaya</p>
          </div>
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            <User className="w-6 h-6" />
          </div>
        </div>
      </div>
    </header>
  );
}
