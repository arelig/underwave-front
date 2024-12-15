"use client"
import Carousel from "@/components/home/Carousel";
import AlbumCarousel from "@components/home/AlbumCarousel";

import Typography from "@components/material/Typography";


export default function Home() {
	return (
		<div className="container mx-auto px-4 pt-5">
		<Carousel />
		<Typography variant="h1" className="flex items-center justify-center uppercase pt-5 text-indigo-700" >
			Busca en nuestro catalogo
		</Typography>
		<AlbumCarousel />
		</div>

	);
}

