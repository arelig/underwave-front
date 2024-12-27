import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:8000/api/customuser/';

// Helper function to handle fetch errors
const handleResponse = async (response) => {
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.detail || error.error || 'An error occurred');
	}
	return response.json();
};

export const login = async (username, password) => {
	const response = await fetch(`${API_BASE_URL}login/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password }),
	});

	const data = await handleResponse(response);

	Cookies.set('access_token', data.access, { secure: true, sameSite: 'Strict' });
	Cookies.set('refresh_token', data.refresh, { secure: true, sameSite: 'Strict' });

	return {
		access: data.access,
		refresh: data.refresh,
		user: data.user,
	};
};

export const fetchProfile = async () => {
	const accessToken = Cookies.get('access_token');
	if (!accessToken) {
		throw new Error('No access token found. Please log in again.');
	}

	const response = await fetch(`${API_BASE_URL}me/`, {
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${accessToken}`,
		},
	});

	return handleResponse(response);
};


export const registerUser = async (username, email, password) => {
	const response = await fetch(`${API_BASE_URL}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, email, password }),
	});

	return handleResponse(response);
};

export const refreshAccessToken = async () => {
	const refreshToken = Cookies.get('refresh_token');

	if (!refreshToken) {
		throw new Error('No refresh token found. Please log in again.');
	}

	const response = await fetch('http://localhost:8000/api/token/refresh/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ refresh: refreshToken }),
	});

	const data = await handleResponse(response);

	Cookies.set('access_token', data.access, { secure: true, sameSite: 'Strict' });

	return data.access; 
};
