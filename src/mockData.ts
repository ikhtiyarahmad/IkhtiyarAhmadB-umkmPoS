import { Product, Transaction } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Kopi Gayo 250g',
    price: 65000,
    stock: 24,
    category: 'Minuman',
    image: 'https://picsum.photos/seed/coffee/400/400'
  },
  {
    id: '2',
    name: 'Keripik Tempe Rejeki',
    price: 15000,
    stock: 50,
    category: 'Makanan Ringan',
    image: 'https://picsum.photos/seed/chips/400/400'
  },
  {
    id: '3',
    name: 'Madu Hutan Asli 500ml',
    price: 120000,
    stock: 12,
    category: 'Kesehatan',
    image: 'https://picsum.photos/seed/honey/400/400'
  },
  {
    id: '4',
    name: 'Sambal Bawang Pedas',
    price: 25000,
    stock: 30,
    category: 'Bumbu',
    image: 'https://picsum.photos/seed/chili/400/400'
  },
  {
    id: '5',
    name: 'Teh Melati Premium',
    price: 35000,
    stock: 15,
    category: 'Minuman',
    image: 'https://picsum.photos/seed/tea/400/400'
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
