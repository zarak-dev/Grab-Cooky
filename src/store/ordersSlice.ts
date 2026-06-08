import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Cookie, OrderItem, Order } from './types';

interface OrdersState {
  cart: OrderItem[]; // Tracks active checkout items by cookieId and quantity
  orderHistory: Order[]; // Tracks finalized orders for the dashboard
}

const initialState: OrdersState = {
  cart: [],
  orderHistory: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    // 1. Add a cookie to the cart (or increment quantity if already there)
    addToCart: (state, action: PayloadAction<number>) => {
      const cookieId = action.payload;
      const existingItem = state.cart.find(item => item.cookieId === cookieId);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ cookieId, quantity: 1 });
      }
    },

    // 2. Remove an entire item row from the cart
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(item => item.cookieId !== action.payload);
    },

    // 3. Update exact quantities via UI input or + / - controls
    updateCartQuantity: (state, action: PayloadAction<{ cookieId: number; quantity: number }>) => {
      const item = state.cart.find(item => item.cookieId === action.payload.cookieId);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
    },

    // 4. Checkout: Finalize cart into an Order history record
    // We pass the customerName and totalAmount calculated from the UI component
    checkoutCart: (state, action: PayloadAction<{ customerName: string; totalAmount: number }>) => {
      if (state.cart.length === 0) return;

      const newOrder: Order = {
        id: Date.now(), // Dynamic timestamp id matching your number type
        customerName: action.payload.customerName,
        items: [...state.cart],
        totalAmount: action.payload.totalAmount,
        status: 'Pending', // Matches your exact type literal starting capital
      };

      state.orderHistory.push(newOrder);
      state.cart = []; // Empty the cart upon success
    },

    // 5. Dashboard Admin Panel Action: Change delivery status states
    updateOrderStatus: (state, action: PayloadAction<{ orderId: number; status: Order['status'] }>) => {
      const order = state.orderHistory.find(o => o.id === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
      }
    }
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  updateCartQuantity, 
  checkoutCart, 
  updateOrderStatus 
} = ordersSlice.actions;

export default ordersSlice.reducer;

import type { RootState } from './index';

export const selectRawCart = (state: RootState) => state.orders.cart;
export const selectOrderHistory = (state: RootState) => state.orders.orderHistory;

// Advanced Selector: Hydrates your cookie IDs into rich objects for the Cart UI
export const selectHydratedCartItems = (state: RootState) => {
  const cookiesList = state.inventory.cookies;
  
  // Typed cartItem explicitly as OrderItem
  return state.orders.cart.map((cartItem: OrderItem) => {
    const cookieDetails = cookiesList.find(c => c.id === cartItem.cookieId);
    return {
      cookie: cookieDetails,
      quantity: cartItem.quantity,
      rowTotal: cookieDetails ? cookieDetails.price * cartItem.quantity : 0
    };
  });
};

// Selector to calculate total cost of the whole cart automatically
export const selectCartTotalAmount = (state: RootState) => {
  const hydratedCart = selectHydratedCartItems(state);
  
  // Typed total accumulator as a number
  return hydratedCart.reduce((total: number, item) => total + item.rowTotal, 0);
};