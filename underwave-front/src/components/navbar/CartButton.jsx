// "use client"
// import { useContext } from 'react';
// import { useState } from 'react';
// //import { ShoppingCartIcon } from '@heroicons/24/solid';
// import CartDrawer from '@components/cart/CartDrawer';
// import { Button } from '@material-tailwind/react';
// import { CartContext } from '@app/lib/cartContext';

// export default function CartButton() {
//   const [open, setOpen] = useState(false);
//   const openDrawer = () => setOpen(true);
//   const closeDrawer = () => setOpen(false);

//   const {currentOrder} = useContext(CartContext);
//   const cartItemCount = currentOrder.reduce((total, album) => total + album.quantity, 0);


//   return (
//     <>
//       <div className="relative inline-block">
//       <Button variant="text"
//         className="flex items-center gap-3 text-indigo-800"
//         onClick={openDrawer}
//       >
//         Carrito
//         {cartItemCount > 0 && (
//           <span className="ml-1 bg-red-500 text-white font-bold rounded-full px-2 py-1">
//             {cartItemCount}
//           </span>
//         )}
//         {/* <ShoppingCartIcon strokeWidth={2} className="h-5 w-5 text-indigo-800" /> */}
//       </Button>

//       {/* <CartDrawer open={open} onClose={closeDrawer} /> */}
//     </div>
//     </>
//   );
// }