"use client";

import { Carousel, Typography } from "@material-tailwind/react";
import Image from "next/image";

 
export default function HomeCarousel() {
  return (
	<Carousel className="rounded-xl h-[500px]" loop={true} >
      <div className="relative h-full w-full">
        <Image
          src="https://images.unsplash.com/photo-1649495527004-68247643d82e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="image 1"
          width={1000}
          height={1000}
          priority
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl uppercase"
            >
              Underwave
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Tienda de discos
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full">
        <Image
          src="https://images.unsplash.com/photo-1544462415-5c4e1062755a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          alt="image 2"
          width={1000}
          height={1000}
          priority
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full items-center bg-black/50">
          <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl"
            >
              Mirá. Ordená. Escuchá.
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80"
            >
              Ordena discos desde la comodidad de tu casa, a solo un click!
            </Typography>
          </div>
        </div>
      </div>
    </Carousel>
  );
}

