"use client"

import { Button } from "@material-tailwind/react";

//wrap the button and recieve props for the button
export default function CustomButton({ children, ...props }) {
  return (
    <Button
      color="blue"
      ripple="light"
      {...props}
    >
      {children}
    </Button>
  );
}