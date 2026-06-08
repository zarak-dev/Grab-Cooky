import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Cookie } from './types';
import initialCookies from '../backend/inventory.json';

interface InventoryState {
  cookies: Cookie[];
  loading: boolean;
  error: string | null;
}

const initialState: InventoryState = {
  cookies: initialCookies as Cookie[],
  loading: false,
  error: null,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    // 1. Toggle Admin Availability Switch
    toggleAvailability: (state, action: PayloadAction<number>) => {
      const cookie = state.cookies.find(c => c.id === action.payload);
      if (cookie) {
        cookie.isAvailable = !cookie.isAvailable;
      }
    },
    
    // 2. Add a new Cookie from a Dashboard Form
    addNewCookie: (state, action: PayloadAction<Cookie>) => {
      state.cookies.push(action.payload);
    },

    // 3. Delete a Cookie from the Dashboard Table
    deleteCookie: (state, action: PayloadAction<number>) => {
      state.cookies = state.cookies.filter(c => c.id !== action.payload);
    },

    // 4. Update existing cookie details (Price, Description, etc.)
    updateCookieDetails: (state, action: PayloadAction<Cookie>) => {
      const index = state.cookies.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.cookies[index] = action.payload;
      }
    }
  },
});

// Export the actions so your dashboard components can use dispatch()
export const { 
  toggleAvailability, 
  addNewCookie, 
  deleteCookie, 
  updateCookieDetails 
} = inventorySlice.actions;

export default inventorySlice.reducer;