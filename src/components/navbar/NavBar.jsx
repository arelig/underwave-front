"use client"

import { useState, useEffect} from "react";
import Image from "next/image";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";



export default function NavBar() {
  const [openNav, setOpenNav] = useState(false);

  const navItems = [
	{ name: 'Home', path: '/' },
	{ name: 'Catalogo', path: '/catalog' },
	{ name: 'Carrito', path: '/services' },
  ];
 
  const handleWindowResize = () =>{
	if (window.innerWidth > 960) {
	  setOpenNav(false);
	}
  };
 
  useEffect(() => {
	window.addEventListener("resize", handleWindowResize);
	return () => {  
	  window.removeEventListener("resize", handleWindowResize);
  };}, []);
 
  return (
	<Navbar className="sticky inset-0 z-10 h-max max-w-full mx-auto px-6 py-3 lg:px-8 lg:py-4">
	  <div className="flex items-center justify-between">
		<Typography
		  as="a"
		  href="/"
		  variant="h6"
		  className="mr-4 cursor-pointer py-1.5 "
		>
			<Image src="/logo-name-onl.svg" alt="logo"  className="mr-4 h-12" width="300" height="200"/>
		</Typography>

		<div className="hidden lg:block">
			<div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6">
				{navItems.map((item, index) => (
				<Link key={index} href={item.path} passHref>
					<Button
					variant="text"
					className="flex items-center gap-3 text-indigo-800"
					as="a"
					>
					{item.name}
					</Button>
				</Link>
				))}
			</div>
		</div>

		<IconButton
		  variant="text"
		  className="ml-auto h-6 w-6 hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
		  color="deep-purple"
		  onClick={() => setOpenNav(!openNav)}
		>
			{openNav ? (
				<FaXmark className="w-6 h-6" />
			) : (
				<GiHamburgerMenu className="w-6 h-6" />
			)}
		</IconButton>
	  </div>
	  <Collapse open={openNav}>
        <div className="flex flex-col gap-2 lg:hidden">
          {navItems.map((item, index) => (
            <Link key={index} href={item.path} passHref>
              <Button
                variant="text"
                className="flex items-center gap-3 text-indigo-800"
                as="a"
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
	  </Collapse>
	</Navbar>
  );
}
