export interface Product {
  id: string;
  name: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  category: string;
  image: string;
  description?: string;
}

export interface AppSettings {
  appName: string;
  appDescription: string;
  marginType: 'percentage' | 'nominal';
  marginValue: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Transaction {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  paymentMethod: 'cash' | 'transfer' | 'qris';
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  category: string;
}
