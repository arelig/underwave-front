// "use client"
// import { Fragment, useState, useContext } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Dialog, Transition } from '@headlessui/react';
// //import { XMarkIcon } from '@heroicons/24/solid';
// import { CartContext } from "../../app/lib/cartContext";
// import { CheckoutDialog } from './CheckoutDialog';
// import OrderSatus from './OrderStatus';

// export default function CartDrawer({open, onClose}) {
//   const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
//   const [orderSuccessDialogOpen, setOrderSuccessDialogOpen] = useState(false);
//   const [orderDetails, setOrderDetails] = useState(null);

//   const { currentOrder, removeFromCart, clearCart, subtotal, updateQuantity, submitOrder } = useContext(CartContext);

//   const handleUpdateQuantity = (albumId, quantity) => {
//     updateQuantity(albumId, quantity);
//   };

//   const handleCheckout = () => {
//     setCheckoutDialogOpen(true);
//   };

//   const closeCheckoutDialog = () => {
//     setCheckoutDialogOpen(false);
//   };

//   const handleConfirmCheckout = async (email) => {
//     try {
//       const response = await submitOrder(email);

//       setOrderDetails(response);
//       setOrderSuccessDialogOpen(true);

//       clearCart();
//       closeCheckoutDialog();
// 	  orderSuccessDialogOpen(true);
//     } catch (error) {
//       console.error('Error al enviar la orden:', error);
//     }
//   };

//   const closeOrderSuccessDialog = () => {
//     setOrderSuccessDialogOpen(false);
//   };

//   //Multiplica [0..7] => [0..70]
//   const calculateDiscountedPrice = (price, discount) => {
// 	const discountedPrice = price - (price * discount*10) / 100;
// 	return discountedPrice.toFixed(2);
//   };
  

//   return (
// <>
// 	<Transition show={open} as={Fragment}>
// 	  <Dialog as="div" className="relative z-10" onClose={onClose}>
// 		<Transition
// 		  as={Fragment}
// 		  enter="ease-in-out duration-500"
// 		  enterFrom="opacity-0"
// 		  enterTo="opacity-100"
// 		  leave="ease-in-out duration-500"
// 		  leaveFrom="opacity-100"
// 		  leaveTo="opacity-0"
// 		>
// 		  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
// 		</Transition>

// 		<div className="fixed inset-0 overflow-hidden">
// 		  <div className="absolute inset-0 overflow-hidden">
// 			<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
// 			  <Transition
// 				as={Fragment}
// 				enter="transform transition ease-in-out duration-500 sm:duration-700"
// 				enterFrom="translate-x-full"
// 				enterTo="translate-x-0"
// 				leave="transform transition ease-in-out duration-500 sm:duration-700"
// 				leaveFrom="translate-x-0"
// 				leaveTo="translate-x-full"
// 			  >
// 				<Dialog className="pointer-events-auto w-screen max-w-md">
// 				  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
// 					<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
// 					  <div className="flex items-start justify-between">
// 						<Dialog className="text-lg font-medium text-gray-900">Mi carrito</Dialog>
// 						<div className="ml-3 flex h-7 items-center">
// 						  <button
// 							type="button"
// 							className="-m-2 p-2 text-gray-400 hover:text-gray-500"
// 							onClick={onClose}
// 						  >
// 							<span className="sr-only">Cerrar</span>
// 						{/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */	}
// 						  </button>
// 						</div>
// 					  </div>

// 					  <div className="mt-8">
// 						<div className="flow-root">
// 						  <ul role="list" className="-my-6 divide-y divide-gray-200">
// 							{currentOrder.map((album) => (
// 							  <li key={album.id} className="flex py-6">
// 								<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
// 								  <Image
// 									src={album.artwork}
// 									alt={album.name}
// 									width={100}
// 									height={100}
// 									className="h-full w-full object-cover object-center"
// 								  />
// 								</div>

// 								<div className="ml-4 flex flex-1 flex-col">

// 								  <div>
// 									<div className="flex justify-between text-base font-medium text-gray-900">
// 										<h3>
// 											<p>{album.name}</p>
// 										</h3>
// 										<del className='p-1 text-gray-700'>{album.price}</del>
// 										<ins className='p-1'>{calculateDiscountedPrice(album.price, album.descount)}</ins>
// 									</div>
// 									<p className="mt-1 text-sm text-gray-500">{album.artist}</p>
// 								  </div>
								
// 								  <div className="flex items-center gap-4">
//                                       <input
//                                         type="number"
//                                         min={1}
//                                         value={album.quantity}
//                                         onChange={(e) => handleUpdateQuantity(album.id, parseInt(e.target.value))}
//                                         className="w-20 h-10 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 px-2"
//                                       />
// 									</div>


// 								  <div className="flex flex-1 items-end justify-between text-sm">
// 									<p className="text-red-500">Descuento {album.descount * 10}%</p>

// 									<div className="flex">
// 									  <button
// 										type="button"
// 										className="font-medium text-indigo-600 hover:text-indigo-500"
// 										onClick={() => removeFromCart(album.id)}
// 									  >
// 										Eliminar
// 									  </button>
// 									</div>
// 								  </div>
// 								</div>
// 							  </li>
// 							))}
// 						  </ul>
// 						</div>
// 					  </div>
// 					</div>

// 					<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
// 						<div className="flex justify-between text-base font-medium text-gray-900">
// 							<Link href="#" onClick={clearCart} className='underline decoration-2'>Vaciar carrito</Link>
// 						</div>

// 					  <div className="flex justify-between text-base font-medium text-gray-900">
// 						<p>Subtotal con descuento aplicado</p>
// 						<p>{subtotal}</p>
// 					  </div>
// 					  <div className="mt-6">
// 						<Link
// 						  href="#"
// 						  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
// 						  onClick={handleCheckout}
// 						>
// 						  Realizar pedido
// 						</Link>
// 					  </div>
// 					  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
// 						<p>
// 						  o  
// 						  <button
// 							type="button"
// 							className="font-medium text-indigo-600 hover:text-indigo-500"
// 							onClick={onClose}
// 						  >
// 							 Continuar comprando
// 							<span aria-hidden="true"> &rarr;</span>
// 						  </button>
// 						</p>
// 					  </div>
// 					</div>
// 				  </div>
// 				</Dialog>
// 			  </Transition>
// 			</div>
// 		  </div>
// 		</div>
// 	  </Dialog>
// 	</Transition>
// 	<CheckoutDialog
// 		isOpen={checkoutDialogOpen}
// 		onClose={closeCheckoutDialog}
// 		onConfirm={handleConfirmCheckout}
// 		/>
// 	<OrderSatus
//         open={orderSuccessDialogOpen}
//         onClose={() => setOrderSuccessDialogOpen(false)}
//         orderDetails={orderDetails}
//       />
// 	</>
//   );
// }
