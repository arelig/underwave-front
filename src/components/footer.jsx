"use client"

import { Typography } from "@material-tailwind/react";

export default function SimpleFooter() {
  return (
    <footer className="relative flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t  py-6 text-center md:justify-between bg-cover bg-center" style={{ backgroundImage: 'url(/bgwave.svg)', backgroundRepeat: 'no-repeat', backgroundPositionY: 'top' }}>
      <Typography color="white" className="font-normal">
        &copy; 2024 Underwave - Ingeniería en Aplicaciones Web
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Typography
            color="white"
            className="font-normal transition-colors hover:text-indigo-100 focus:text-indigo-200"
          >
            &copy; Credito: Material Tailwind
          </Typography>
        </li>
      </ul>
    </footer>
  );
}