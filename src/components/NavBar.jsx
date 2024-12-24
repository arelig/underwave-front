"use client";

import { useState, useEffect, useContext } from "react";
import {
	Navbar,
	Collapse,
	Typography,
	IconButton,
} from "@material-tailwind/react";
import Button from "@components/material/CustomButton";
import Link from "next/link";
import { FaXmark } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { CartIcon } from "@/components/cart/CartDrawer";
import { CartContext } from "@lib/cartContext";
import { useAuth } from "@lib/AuthContext"; // Import AuthContext
import Image from "next/image";

export default function NavBar({ toggleCart }) {
	const [openNav, setOpenNav] = useState(false);
	const { currentOrder } = useContext(CartContext);
	const { user, logoutUser } = useAuth(); // Access user and logoutUser function

	const totalItems = currentOrder.reduce((sum, item) => sum + item.quantity, 0);

	// Navigation items based on authentication
	const navItems = user
		? [
			{ name: "Inicio", path: "/" },
			{ name: "Catalogo", path: "/catalog" },
			{ name: "Orders", path: "/orders" }, // Show Orders page
			{ name: "Profile", path: "/profile" }, // Show Profile page
		]
		: [
			{ name: "Inicio", path: "/" },
			{ name: "Catalogo", path: "/catalog" },
			{ name: "Login", path: "/login" },
			{ name: "Register", path: "/register" },
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
		<Navbar className="sticky top-0 z-10 h-max max-w-full bg-[#525252] rounded-lg px-4 py-2 lg:px-8 lg:py-4">
			<div className="container mx-auto flex items-center justify-between">
				<Link href="/">
					<Image src="/logo.svg" alt="logo" width={60} height={60} />
				</Link>
				<div className="hidden lg:block">
					<ul className="flex items-center gap-6">
						{navItems.map((item) => (
							<li key={item.name}>
								<Link href={item.path}>
									<Button variant="text" className="text-white">
										{item.name}
									</Button>
								</Link>
							</li>
						))}
						{user && (
							<Button
								variant="text"
								className="text-white"
								onClick={logoutUser}
							>
								Sign Out
							</Button>
						)}
					</ul>
				</div>
				<IconButton
					variant="text"
					className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
					ripple={false}
					onClick={() => setOpenNav(!openNav)}
				>
					{openNav ? (
						<FaXmark className="h-6 w-6 text-white" />
					) : (
						<GiHamburgerMenu className="h-6 w-6 text-white" />
					)}
				</IconButton>
				<div className="relative">
					<IconButton
						variant="text"
						className="ml-4 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
						ripple={false}
						onClick={toggleCart}
					>
						<CartIcon className="h-6 w-6 text-white" />
					</IconButton>
					{totalItems > 0 && (
						<span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-xs text-white">
							{totalItems}
						</span>
					)}
				</div>
			</div>
			<Collapse open={openNav}>
				<ul className="flex flex-col gap-2 pb-2">
					{navItems.map((item) => (
						<li key={item.name}>
							<Link href={item.path}>
								<Button variant="text" className="text-white">
									{item.name}
								</Button>
							</Link>
						</li>
					))}
					{user && (
						<li>
							<Button
								variant="text"
								className="text-white"
								onClick={logoutUser}
							>
								Sign Out
							</Button>
						</li>
					)}
				</ul>
			</Collapse>
		</Navbar>
	);
}
