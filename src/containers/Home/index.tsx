import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/ordersSlice';

export const Home: React.FC = () => {
  // Pull cookies straight out of your inventory slice
  const cookies = useAppSelector((state) => state.inventory.cookies);
  const dispatch = useAppDispatch();

  return (
    <div className="cookie-grid">
      {cookies.map(cookie => (
        <div key={cookie.id} className="cookie-card">
          <img src={cookie.imageUrl} alt={cookie.name} />
          <h3>{cookie.name}</h3>
          <p>{cookie.description}</p>
          <button onClick={ () =>{console.log(`Dispaching addToCart for Cookie ID: ${cookie.id}`); dispatch(addToCart(cookie.id))}}>
            Add to Bag
          </button>
        </div>
      ))}
    </div>
  );
};