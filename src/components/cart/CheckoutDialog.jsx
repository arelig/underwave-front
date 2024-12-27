'use client';

import { useContext, useState, useEffect } from 'react';
import {
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Typography,
} from '@material-tailwind/react';
import Image from 'next/image';
import { CartContext } from '@lib/cartContext';
import { useAuth } from '@lib/AuthContext';
import { submitOrder } from '@lib/ordersManagement';
import Button from '@components/material/CustomButton';

export default function CheckoutDialog({ openDialog, toggleDialog }) {
	const { currentOrder, subtotal, clearCart } = useContext(CartContext);
	const { user } = useAuth();
	const [orderDetails, setOrderDetails] = useState(null);
	const [error, setError] = useState(null);

	// Reset state when dialog opens
	useEffect(() => {
		if (openDialog) {
			setOrderDetails(null);
			setError(null);
		}
	}, [openDialog]);

	const handleConfirmOrder = async () => {
		if (!user) {
			setError('You must be logged in to complete the checkout.');
			return;
		}

		try {
			const order = await submitOrder(currentOrder);
			setOrderDetails(order);
			clearCart(); // Clear the cart only on successful submission
			setError(null); // Clear previous errors
		} catch (err) {
			console.error('Checkout error:', err);
			setError(err.message || 'Failed to process your order. Please try again.');
		}
	};

	return (
		<Dialog open={openDialog} handler={toggleDialog} size="xl">
			<DialogHeader>Checkout</DialogHeader>
			<DialogBody divider>
				{orderDetails ? (
					<>
						<Typography variant="h6" color="blue-gray">
							Order Confirmed
						</Typography>
						<Typography variant="body1" color="blue-gray">
							Order Number: {orderDetails.id}
						</Typography>
						<Typography variant="body1" color="blue-gray">
							Order Date:{" "}
							{new Date(orderDetails.order_date).toLocaleString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
								hour: '2-digit',
								minute: '2-digit',
								second: '2-digit',
							})}
						</Typography>
						<Typography variant="body1" color="blue-gray">
							Total: ${parseFloat(orderDetails.total).toFixed(2)}
						</Typography>
					</>
				) : (
					<>
						<Typography variant="h6" color="blue-gray">
							Please verify your order details.
						</Typography>
						<ul className="mt-4 space-y-4">
							{currentOrder.map((album) => (
								<li key={album.uuid} className="flex items-center space-x-4">
									<Image
										src={album.artwork}
										alt={album.name}
										width={64}
										height={64}
										className="size-16 rounded object-cover"
									/>
									<div className="flex-1">
										<h3 className="text-sm font-medium">{album.name}</h3>
										<p className="text-muted-foreground text-sm">
											{album.price} x {album.quantity}
										</p>
									</div>
								</li>
							))}
						</ul>
						<div className="mt-6 flex justify-between text-base font-medium text-gray-900">
							<p>Subtotal</p>
							<p>{subtotal}</p>
						</div>
						{error && (
							<Typography variant="small" color="red" className="mt-4">
								{error}
							</Typography>
						)}
					</>
				)}
			</DialogBody>
			<DialogFooter>
				<Button variant="text" color="red" onClick={toggleDialog}>
					{orderDetails ? 'Close' : 'Cancel'}
				</Button>
				{!orderDetails && (
					<Button variant="gradient" color="green" onClick={handleConfirmOrder}>
						Confirm Order
					</Button>
				)}
			</DialogFooter>
		</Dialog>
	);
}
