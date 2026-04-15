import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { motion } from 'motion/react';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <motion.main 
        animate={{ marginLeft: isSidebarOpen ? 260 : 80 }}
        className="flex-1 flex flex-col transition-all duration-300 ease-in-out"
      >
        <Header />
        <div className="p-8">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
}
