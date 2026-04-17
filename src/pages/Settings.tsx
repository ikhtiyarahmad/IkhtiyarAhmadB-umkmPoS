import React, { useState, useEffect } from 'react';
import { Save, Building2, Percent, DollarSign, Layout, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { AppSettings } from '../types';
import { DEFAULT_SETTINGS } from '../mockData';

export default function Settings() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('app_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem('app_settings', JSON.stringify(settings));
    window.dispatchEvent(new Event('settings_updated'));
  }, [settings]);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: 'Profil Aplikasi', icon: Building2 },
    { id: 'pricing', label: 'Margin Profit', icon: DollarSign },
    { id: 'system', label: 'Informasi Sistem', icon: Layout },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Pengaturan</h1>
          <p className="text-gray-500 font-medium mt-1">Kelola identitas aplikasi dan strategi margin keuntungan bisnis Anda.</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-indigo-600 text-white px-8 py-4 rounded-3xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 group active:scale-95"
        >
          <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
          {isSaved ? 'Berhasil Disimpan!' : 'Simpan Perubahan'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Tab Navigation Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white p-3 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
                  activeTab === tab.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-indigo-600'
                }`}
              >
                <tab.icon className={`w-5 h-5 transition-colors ${activeTab === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-indigo-600'}`} />
                <span className="font-black text-sm uppercase tracking-widest">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100 overflow-hidden relative group">
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-2 tracking-tight">Status Sistem</h3>
              <p className="text-indigo-100 text-xs leading-relaxed mb-6 font-medium">Platform berjalan dengan performa optimal.</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-indigo-300">
                  <span>Version</span>
                  <span className="text-white">v3.0.4</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-indigo-300">
                  <span>Engine</span>
                  <span className="text-white">React 19</span>
                </div>
              </div>
            </div>
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
          </div>
        </div>

        {/* Dynamic Tab Content Area */}
        <div className="flex-1 min-w-0">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-xl shadow-gray-200/20 min-h-[550px]"
          >
            {activeTab === 'profile' && (
              <div className="space-y-12">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 shrink-0">
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Profil Aplikasi</h2>
                    <p className="text-gray-500 font-medium">Informasi ini akan ditampilkan pada seluruh antarmuka publik.</p>
                  </div>
                </div>
                
                <div className="space-y-10">
                  <div className="space-y-4">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Nama Toko / Brand</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-8 flex items-center text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <input 
                        type="text"
                        value={settings.appName}
                        onChange={(e) => setSettings({...settings, appName: e.target.value})}
                        className="w-full bg-gray-50 border-2 border-transparent rounded-[2.5rem] pl-20 pr-10 py-6 text-gray-900 font-bold text-xl focus:ring-0 focus:bg-white focus:border-indigo-600/10 transition-all shadow-sm"
                        placeholder="Nama usaha Anda..."
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Tentang Kami</label>
                    <textarea 
                      value={settings.appDescription}
                      onChange={(e) => setSettings({...settings, appDescription: e.target.value})}
                      rows={5}
                      className="w-full bg-gray-50 border-2 border-transparent rounded-[2.5rem] px-10 py-8 text-gray-900 font-bold text-xl focus:ring-0 focus:bg-white focus:border-indigo-600/10 transition-all shadow-sm resize-none"
                      placeholder="Tuliskan deskripsi menarik untuk pelanggan Anda..."
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="space-y-12">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 shrink-0">
                    <DollarSign className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Margin Keuntungan</h2>
                    <p className="text-gray-500 font-medium">Atur cara aplikasi menghitung harga jual secara otomatis.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Model Kalkulasi</label>
                    <div className="flex p-2 bg-gray-100 rounded-[2.5rem] gap-2">
                      <button 
                        onClick={() => setSettings({...settings, marginType: 'percentage'})}
                        className={`flex-1 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all ${settings.marginType === 'percentage' ? 'bg-white text-indigo-600 shadow-xl' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Persentase (%)
                      </button>
                      <button 
                        onClick={() => setSettings({...settings, marginType: 'nominal'})}
                        className={`flex-1 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all ${settings.marginType === 'nominal' ? 'bg-white text-indigo-600 shadow-xl' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Nominal (Rp)
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                      Nilai Profit {settings.marginType === 'percentage' ? '(%)' : '(Rp)'}
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-10 flex items-center text-gray-400 font-black text-2xl group-focus-within:text-emerald-500 transition-colors">
                        {settings.marginType === 'percentage' ? <Percent className="w-7 h-7" /> : 'Rp'}
                      </div>
                      <input 
                        type="number"
                        value={settings.marginValue}
                        onChange={(e) => setSettings({...settings, marginValue: Number(e.target.value)})}
                        className="w-full bg-gray-50 border-2 border-transparent rounded-[2.5rem] pl-24 pr-10 py-6 text-gray-900 font-black text-3xl focus:ring-0 focus:bg-white focus:border-emerald-600/10 transition-all shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-emerald-100 flex flex-col md:flex-row gap-8 items-center md:items-start group overflow-hidden relative">
                  <div className="w-20 h-20 bg-white/20 rounded-[2rem] flex items-center justify-center backdrop-blur-xl shrink-0 z-10 border border-white/20">
                    <Info className="w-10 h-10" />
                  </div>
                  <div className="space-y-3 text-center md:text-left z-10">
                    <h4 className="font-black text-white uppercase tracking-[0.3em] text-xs opacity-70">Simulasi Penjualan</h4>
                    <p className="text-xl md:text-2xl font-black leading-tight text-white drop-shadow-sm">
                      Harga Jual Baru = Harga Beli + 
                      <span className="block text-4xl md:text-5xl font-black mt-2 text-yellow-300">
                        {settings.marginType === 'percentage' 
                          ? `${settings.marginValue}%`
                          : `Rp ${settings.marginValue.toLocaleString('id-ID')}`
                        }
                      </span>
                    </p>
                  </div>
                  {/* Background Accents */}
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                </div>
              </div>
            )}

            {activeTab === 'system' && (
              <div className="space-y-12">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-amber-50 rounded-3xl flex items-center justify-center text-amber-600 shrink-0">
                    <Layout className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Informasi Sistem</h2>
                    <p className="text-gray-500 font-medium">Detail infrastruktur dan status aplikasi saat ini.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="p-10 border-2 border-gray-50 rounded-[2.5rem] bg-gray-50/30 group hover:border-indigo-100 transition-all">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Storage Usage</p>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-black text-gray-900">12.4</span>
                      <span className="text-sm font-bold text-gray-400 mb-1">MB / 100MB</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full mt-6 overflow-hidden">
                      <div className="bg-indigo-600 h-full w-[12.4%] transition-all duration-1000"></div>
                    </div>
                  </div>

                  <div className="p-10 border-2 border-gray-50 rounded-[2.5rem] bg-gray-50/30 group hover:border-indigo-100 transition-all">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Response Time</p>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-black text-gray-900">42</span>
                      <span className="text-sm font-bold text-gray-400 mb-1">ms</span>
                    </div>
                    <div className="mt-8 flex gap-1 items-end h-8">
                      {[40, 35, 45, 30, 50, 42].map((h, i) => (
                        <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-emerald-400 rounded-t-sm"></div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-10 rounded-[3rem] text-white flex justify-between items-center group cursor-pointer hover:bg-black transition-all">
                  <div>
                    <h4 className="font-black text-xl mb-1 group-hover:text-indigo-400 transition-colors">Log Sistem</h4>
                    <p className="text-gray-500 text-sm font-medium">Lihat aktivitas sistem terakhir...</p>
                  </div>
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all">
                    <Save className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
