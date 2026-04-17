import React, { useState, useEffect } from 'react';
import { Bell, Search, User, ExternalLink } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { DEFAULT_SETTINGS } from '../mockData';
import { AppSettings } from '../types';

export default function Header() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('app_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    const handleSettingsUpdate = () => {
      const saved = localStorage.getItem('app_settings');
      if (saved) setSettings(JSON.parse(saved));
    };
    window.addEventListener('settings_updated', handleSettingsUpdate);
    return () => window.removeEventListener('settings_updated', handleSettingsUpdate);
  }, []);

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-40 backdrop-blur-md bg-white/80">
      <div className="flex items-center gap-6">
        <div className="flex items-center bg-gray-50/50 px-5 py-2.5 rounded-2xl w-96 border border-gray-100 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:bg-white transition-all shadow-sm">
          <Search className="w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari..." 
            className="bg-transparent border-none outline-none ml-3 w-full text-sm text-gray-700 font-medium"
          />
        </div>

        <NavLink 
          to="/" 
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-indigo-100 transition-all border border-indigo-100"
        >
          <ExternalLink className="w-4 h-4" />
          Lihat Toko
        </NavLink>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2.5 text-gray-400 hover:bg-gray-100 rounded-xl transition-all">
          <Bell className="w-6 h-6" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-4 pl-6 border-l border-gray-100">
          <div className="text-right hidden lg:block">
            <p className="text-sm font-black text-gray-900 uppercase tracking-widest">Admin Panel</p>
            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-0.5">{settings.appName}</p>
          </div>
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 border border-indigo-100 shadow-sm transition-transform hover:scale-105 cursor-pointer">
            <User className="w-6 h-6" />
          </div>
        </div>
      </div>
    </header>
  );
}
