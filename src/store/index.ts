import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from './inventorySlice';
import ordersReducer from './ordersSlice';

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    orders: ordersReducer,
  },
});

// These exports ensure your whole application remains strictly typesafe
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;