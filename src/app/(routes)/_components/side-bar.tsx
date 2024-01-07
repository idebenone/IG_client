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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { logout } from "@/components/api/storageApi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(2).max(200),
  location: z.string(),
});

const SideBar = () => {
  const router = useRouter();
  const [image, setImage] = useState<any>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
    },
  });

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleFileSelect = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSharePost = () => {};

  return (
    <div className="w-[250px] border-r-[1px] border-gray-600 h-full p-4 flex flex-col gap-20">
      <div>Logo</div>

      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-8">
          <div className="flex gap-4 items-center cursor-pointer">
            <Home className="h-5 w-5 mb-1" />
            <Link href="/feed">Home</Link>
          </div>
          <div className="flex gap-4 items-center cursor-pointer">
            <Search className="h-5 w-5 mb-1" />
            <Sheet>
              <SheetTrigger>Search</SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Search Accounts</SheetTitle>
                  <Input placeholder="Search" />
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex gap-4 items-center cursor-pointer">
            <Compass className="h-5 w-5 mb-1" />
            <Link href="/explore">Explore</Link>
          </div>
          <div className="flex gap-4 items-center cursor-pointer">
            <Bell className="h-5 w-5 mb-1" />
            <Sheet>
              <SheetTrigger>Notification</SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Your Notifications</SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>

          <Dialog>
            <DialogTrigger>
              <div className="flex gap-4 items-center cursor-pointer">
                <PlusSquare className="h-5 w-5 mb-1" />
                <p>Create</p>
              </div>
            </DialogTrigger>
            <DialogContent className="min-w-[900px]">
              <DialogHeader>
                <DialogTitle>Create new post</DialogTitle>
              </DialogHeader>
              <div className="flex gap-2 w-full h-full">
                <div className="border w-full rounded-lg flex flex-col gap-2 justify-center items-center p-12">
                  {image && (
                    <Image
                      src={image}
                      width={100}
                      height={100}
                      alt="Selected Post"
                      className="w-full max-h-[400px] object-contain"
                    />
                  )}
                  <Input
                    type="file"
                    className="w-1/2"
                    onChange={handleFileSelect}
                  />
                </div>
                <div className="w-[600px]">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(handleSharePost)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea
                                placeholder="Write a caption"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Location"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">
                        Share
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex gap-4 items-center cursor-pointer">
            <PersonIcon className="h-5 w-5 mb-1" />
            <Link href="/profile">Profile</Link>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex gap-4 items-center cursor-pointer">
              <MoreHorizontal />
              More
            </div>
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
            <DropdownMenuItem onClick={handleLogout}>
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

export default SideBar;
