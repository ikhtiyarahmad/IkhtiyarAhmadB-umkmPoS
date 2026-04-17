import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Plus, Minus, Star, ShieldCheck, Truck, RefreshCcw, Store, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_PRODUCTS, DEFAULT_SETTINGS } from '../mockData';
import { AppSettings, Product, CartItem } from '../types';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [settings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('app_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    const foundProduct = MOCK_PRODUCTS.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const calculateSellingPrice = (purchasePrice: number) => {
    return settings.marginType === 'percentage'
      ? purchasePrice * (1 + settings.marginValue / 100)
      : purchasePrice + settings.marginValue;
  };

  const addToCart = () => {
    if (!product) return;
    
    // In a real app, we'd use a context or global state
    // For now, we'll just show it being added
    console.log(`Added ${quantity} of ${product.name} to cart`);
    // This part is symbolic unless we implement a shared cart state
    setIsCartOpen(true);
  };

  if (!product) return null;

  const sellingPrice = calculateSellingPrice(product.purchasePrice);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Detail Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm uppercase tracking-widest">Kembali ke Toko</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Store className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tight text-gray-900 uppercase">{settings.appName}</span>
          </div>

          <button className="relative p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors group">
            <ShoppingBag className="w-6 h-6 text-gray-700 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-square bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/50">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <div className="inline-flex px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                {product.category}
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-8">
                <p className="text-4xl font-black text-indigo-600">
                  Rp {sellingPrice.toLocaleString('id-ID')}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">(4.9 Ratings)</span>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-500 leading-relaxed font-medium">
              {product.description}
            </p>

            <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Jumlah</span>
                <div className="flex items-center bg-gray-50 rounded-2xl p-2 gap-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-gray-600 hover:text-indigo-600 transition-colors disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-lg font-black">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-gray-600 hover:text-indigo-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={addToCart}
                  className="flex-1 bg-indigo-600 text-white py-5 rounded-[2rem] font-black text-lg shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Tambah ke Keranjang
                </button>
                <Link 
                  to="/"
                  className="px-10 py-5 bg-gray-900 text-white rounded-[2rem] font-black text-lg flex items-center justify-center hover:bg-black transition-all"
                >
                  Beli Sekarang
                </Link>
              </div>

              <div className="pt-6 border-t border-gray-50 flex items-center justify-center gap-6">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Produk Terjamin
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-500" />
                  Pengiriman Cepat
                </span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <RefreshCcw className="w-4 h-4 text-emerald-500" />
                  Garansi Pupas
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Similar Products */}
        <section className="mt-24 space-y-12">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">Cek Produk Lainnya</h3>
            <Link to="/" className="text-sm font-black text-indigo-600 uppercase tracking-widest hover:underline">Lihat Semua</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_PRODUCTS.filter(p => p.id !== id).slice(0, 4).map(p => (
              <Link key={p.id} to={`/product/${p.id}`} className="group space-y-4">
                <div className="aspect-square rounded-[2rem] overflow-hidden bg-white border border-gray-100 shadow-sm">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-700 truncate">{p.name}</h4>
                  <p className="text-lg font-black text-gray-900">Rp {calculateSellingPrice(p.purchasePrice).toLocaleString('id-ID')}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
