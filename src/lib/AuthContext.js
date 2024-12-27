'use client';

import Cookies from 'js-cookie';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login, fetchProfile, refreshAccessToken } from '@lib/userManagement';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const initializeUser = async () => {
		  if (typeof window === 'undefined') {
			return; // Exit early if running on the server
		  }
	
		  setLoading(true); // Set loading state to true while initializing
		  try {
			const accessToken = Cookies.get('access_token');
	
			if (!accessToken) {
			  console.warn('No access token found in cookies. User not logged in.');
			  setUser(null); // No token, no user
			  return;
			}
	
			// Attempt to fetch the user profile
			try {
			  const profile = await fetchProfile(accessToken);
			  setUser(profile); // Set the user if the token is valid
			} catch (profileError) {
			  console.warn('Access token expired or invalid. Attempting to refresh token...');
	
			  // Attempt to refresh the access token
			  try {
				const newAccessToken = await refreshAccessToken();
				const profile = await fetchProfile(newAccessToken);
				setUser(profile); // Update user with refreshed token
			  } catch (refreshError) {
				console.error('Token refresh failed:', refreshError.message);
				logoutUser(); // Clear session if refresh fails
			  }
			}
		  } catch (err) {
			console.error('Error initializing user:', err.message);
			logoutUser(); // Clear session on unexpected errors
		  } finally {
			setLoading(false); // End loading state
		  }
		};
	
		initializeUser();
	  }, []);


	// Login function
	const loginUser = async (username, password) => {
		try {
			const { access, refresh, user } = await login(username, password);
			Cookies.set('access_token', access, { secure: true, sameSite: 'Strict' });
			Cookies.set('refresh_token', refresh, { secure: true, sameSite: 'Strict' });
			setUser(user);
		} catch (err) {
			console.error('Error during login:', err.message);
			throw err;
		}
	};

	// Logout function
	const logoutUser = () => {
		Cookies.remove('access_token');
		Cookies.remove('refresh_token');
		setUser(null);
	};

	// Token refresh function (called manually or on 401 errors)
	const refreshToken = useCallback(async () => {
		try {
			const newAccessToken = await refreshAccessToken();
			Cookies.set('access_token', newAccessToken, { secure: true, sameSite: 'Strict' });
			const profile = await fetchProfile(newAccessToken);
			setUser(profile);
		} catch (err) {
			console.error('Error refreshing token:', err.message);
			logoutUser(); // Clear session if refresh fails
		}
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading, loginUser, logoutUser, refreshToken }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
