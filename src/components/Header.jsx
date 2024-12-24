'use client';

import { useState } from 'react';
import NavBar from '@components/NavBar';
import { CartDrawer } from '@components/cart/CartDrawer';

export default function Header() {
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <>
      <div className="sticky top-0 z-50 shadow-md-rounded">
        <NavBar toggleCart={toggleCart} />
      </div>
      <CartDrawer openRight={showCart} toggleDrawer={toggleCart} />
    </>

  );
}