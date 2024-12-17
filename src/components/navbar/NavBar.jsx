"use client"
import { useState, useEffect } from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import Button from "@components/material/Button";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { CartIcon } from '@/components/cart/CartDrawer'; // Import the CartIcon component

export default function NavBar({ toggleCart }) {
  const [openNav, setOpenNav] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Catalogo', path: '/catalog' },
  ];

  const handleWindowResize = () => {
    if (window.innerWidth > 960) {
      setOpenNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar>
      <div className="container mx-auto flex items-center justify-between">
        <Typography as="a" href="/" variant="h6" className="mr-4 cursor-pointer py-1.5">
          Underwave Store
        </Typography>
        <div className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.path}>
                  <Button variant="text" className="text-indigo-700">
                    {item.name}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? <FaXmark className="h-6 w-6" /> : <GiHamburgerMenu className="h-6 w-6" />}
        </IconButton>
        <IconButton
          variant="text"
          className="ml-4 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
          ripple={false}
          onClick={toggleCart}
        >
          <CartIcon className="h-6 w-6" />
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <ul className="flex flex-col gap-2 pb-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path}>
                <Button variant="text">
                  {item.name}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </Collapse>
    </Navbar>
  );
}