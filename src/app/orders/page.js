'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@lib/AuthContext';
import { fetchOrders } from '@lib/ordersManagement';
import {
	Card,
	CardHeader,
	CardBody,
	Typography,
} from '@material-tailwind/react';

export default function MyOrdersPage() {
	const { user } = useAuth();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchUserOrders = async () => {
			try {
				const orders = await fetchOrders();
				setOrders(orders);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
			};
			fetchUserOrders();
		}, [user]);

	if (loading) {
		return <div className="flex justify-center py-8">Loading your orders...</div>;
	}

	if (error) {
		return <div className="text-center text-red-500 py-8">{error}</div>;
	}

	if (orders.length === 0) {
		return <div className="text-center py-8">You have no orders yet.</div>;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Typography variant="h3" className="text-center text-indigo-900 mb-6">
				My Orders
			</Typography>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{orders.map((order) => (
					<Card key={order.id} className="shadow-md">
						<CardHeader className="bg-indigo-600 text-white p-4">
							<Typography variant="h5" className="text-center">
								Order #{order.id}
							</Typography>
						</CardHeader>
						<CardBody className="p-4">
							<div className="mb-4">
								<Typography variant="body2" className="text-gray-600">
									Order Date:
								</Typography>
								<Typography variant="small" className="text-gray-800">
									{new Date(order.order_date).toLocaleString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
									})}
								</Typography>
							</div>
							<div className="mb-4">
								<Typography variant="body2" className="text-gray-600">
									Status:
								</Typography>
								<Typography variant="small" className="text-gray-800">
									{order.status}
								</Typography>
							</div>
							<div className="mb-4">
								<Typography variant="body2" className="text-gray-600">
									Total:
								</Typography>
								<Typography variant="small" className="text-gray-800">
									${parseFloat(order.total).toFixed(2)}
								</Typography>
							</div>
							<div>
								<Typography variant="body2" className="text-gray-600">
									Order Details:
								</Typography>
								<ul className="mt-2 space-y-2">
									{order.details.map((detail, index) => (
										<li key={index} className="flex justify-between text-sm">
											<span>Album UUID: {detail.album_uuid}</span>
											<span>
												Qty: {detail.quantity} | ${parseFloat(detail.subtotal).toFixed(2)}
											</span>
										</li>
									))}
								</ul>
							</div>
						</CardBody>
					</Card>
				))}
			</div>
		</div>
	);
};


