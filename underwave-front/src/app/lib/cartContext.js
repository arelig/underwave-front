"use client"
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [currentOrder, setCurrentOrder] = useState([]);
	const [subtotal, setSubtotal] = useState(0);

	const addToCart = (album) => {
		const existingAlbum = currentOrder.find((item) => item.id === album.id);
	  
		if (existingAlbum) {
		  // El álbum ya está en el carrito, actualizar la cantidad
		  const updatedOrder = currentOrder.map((item) => {
			if (item.id === album.id) {
			  return { ...item, quantity: item.quantity + 1 };
			}
			return item;
		  });
	  
		  setCurrentOrder(updatedOrder);
		} else {
		  // El álbum no está en el carrito, agregarlo con cantidad 1
		  const updatedAlbum = { ...album, quantity: 1 };
		  setCurrentOrder((prevOrder) => [...prevOrder, updatedAlbum]);
		}
	  };

	const removeFromCart = (albumId) => {
		setCurrentOrder((prevOrder) =>
			prevOrder.filter((album) => album.id !== albumId)
		);
	};

	const clearCart = () => {
		setCurrentOrder([]);
	};

	const updateQuantity = (albumId, quantity) => {
		setCurrentOrder((prevOrder) =>
			prevOrder.map((album) => {
				if (album.id === albumId) {
					return {
						...album,
						quantity: quantity,
					};
				}
				return album;
			})
		);
	};

	const calculateSubtotal = () => {
		let total = 0;
		currentOrder.forEach((album) => {
			const price = parseFloat(album.price);
			const discount = parseFloat(album.descount || 0) * 10; // Si el descuento no está definido, se asume 0
			const discountedPrice = price - (price * discount / 100);
			const subtotal = discountedPrice * album.quantity;
			total += subtotal;
		});
		setSubtotal(total.toFixed(2));
	};

	const submitOrder = async (email) => {
		const orderData = {
			email_client: email,
			details: currentOrder.map((album) => ({
			  album_id: album.id,
			  quantity: album.quantity,
			})),
		  };
	  
		  try {
			const response = await fetch('https://cyber-seekers-herlein-iglesias.vercel.app/rest/orders', {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(orderData),
			});
	  
			if (response.ok) {
			  console.log('La orden se envió correctamente');
			  // Realizar acciones adicionales, como limpiar el carrito, mostrar un mensaje de confirmación, etc.
			} else {
			  console.error('Error al enviar la orden');
			  // Manejar el error de envío de la orden
			}

			return response.json();

		  } catch (error) {
			  throw error;
			// Manejar errores de red u otras excepciones
		  }
	}

	useEffect(() => {
		calculateSubtotal();
	}, [currentOrder]);


	return (
		<CartContext.Provider
			value={{
				currentOrder,
				addToCart,
				removeFromCart,
				clearCart,
				submitOrder,
				updateQuantity,
				subtotal
			}}
		>
			{children}
		</CartContext.Provider>
	);
};