import React from 'react';
import { Plus, Search, Filter, Phone, Mail, MapPin, User, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { MOCK_SUPPLIERS } from '../mockData';
import { motion } from 'motion/react';

export default function Suppliers() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Modul Supplier</h1>
          <p className="text-gray-500">Kelola daftar pemasok bahan baku dan produk UMKM Anda.</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 uppercase tracking-widest text-xs">
          <Plus className="w-5 h-5" />
          Tambah Supplier
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between bg-gray-50/30">
          <div className="flex items-center bg-white px-4 py-2 rounded-xl w-full sm:w-96 border border-gray-100 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
            <Search className="w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari nama supplier atau kontak..." 
              className="bg-transparent border-none outline-none ml-3 w-full text-sm text-gray-700"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-2 text-gray-600 border border-gray-200 rounded-xl hover:bg-white transition-colors text-sm font-bold">
            <Filter className="w-5 h-5" />
            Filter Kategori
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-8">
          {MOCK_SUPPLIERS.map((supplier, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              key={supplier.id}
              className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group relative"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <User className="w-6 h-6" />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-black text-gray-900 leading-tight">{supplier.name}</h3>
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-1">{supplier.category}</p>
                </div>

                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <span>{supplier.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-green-500">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span>{supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-blue-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="truncate">{supplier.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-orange-500">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="truncate">{supplier.address}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID: {supplier.id}</span>
                <button className="text-xs font-bold text-indigo-600 hover:underline">Lihat Riwayat Pasokan</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
