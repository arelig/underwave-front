"use client"
import CartButton from "./CartButton";
import { Button } from "@material-tailwind/react";
import Link from "next/link";

export default function NavList() {
    return (
      <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
          <li>
            <Link href="/albums">
            <Button
              variant="text"
              className="flex items-center gap-3 text-indigo-800"
    >
      Albums
    </Button>
            </Link>
          </li>
          <li>
            <CartButton />
          </li>
      </ul>
    );
}

