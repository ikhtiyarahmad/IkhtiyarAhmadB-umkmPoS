import { Product, Transaction } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Kopi Gayo 250g',
    price: 65000,
    stock: 24,
    category: 'Minuman',
    image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&w=800&q=80',
    description: 'Biji kopi pilihan dari tanah Gayo, Aceh. Memiliki cita rasa fruity dengan body yang tebal dan aroma rempah yang khas.'
  },
  {
    id: '2',
    name: 'Keripik Tempe Rejeki',
    price: 15000,
    stock: 50,
    category: 'Makanan Ringan',
    image: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?auto=format&fit=crop&w=800&q=80',
    description: 'Camilan tradisional tempe yang diiris tipis dan digoreng hingga renyah dengan bumbu bawang putih dan rempah pilihan.'
  },
  {
    id: '3',
    name: 'Madu Hutan Asli 500ml',
    price: 120000,
    stock: 12,
    category: 'Kesehatan',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
    description: 'Madu murni yang dipanen langsung dari sarang lebah hutan liar. Tanpa tambahan gula, alami dan menyehatkan.'
  },
  {
    id: '4',
    name: 'Sambal Bawang Pedas',
    price: 25000,
    stock: 30,
    category: 'Bumbu',
    image: 'https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?auto=format&fit=crop&w=800&q=80',
    description: 'Sambal ulek bawang merah dan cabai rawit segar yang digoreng dengan minyak kelapa berkualitas. Pedas nendang!'
  },
  {
    id: '5',
    name: 'Teh Melati Premium',
    price: 35000,
    stock: 15,
    category: 'Minuman',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc458631b6?auto=format&fit=crop&w=800&q=80',
    description: 'Perpaduan pucuk teh hijau pilihan dengan bunga melati asli. Memberikan kesegaran dan ketenangan di setiap seduhan.'
  },
  {
    id: '6',
    name: 'Kue Kering Nastar',
    price: 85000,
    stock: 20,
    category: 'Makanan Ringan',
    image: 'https://images.unsplash.com/photo-1612240498936-65f5101365d2?auto=format&fit=crop&w=800&q=80',
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
