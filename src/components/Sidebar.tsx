import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  History, 
  Store,
  ChevronLeft,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Package, label: 'Kelola Produk', path: '/admin/products' },
  { icon: ShoppingCart, label: 'Kasir/PoS', path: '/admin/pos' },
  { icon: History, label: 'Riwayat Transaksi', path: '/admin/history' },
  { icon: BarChart3, label: 'Laporan', path: '/admin/reports' },
];

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 260 : 80 }}
      className="fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-50 flex flex-col transition-all duration-300 ease-in-out"
    >
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Store className="text-white w-6 h-6" />
          </div>
          {isOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-xl text-gray-900 whitespace-nowrap"
            >
              UMKM Kita
            </motion.span>
          )}
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group
              ${isActive 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
            `}
          >
            <item.icon className="w-6 h-6 flex-shrink-0" />
            {isOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            )}
            {!isOpen && (
              <div className="absolute left-20 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 border-t border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
      >
        {isOpen ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
      </button>
    </motion.aside>
  );
}
