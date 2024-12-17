'use client';

import { useContext } from 'react';
import {
  Drawer,
  Typography,
  IconButton,
} from '@material-tailwind/react';
import Image from 'next/image';
import { CartContext } from '@/lib/cartContext';
import Button from '@/components/material/Button';

export function CartDrawer({ openRight, toggleDrawer }) {
  const { currentOrder, removeFromCart, clearCart, subtotal } = useContext(CartContext);

  return (
    <Drawer
      placement="right"
      open={openRight}
      onClose={toggleDrawer}
      className="p-4"
    >
      <div className="mb-6 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          Cart
        </Typography>
        <IconButton variant="text" color="blue-gray" onClick={toggleDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        {currentOrder.length === 0 ? (
          <p className="text-muted-foreground text-sm">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {currentOrder.map((item) => (
              <li key={item.id} className="flex items-center space-x-4">
                <Image
                  src={item.images?.[0] ?? '/placeholder.svg'}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="size-16 rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {item.price.display_amount} x {item.quantity}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex-col items-stretch gap-2 sm:flex-row sm:justify-between">
        <div className="flex justify-between">
          <span>Total:</span>
          <span>{subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" onClick={clearCart} disabled={currentOrder.length === 0}>
            Clear Cart
          </Button>
          <Button color="green" disabled={currentOrder.length === 0}>
            Checkout
          </Button>
        </div>
      </div>
    </Drawer>
  );
}


export function CartIcon({ className, ...props }) {
  return (
    <svg
      className={`${className} text-indigo-700`}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1730_25270)">
        <path
          d="M5.33317 14.6668C5.70136 14.6668 5.99984 14.3684 5.99984 14.0002C5.99984 13.632 5.70136 13.3335 5.33317 13.3335C4.96498 13.3335 4.6665 13.632 4.6665 14.0002C4.6665 14.3684 4.96498 14.6668 5.33317 14.6668Z"
          stroke="currentColor"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.6667 14.6668C13.0349 14.6668 13.3333 14.3684 13.3333 14.0002C13.3333 13.632 13.0349 13.3335 12.6667 13.3335C12.2985 13.3335 12 13.632 12 14.0002C12 14.3684 12.2985 14.6668 12.6667 14.6668Z"
          stroke="currentColor"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.3667 1.36719H2.70003L4.47337 9.64719C4.53842 9.95043 4.70715 10.2215 4.95051 10.4138C5.19387 10.606 5.49664 10.7074 5.8067 10.7005H12.3267C12.6301 10.7 12.9244 10.596 13.1607 10.4057C13.3971 10.2154 13.5615 9.95021 13.6267 9.65385L14.7267 4.70052H3.41337"
          stroke="currentColor"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1730_25270">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}