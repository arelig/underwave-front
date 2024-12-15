// "use client"
// import { Dialog, Transition } from '@headlessui/react';
// import React, { Fragment } from 'react';

// export default function OrderStatus({ open, onClose, orderDetails }) {
//   const isSuccess = orderDetails && orderDetails.status === 'success';
//   const message = isSuccess ? 'Orden realizada con exito' : 'Orden fallida';

//   return (
//     <Transition show={open} as={Fragment}>
//       <Dialog as="div" className="fixed inset-0 overflow-y-auto" onClose={onClose}>
//         <div className="flex items-center justify-center min-h-screen px-4 text-center">
//           <Transition
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Dialog className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//           </Transition>

//           <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
//             &#8203;
//           </span>

//           <Transition
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             enterTo="opacity-100 translate-y-0 sm:scale-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//           >
//             <div className="inline-block align-bottom bg-white rounded-lg px-4 py-6 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//               <div>
//                 <div className="mt-2">
//                   <p className="text-lg font-medium text-gray-900">{message}</p>
//                   <p className="mt-4 text-sm text-gray-500">
//                     {isSuccess ? 'Tu orden fue recibida. ' : 'Hubo un error con tu orden. '}
//                     {' Los detalles: '}
//                   </p>
//                   <pre className="mt-2 p-2 bg-gray-100 rounded">{JSON.stringify(orderDetails, null, 2)}</pre>
//                 </div>
//               </div>

//               <div className="mt-4 sm:mt-6 sm:flex sm:flex-row-reverse">
//                 <button
//                   type="button"
//                   className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 sm:ml-3 sm:w-auto sm:text-sm"
//                   onClick={onClose}
//                 >
//                   Salir
//                 </button>
//               </div>
//             </div>
//           </Transition>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// }