"use client";

import Link from "next/link";

import { PersonIcon } from "@radix-ui/react-icons";
import {
  Bell,
  Compass,
  Home,
  LogOut,
  MoreHorizontal,
  PlusSquare,
  Search,
  Settings,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

const MediumBar = () => {
  return (
    <div className=" border-r-[1px] border-gray-600 h-full p-4 flex flex-col justify-between items-center">
      <div>Logo</div>

      <div className="flex flex-col gap-8">
        <div className="flex gap-4 items-center cursor-pointer">
          <Link href="/feed">
            <Home className="h-5 w-5 mb-1" />
          </Link>
        </div>
        <div className="flex gap-4 items-center cursor-pointer">
          <Sheet>
            <SheetTrigger>
              <Search className="h-5 w-5 mb-1" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Search Accounts</SheetTitle>
                <Input placeholder="Search" />
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex gap-4 items-center cursor-pointer">
          <Link href="/explore">
            <Compass className="h-5 w-5 mb-1" />
          </Link>
        </div>
        <div className="flex gap-4 items-center cursor-pointer">
          <Sheet>
            <SheetTrigger>
              <Bell className="h-5 w-5 mb-1" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Your Norifications</SheetTitle>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex gap-4 items-center cursor-pointer">
          <p>
            <PlusSquare className="h-5 w-5 mb-1" />
          </p>
        </div>
        <div className="flex gap-4 items-center cursor-pointer">
          <Link href="/profile">
            <PersonIcon className="h-5 w-5 mb-1" />
          </Link>
        </div>
      </div>

      <div className="flex gap-4 items-center cursor-pointer">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>More</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span className="flex gap-2 items-center">
                <Settings className="h-5 w-5" />
                Settings
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span className="flex gap-2 items-center">
                <LogOut className="h-5 w-5" />
                Logout
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MediumBar;
