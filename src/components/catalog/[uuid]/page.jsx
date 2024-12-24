"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography } from "@material-tailwind/react";
import AlbumCard from '@components/catalog/Album';

const AlbumPage = () => {
	const router = useRouter();
	const { uuid } = router.query;

	const [albumDetails, setAlbumDetails] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchAlbumDetails = async () => {
			if (!uuid) return; // Ensure `uuid` is available
			setLoading(true); // Set loading state

			try {
				const response = await fetch(`http://localhost:8000/albums/by-uuid/${uuid}`);
				if (!response.ok) {
					throw new Error(`Failed to fetch: ${response.status}`);
				}

				const data = await response.json();
				setAlbumDetails(data);
				console.log('Album details:', data);
				setError(null); // Clear previous errors
			} catch (error) {
				console.error('Error fetching album details:', error);
				setError('Failed to load album details. Please try again.');
			} finally {
				setLoading(false); // Stop loading
			}
		};

		fetchAlbumDetails();
	}, [uuid]);

	if (loading) {
		return <div className="flex justify-center items-center h-screen">Loading...</div>;
	}

	if (error) {
		return <div className="text-center text-red-500">{error}</div>;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Typography variant="h3" className="text-indigo-900">
				{albumDetails.name}
			</Typography>
			<Typography variant="h5" className="text-gray-700">
				{albumDetails.artist}
			</Typography>
			<AlbumCard data={albumDetails} />
		</div>
	);
};

export default AlbumPage;
