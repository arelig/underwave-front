'use client';
import Image from 'next/image';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Button,
  } from '@material-tailwind/react';

import {CartContext} from '../../app/lib/cartContext';
import { useContext, useState } from 'react';
  
export default function AlbumCard({ data }) {
const [showSuccessMessage, setShowSuccessMessage] = useState(false);
const {id,name,artist,price,artwork} = data;

const { addToCart } = useContext(CartContext);

const handleAddToCart = () => {
	addToCart(data);
	setShowSuccessMessage(true);
	setTimeout(() => {
		setShowSuccessMessage(false);
		}, 3000);
};

return (
	<Card key={id} className="w-56 min-h-[400px] max-h-[400px]">
		<CardHeader shadow={false} floated={false} className="h-56">
			<Image 
			src={artwork}
			width="300"
			height="300"
			alt="Artwork"
			className="w-full h-full object-cover"
			/>
		</CardHeader>
		<CardBody className="flex flex-col justify-between">
			<div>
			<div className="flex items-center justify-between">
				<div className="flex-1">
				<Typography color="blue-gray" className="font-medium overflow-ellipsis">
					{name}
				</Typography>
				<Typography variant="small" color="gray" className="font-normal opacity-75 overflow-ellipsis">
					{artist}
				</Typography>
				</div>
				<Typography color="blue-gray" className="font-medium font-bold">
				$ {price}
				</Typography>
			</div>
			</div>
			<Button
			ripple={false}
			fullWidth={true}
			className="bg-indigo-900 text-white shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
			onClick={() => handleAddToCart(data)}
			>
			Add to Cart
			</Button>
			{showSuccessMessage &&  <div className="fixed bottom-0 z-10 left-0 w-full bg-green-500 text-white p-4 text-center">
          <p>¡Agregado al carrito correctamente!</p>
        </div>}
	</CardBody>
	</Card>
);
}

