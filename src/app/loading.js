"use client";
import { Spinner } from "@material-tailwind/react";

export default function Loading() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <Spinner color="indigo" />
        </div>
      </div>
    );
  }