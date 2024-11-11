"use client"
import { useState, useEffect} from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NavList from "./NavList";
 
export default function NavBar() {
  const [openNav, setOpenNav] = useState(false);
 
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);
 
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
        ><img src="/logo-name-onl.svg" alt="logo"  className="mr-4 h-12"/>
        </Typography>

        <div className="hidden lg:block">
          <NavList />
        </div>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          color="deep-purple"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
