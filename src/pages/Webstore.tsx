import React, { useState, useEffect } from 'react';
import { ShoppingCart, ShoppingBag, Search, X, Plus, Minus, Send, Store, ChevronRight, Star, CreditCard, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_PRODUCTS, DEFAULT_SETTINGS } from '../mockData';
import { AppSettings, CartItem, Product } from '../types';

export default function Webstore() {
  const [settings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('app_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];

  const calculateSellingPrice = (purchasePrice: number) => {
    return settings.marginType === 'percentage'
      ? purchasePrice * (1 + settings.marginValue / 100)
      : purchasePrice + settings.marginValue;
  };

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

  const subtotal = cart.reduce((sum, item) => sum + (calculateSellingPrice(item.purchasePrice) * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<{ items: CartItem[], total: number, id: string } | null>(null);

  const handleTransferPayment = () => {
    setIsPaymentModalOpen(true);
  };

  const confirmPayment = () => {
    const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setLastOrder({ items: cart, total: subtotal, id: orderId });
    setIsPaymentModalOpen(false);
    setIsCartOpen(false);
    setIsReceiptOpen(true);
    setCart([]);
  };

  const printReceipt = () => {
    window.print();
  };

  const handleCheckoutWA = () => {
    const phoneNumber = '6281234567890';
    const message = `Halo ${settings.appName}, saya ingin memesan:\n\n` +
      cart.map(item => `- ${item.name} (${item.quantity}x) - Rp ${(calculateSellingPrice(item.purchasePrice) * item.quantity).toLocaleString('id-ID')}`).join('\n') +
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
            <span className="text-xl font-black tracking-tight text-gray-900 uppercase">{settings.appName}</span>
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
              {settings.appName.split(' ').slice(0, -1).join(' ')} <span className="text-indigo-600">{settings.appName.split(' ').pop()}</span> Premium.
            </h1>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed max-w-lg">
              {settings.appDescription}
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
                <Link to={`/product/${product.id}`} className="block">
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
                </Link>
                <div className="p-8">
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Harga</p>
                      <p className="text-2xl font-black text-gray-900">Rp {calculateSellingPrice(product.purchasePrice).toLocaleString('id-ID')}</p>
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
                      <Link to={`/product/${item.id}`} className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 block">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </Link>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <Link to={`/product/${item.id}`}>
                            <h4 className="font-bold text-gray-900 mb-1 hover:text-indigo-600 transition-colors">{item.name}</h4>
                          </Link>
                          <p className="text-sm font-bold text-indigo-600">Rp {calculateSellingPrice(item.purchasePrice).toLocaleString('id-ID')}</p>
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

              <div className="p-8 bg-gray-50 border-t border-gray-100 space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Pembayaran</p>
                    <p className="text-3xl font-black text-gray-900">Rp {subtotal.toLocaleString('id-ID')}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <button 
                    onClick={handleTransferPayment}
                    disabled={cart.length === 0}
                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 active:scale-95"
                  >
                    Bayar via Transfer
                  </button>
                  <button 
                    onClick={handleCheckoutWA}
                    disabled={cart.length === 0}
                    className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-green-100 hover:bg-green-700 transition-all disabled:opacity-50 active:scale-95 text-sm"
                  >
                    <Send className="w-5 h-5" />
                    Pesan via WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {isPaymentModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
                  <CreditCard className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Instruksi Pembayaran</h3>
                <p className="text-gray-500 mb-8">Silakan transfer sesuai nominal ke rekening berikut:</p>
                
                <div className="bg-gray-50 rounded-3xl p-6 mb-8 text-left space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-bold uppercase tracking-widest">Bank</span>
                    <span className="text-gray-900 font-black">BCA (Bank Central Asia)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-bold uppercase tracking-widest">No. Rekening</span>
                    <span className="text-gray-900 font-black">123 - 4567 - 890</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-bold uppercase tracking-widest">Atas Nama</span>
                    <span className="text-gray-900 font-black">{settings.appName}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Total Bayar</span>
                    <span className="text-2xl font-black text-indigo-600">Rp {subtotal.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setIsPaymentModalOpen(false)}
                    className="py-4 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 transition-all"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={confirmPayment}
                    className="btn-primary"
                  >
                    Konfirmasi Bayar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* User Receipt Modal */}
      <AnimatePresence>
        {isReceiptOpen && lastOrder && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 no-print-bg">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl print:shadow-none print:w-full print:max-w-none print:rounded-none overflow-hidden"
              id="print-receipt"
            >
              <div className="p-10">
                <div className="text-center mb-10">
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 print:hidden">
                    <Star className="w-8 h-8 fill-white" />
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 uppercase">{settings.appName}</h2>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">Struk Pembayaran Sah</p>
                </div>

                <div className="border-t border-b border-dashed border-gray-200 py-6 mb-8 space-y-3">
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>ID Pesanan</span>
                    <span className="text-gray-900">#{lastOrder.id}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>Tanggal</span>
                    <span className="text-gray-900">{new Date().toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  {lastOrder.items.map(item => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-bold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.quantity} x Rp {calculateSellingPrice(item.purchasePrice).toLocaleString('id-ID')}</p>
                      </div>
                      <p className="font-bold text-gray-900">Rp {(calculateSellingPrice(item.purchasePrice) * item.quantity).toLocaleString('id-ID')}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-3xl p-8 mb-10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400 font-bold underline underline-offset-4 uppercase tracking-widest">Total Bersih</span>
                    <span className="text-3xl font-black text-gray-900">Rp {lastOrder.total.toLocaleString('id-ID')}</span>
                  </div>
                  <p className="text-[10px] text-center text-gray-400 uppercase tracking-[0.2em] mt-6">Terima kasih atas pesanan Anda!</p>
                </div>

                <div className="flex gap-4 print:hidden">
                  <button 
                    onClick={() => setIsReceiptOpen(false)}
                    className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-500 hover:bg-gray-200"
                  >
                    Tutup
                  </button>
                  <button 
                    onClick={printReceipt}
                    className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Cetak Struk
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
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
              <span className="text-xl font-black tracking-tight uppercase">{settings.appName}</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {settings.appDescription}
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
          <p>&copy; {new Date().getFullYear()} {settings.appName}. Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
