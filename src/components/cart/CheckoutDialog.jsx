'use client';

import { useContext, useState } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react';
import Image from 'next/image';
import { CartContext } from '@/lib/cartContext';
import Button from '@/components/material/Button';
import { submitOrder } from '@/lib/submitOrder';


export default function CheckoutDialog({ openDialog, toggleDialog, handleCheckout }) {
  const { currentOrder, subtotal } = useContext(CartContext);
  const [orderDetails, setOrderDetails] = useState(null);

  const handleConfirmOrder = async () => {
    const email = 'customer@example.com'; // Replace with the actual customer email
    try {
      const order = await handleCheckout(email, currentOrder);
      setOrderDetails(order);
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <Dialog open={openDialog} handler={toggleDialog} size="xl">
      <DialogHeader>Checkout</DialogHeader>
      <DialogBody divider>
        {orderDetails ? (
          <>
            <Typography variant="h6" color="blue-gray">
              Order Confirmed
            </Typography>
            <Typography variant="body1" color="blue-gray">
              Order ID: {orderDetails.id}
            </Typography>
            <Typography variant="body1" color="blue-gray">
              Order Date: {new Date(orderDetails.order_date).toLocaleString()}
            </Typography>
            <Typography variant="body1" color="blue-gray">
              Total: {orderDetails.total}
            </Typography>
           
          </>
        ) : (
          <>
            <Typography variant="h6" color="blue-gray">
              Please confirm your order details.
            </Typography>
            <ul className="mt-4 space-y-4">
              {currentOrder.map((album) => (
                <li key={album.uuid} className="flex items-center space-x-4">
                  <Image
                    src={album.artwork}
                    alt={album.name}
                    width={64}
                    height={64}
                    className="size-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{album.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {album.price} x {album.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{subtotal}</p>
            </div>
          </>
        )}
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={toggleDialog}>
          {orderDetails ? 'Close' : 'Cancel'}
        </Button>
        {!orderDetails && (
          <Button variant="gradient" color="green" onClick={handleConfirmOrder}>
            Confirm Order
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
}