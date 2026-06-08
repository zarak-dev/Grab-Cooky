import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { selectRawCart } from '../../store/ordersSlice';

export const Navbar: React.FC = () => {
  const cart = useAppSelector(selectRawCart);
  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <h1>Grab-Cooky Admin & Shop</h1>
      <div className="cart-badge">
        Bag: <span>{totalItemsInCart} items</span>
      </div>
    </nav>
  );
};