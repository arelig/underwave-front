"use client"
import { createContext, useState, useEffect, useCallback } from 'react';
import { submitOrder } from '@lib/submitOrder';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [currentOrder, setCurrentOrder] = useState([]);
	const [subtotal, setSubtotal] = useState(0);

	const addToCart = (album) => {
		const existingAlbum = currentOrder.find((item) => item.uuid === album.uuid);

		if (existingAlbum) {
			// El álbum ya está en el carrito, actualizar la cantidad
			const updatedOrder = currentOrder.map((item) => {
				if (item.uuid === album.uuid) {
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

	const removeFromCart = (albumUuid) => {
		setCurrentOrder((prevOrder) =>
			prevOrder.filter((album) => album.uuid !== albumUuid)
		);
	};

	const clearCart = () => {
		setCurrentOrder([]);
	};

	const updateQuantity = (albumUuid, quantity) => {
		setCurrentOrder((prevOrder) =>
			prevOrder.map((album) => {
				if (album.uuid === albumUuid) {
					return {
						...album,
						quantity: quantity,
					};
				}
				return album;
			})
		);
	};

	const calculateSubtotal = useCallback(() => {
		let total = 0;
		currentOrder.forEach((album) => {
			const price = parseFloat(album.price);
			const subtotal = price * album.quantity;
			total += subtotal;
		});
		setSubtotal(total.toFixed(2));
	}, [currentOrder]);


		useEffect(() => {
			calculateSubtotal();
		}, [currentOrder, calculateSubtotal]);


		return (
			<CartContext.Provider
				value={{
					currentOrder,
					addToCart,
					removeFromCart,
					clearCart,
					updateQuantity,
					subtotal
				}}
			>
				{children}
			</CartContext.Provider>
		);
	};