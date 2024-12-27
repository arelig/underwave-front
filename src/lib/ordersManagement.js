import Cookies from 'js-cookie';

const handleResponse = async (response) => {
	if (!response.ok) {
	  const error = await response.json();
	  throw new Error(error.detail || error.error || 'An error occurred');
	}
	return response.json();
  };

export const submitOrder = async (details) => {
	const accessToken = Cookies.get('access_token');
	
	if (!accessToken) {
		throw new Error('Access token not found. Please log in again.');
	}

	const orderData = {
		status: 'created',
		details: details.map((album) => ({
			album_uuid: album.uuid,
			quantity: album.quantity,
		})),
	};

	try {
		const response = await fetch('http://localhost:8000/api/orders/', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(orderData),
		});

		return await handleResponse(response);
	} catch (error) {
		console.error('Error submitting order:', error.message);
		throw error;
	}
};

export const fetchOrders = async () => {
	const accessToken = Cookies.get('access_token');
	
	if (!accessToken) {
		throw new Error('Access token not found. Please log in again.');
	}

	try {
		const response = await fetch('http://localhost:8000/api/orders/my-orders/', {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${accessToken}`,
			},
		});

		return await handleResponse(response);
	} catch (error) {
		console.error('Error fetching orders:', error.message);
		throw error;
	}
}