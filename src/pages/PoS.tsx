import React, { useState } from 'react';
import { Search, ShoppingCart, Trash2, Plus, Minus, CreditCard, Wallet, Banknote } from 'lucide-react';
import { MOCK_PRODUCTS } from '../mockData';
import { CartItem, Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function PoS() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex gap-8 h-[calc(100vh-160px)]">
      {/* Product Selection */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Kasir / PoS</h1>
          <div className="flex items-center bg-white px-4 py-2 rounded-xl w-80 border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
            <Search className="w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari produk..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none ml-3 w-full text-sm text-gray-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto pr-2">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              onClick={() => addToCart(product)}
              className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-4 relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-indigo-600">
                  {product.stock} unit
                </div>
              </div>
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">{product.category}</p>
              <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
              <p className="text-lg font-black text-gray-900">Rp {product.price.toLocaleString('id-ID')}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart / Checkout */}
      <div className="w-96 bg-white rounded-3xl border border-gray-100 shadow-xl flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-gray-900">Pesanan Baru</h2>
          </div>
          <button 
            onClick={() => setCart([])}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                <ShoppingCart className="w-12 h-12 opacity-20" />
                <p className="text-sm font-medium">Keranjang masih kosong</p>
              </div>
            ) : (
              cart.map((item) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  key={item.id}
                  className="flex items-center gap-4"
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-xl object-cover border border-gray-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate">{item.name}</h4>
                    <p className="text-sm text-gray-500">Rp {item.price.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center bg-gray-50 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-white rounded transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-white rounded transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Pajak (10%)</span>
              <span>Rp {tax.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-xl font-black text-gray-900 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button className="flex flex-col items-center justify-center gap-1 p-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-500 hover:text-indigo-600 transition-all group">
              <Banknote className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase">Tunai</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1 p-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-500 hover:text-indigo-600 transition-all group">
              <Wallet className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase">QRIS</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1 p-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-500 hover:text-indigo-600 transition-all group">
              <CreditCard className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase">Kartu</span>
            </button>
          </div>

          <button 
            disabled={cart.length === 0}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:shadow-none"
          >
            Proses Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
}
