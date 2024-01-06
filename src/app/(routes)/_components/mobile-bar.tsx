"use client";

import { PersonIcon } from "@radix-ui/react-icons";
import { Compass, Home, PlusSquare } from "lucide-react";
import Link from "next/link";

export default function MobileBar() {
  return (
    <div className="border-t-[1px] border-gray-600 p-3 flex justify-around bg-black">
      <div className="flex gap-4 items-center cursor-pointer">
        <Link href="/feed">
          <Home className="h-6 w-6 mb-1" />
        </Link>
      </div>
      <div className="flex gap-4 items-center cursor-pointer">
        <Link href="/explore">
          <Compass className="h-6 w-6 mb-1" />
        </Link>
      </div>
      <div className="flex gap-4 items-center cursor-pointer">
        <p>
          <PlusSquare className="h-6 w-6 mb-1" />
        </p>
      </div>
      <div className="flex gap-4 items-center cursor-pointer">
        <Link href="/profile">
          <PersonIcon className="h-6 w-6 mb-1" />
        </Link>
      </div>
    </div>
  );
}
