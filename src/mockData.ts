import { Product, Transaction, Supplier, AppSettings } from './types';

export const DEFAULT_SETTINGS: AppSettings = {
  appName: 'Berkah Jaya UMKM',
  appDescription: 'Solusi Digital Terbaik untuk UMKM Lokal',
  marginType: 'percentage',
  marginValue: 20
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Kopi Gayo 250g',
    purchasePrice: 50000,
    sellingPrice: 65000,
    stock: 24,
    category: 'Minuman',
    image: 'https://images.unsplash.com/photo-1559056199-19158c482788?auto=format&fit=crop&w=800&q=80',
    description: 'Biji kopi pilihan dari tanah Gayo, Aceh. Memiliki cita rasa fruity dengan body yang tebal dan aroma rempah yang khas.'
  },
  {
    id: '2',
    name: 'Keripik Tempe Rejeki',
    purchasePrice: 12000,
    sellingPrice: 15000,
    stock: 50,
    category: 'Makanan Ringan',
    image: 'https://images.unsplash.com/photo-1621262100021-3e4b7b2fb0a7?auto=format&fit=crop&w=800&q=80',
    description: 'Camilan tradisional tempe yang diiris tipis dan digoreng hingga renyah dengan bumbu bawang putih dan rempah pilihan.'
  },
  {
    id: '3',
    name: 'Madu Hutan Asli 500ml',
    purchasePrice: 100000,
    sellingPrice: 120000,
    stock: 12,
    category: 'Kesehatan',
    image: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=80',
    description: 'Madu murni yang dipanen langsung dari sarang lebah hutan liar. Tanpa tambahan gula, alami dan menyehatkan.'
  },
  {
    id: '4',
    name: 'Sambal Bawang Pedas',
    purchasePrice: 20000,
    sellingPrice: 25000,
    stock: 30,
    category: 'Bumbu',
    image: 'https://images.unsplash.com/photo-1455619411447-36037384b68e?auto=format&fit=crop&w=800&q=80',
    description: 'Sambal ulek bawang merah dan cabai rawit segar yang digoreng dengan minyak kelapa berkualitas. Pedas nendang!'
  },
  {
    id: '5',
    name: 'Teh Melati Premium',
    purchasePrice: 28000,
    sellingPrice: 35000,
    stock: 15,
    category: 'Minuman',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc458631b6?auto=format&fit=crop&w=800&q=80',
    description: 'Perpaduan pucuk teh hijau pilihan dengan bunga melati asli. Memberikan kesegaran dan ketenangan di setiap seduhan.'
  },
  {
    id: '6',
    name: 'Kue Kering Nastar',
    purchasePrice: 70000,
    sellingPrice: 85000,
    stock: 20,
    category: 'Makanan Ringan',
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc3605e?auto=format&fit=crop&w=800&q=80',
    description: 'Kue kering klasik dengan selai nanas asli buatan sendiri. Tekstur lumer di mulut dengan aroma mentega yang menggoda.'
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'TRX-001',
    date: '2024-03-20T10:30:00Z',
    items: [
      { ...MOCK_PRODUCTS[0], quantity: 2 },
      { ...MOCK_PRODUCTS[1], quantity: 1 }
    ],
    total: 145000,
    paymentMethod: 'cash'
  },
  {
    id: 'TRX-002',
    date: '2024-03-20T11:45:00Z',
    items: [
      { ...MOCK_PRODUCTS[2], quantity: 1 }
    ],
    total: 120000,
    paymentMethod: 'qris'
  }
];

export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'Petani Kopi Nusantara',
    contactPerson: 'Bpk. Ahmad Suherman',
    phone: '0812-3456-7891',
    email: 'ahmad@kopinusantara.com',
    address: 'Takengon, Aceh Tengah',
    category: 'Minuman'
  },
  {
    id: 'SUP-002',
    name: 'Tempe Lestari Mandiri',
    contactPerson: 'Ibu Siti Aminah',
    phone: '0813-9876-5432',
    email: 'lestari@tempe.id',
    address: 'Malang, Jawa Timur',
    category: 'Makanan Ringan'
  },
  {
    id: 'SUP-003',
    name: 'Madu Rimba Indonesia',
    contactPerson: 'Krisna Bayu',
    phone: '0811-2233-4455',
    email: 'krisna@madurimba.co.id',
    address: 'Sumbawa, NTB',
    category: 'Kesehatan'
  }
];
