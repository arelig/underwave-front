'use client';

import { useState } from 'react';
import NavBar from '@components/navbar/NavBar';
import { CartDrawer } from '@components/cart/CartDrawer';

export default function Header() {
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <>
      <NavBar toggleCart={toggleCart} />
      <CartDrawer openRight={showCart} toggleDrawer={toggleCart} />
    </>
  );
}