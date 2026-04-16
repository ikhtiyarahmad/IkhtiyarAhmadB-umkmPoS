import React, { useState, useEffect } from 'react';
import { ShoppingCart, ShoppingBag, Search, X, Plus, Minus, Send, Store, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_PRODUCTS } from '../mockData';
import { CartItem, Product } from '../types';

export default function Webstore() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];

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
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    const phoneNumber = '6281234567890'; // Ganti dengan nomor WA toko
    const message = `Halo Toko Berkah Jaya, saya ingin memesan:\n\n` +
      cart.map(item => `- ${item.name} (${item.quantity}x) - Rp ${(item.price * item.quantity).toLocaleString('id-ID')}`).join('\n') +
      `\n\nTotal: Rp ${subtotal.toLocaleString('id-ID')}\n\nMohon info selanjutnya untuk pembayaran. Terima kasih!`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Store className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tight text-gray-900">BERKAH JAYA</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors">Beranda</a>
            <a href="#produk" className="text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors">Produk</a>
            <a href="#" className="text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors">Tentang Kami</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors group"
            >
              <ShoppingBag className="w-6 h-6 text-gray-700 group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 text-sm font-bold mb-6">
              <Star className="w-4 h-4 fill-indigo-600" />
              UMKM Pilihan Terbaik
            </div>
            <h1 className="text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] mb-8">
              Kualitas <span className="text-indigo-600">Premium</span> Dari Alam Untuk Anda.
            </h1>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-lg">
              Nikmati produk makanan dan minuman pilihan terbaik dari UMKM lokal dengan kualitas yang terjamin dan rasa yang otentik.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#produk" className="btn-primary flex items-center gap-2 px-8 py-4 text-lg">
                Belanja Sekarang
                <ChevronRight className="w-5 h-5" />
              </a>
              <button className="px-8 py-4 rounded-2xl font-bold text-lg text-gray-700 hover:bg-gray-100 transition-all">
                Lihat Promo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl rotate-3">
              <img 
                src="https://images.unsplash.com/photo-1547517023-7ca0c162f816?auto=format&fit=crop&w=1000&q=80" 
                alt="High quality food" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 -rotate-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                  <Star className="w-6 h-6 fill-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Terpercaya</p>
                  <p className="text-xs text-gray-500">1000+ Pelanggan Puas</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produk" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-4">Produk Unggulan</h2>
              <p className="text-gray-500 max-w-md">Pilih produk favorit Anda dari koleksi terbaik kami.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                    selectedCategory === cat 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map((product, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={product.id}
                className="premium-card group"
              >
                <div className="aspect-square overflow-hidden rounded-t-[2.5rem] relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 right-6 px-4 py-1.5 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-indigo-600 shadow-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Harga</p>
                      <p className="text-2xl font-black text-gray-900">Rp {product.price.toLocaleString('id-ID')}</p>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-90"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900">Keranjang</h2>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{totalItems} Item Terpilih</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-3 hover:bg-gray-100 rounded-2xl transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-6">
                      <ShoppingBag className="w-10 h-10 text-gray-200" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Keranjang Kosong</h3>
                    <p className="text-gray-400 max-w-[200px]">Mulai belanja dan temukan produk favorit Anda.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-6">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">{item.name}</h4>
                          <p className="text-sm font-bold text-indigo-600">Rp {item.price.toLocaleString('id-ID')}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center bg-gray-100 rounded-xl p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-8 bg-gray-50 border-t border-gray-100 space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Pembayaran</p>
                    <p className="text-3xl font-black text-gray-900">Rp {subtotal.toLocaleString('id-ID')}</p>
                  </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full bg-green-600 text-white py-5 rounded-[2rem] font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-green-100 hover:bg-green-700 transition-all disabled:opacity-50 active:scale-95"
                >
                  <Send className="w-6 h-6" />
                  Pesan via WhatsApp
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Store className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-black tracking-tight">BERKAH JAYA</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Menyediakan produk UMKM berkualitas tinggi dengan rasa yang otentik dan harga yang terjangkau.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Tautan Cepat</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Beranda</a></li>
              <li><a href="#produk" className="hover:text-white transition-colors">Produk</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kontak</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Kategori</h4>
            <ul className="space-y-4 text-gray-400">
              {categories.slice(1).map(cat => (
                <li key={cat}><a href="#" className="hover:text-white transition-colors">{cat}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-gray-400">
              <li>Jl. Berkah No. 123, Jakarta</li>
              <li>+62 812 3456 7890</li>
              <li>info@berkahjaya.com</li>
              <li className="pt-4 border-t border-white/5">
                <a href="/admin" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Admin Panel</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>&copy; 2024 Toko Berkah Jaya. Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
