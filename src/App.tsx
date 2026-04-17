import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import PoS from './pages/PoS';
import History from './pages/History';
import Webstore from './pages/Webstore';
import Reports from './pages/Reports';
import Suppliers from './pages/Suppliers';
import Settings from './pages/Settings';
import ProductDetail from './pages/ProductDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Webstore */}
        <Route path="/" element={<Webstore />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="pos" element={<PoS />} />
          <Route path="history" element={<History />} />
          <Route path="reports" element={<Reports />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
