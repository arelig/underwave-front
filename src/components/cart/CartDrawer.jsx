'use client';

import { useContext, useState } from 'react';
import {
	Drawer,
} from '@material-tailwind/react';
import Image from 'next/image';
import { CartContext } from '@/lib/cartContext';
import Link from 'next/link';
import Button from '@/components/material/Button';
import CheckoutDialog from './CheckoutDialog';
import { submitOrder } from '@/lib/submitOrder';

export function CartDrawer({ openRight, toggleDrawer }) {
	const { currentOrder, removeFromCart, clearCart, subtotal } = useContext(CartContext);
	const [openDialog, setOpenDialog] = useState(false);

	const handleCheckout = async (email, currentOrder) => {
		try {
			const order = await submitOrder(email, currentOrder);
			clearCart();
			return order;
		} catch (error) {
			console.error('Checkout error:', error);
			throw error;
		}
	};

	const toggleDialog = () => setOpenDialog(!openDialog);

	return (
		<>
			<Drawer
				placement="right"
				open={openRight}
				onClose={toggleDrawer}
				className="p-4"
				size={400}
			>
				<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
					<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
						<div className="mt-8">
							<div className="flow-root">
								<ul role="list" className="-my-6 divide-y divide-gray-200">
									{currentOrder.map((album) => (
										<li key={album.uuid} className="flex py-6">
											<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
												<Image
													src={album.artwork}
													alt={album.name}
													width={100}
													height={100}
													className="h-full w-full object-cover object-center"
												/>
											</div>

											<div className="ml-4 flex flex-1 flex-col">
												<div>
													<div className="flex justify-between text-base font-medium text-gray-900">
														<h3>{album.name}</h3>
														<p className="ml-4">{album.price}</p>
													</div>
													<p className="mt-1 text-sm text-gray-500">{album.artist}</p>
												</div>
												<div className="flex flex-1 items-end justify-between text-sm">
													<p className="text-gray-500">Qty {album.quantity}</p>

													<div className="flex">
														<Button
															variant="ghost"
															size="sm"
															onClick={() => removeFromCart(album.uuid)}
														>
															Remove
														</Button>
													</div>
												</div>
											</div>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="border-t border-gray-200 py-6 px-4 sm:px-6">
							<div className="flex justify-between text-base font-medium text-gray-900">
								<p>Subtotal</p>
								<p>{subtotal}</p>
							</div>
							<div className="mt-6">
								<Button
									variant="solid"
									color="indigo"
									className="w-full"
									onClick={toggleDialog}
								>
									Checkout
								</Button>
							</div>
							<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
								<p>
									or{' '}
									<button
										type="button"
										className="font-medium text-indigo-600 hover:text-indigo-500"
										onClick={toggleDrawer}
									>
										Continue Shopping<span aria-hidden="true"> &rarr;</span>
									</button>
								</p>
							</div>
						</div>
					</div>
				</div>
			</Drawer>

			<CheckoutDialog
				openDialog={openDialog}
				toggleDialog={toggleDialog}
				handleCheckout={handleCheckout}
			/>
		</>
	);
}
export function CartIcon({ className, ...props }) {
	return (
		<svg
			className={`${className} text-indigo-700`}
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g clipPath="url(#clip0_1730_25270)">
				<path
					d="M5.33317 14.6668C5.70136 14.6668 5.99984 14.3684 5.99984 14.0002C5.99984 13.632 5.70136 13.3335 5.33317 13.3335C4.96498 13.3335 4.6665 13.632 4.6665 14.0002C4.6665 14.3684 4.96498 14.6668 5.33317 14.6668Z"
					stroke="currentColor"
					strokeWidth="1.33333"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M12.6667 14.6668C13.0349 14.6668 13.3333 14.3684 13.3333 14.0002C13.3333 13.632 13.0349 13.3335 12.6667 13.3335C12.2985 13.3335 12 13.632 12 14.0002C12 14.3684 12.2985 14.6668 12.6667 14.6668Z"
					stroke="currentColor"
					strokeWidth="1.33333"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M1.3667 1.36719H2.70003L4.47337 9.64719C4.53842 9.95043 4.70715 10.2215 4.95051 10.4138C5.19387 10.606 5.49664 10.7074 5.8067 10.7005H12.3267C12.6301 10.7 12.9244 10.596 13.1607 10.4057C13.3971 10.2154 13.5615 9.95021 13.6267 9.65385L14.7267 4.70052H3.41337"
					stroke="currentColor"
					strokeWidth="1.33333"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</g>
			<defs>
				<clipPath id="clip0_1730_25270">
					<rect width="16" height="16" fill="white" />
				</clipPath>
			</defs>
		</svg>
	)
}