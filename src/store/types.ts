export interface Cookie {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isAvailable: boolean; 
}

export interface OrderItem {
  cookieId: number;
  quantity: number;
}

export interface Order {
  id: number;
  customerName: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'Pending' | 'Accepted' | 'Out for Delivery' | 'Completed';
}