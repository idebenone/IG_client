"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

import { getProfile, uploadProfileImage } from "@/components/api/userApi";
import PostCards from "../_components/post-cards";
import { Bookmark, HeartIcon, MessageCircle, Send } from "lucide-react";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [posts, setPosts] = useState<any[]>([]);
  const [post, setPost] = useState<any>({});

  const handleFileSelect = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProfileImgUpload(file);
    }
  };

  const handleProfileImgUpload = async (image: any) => {
    try {
      const formData = new FormData();
      formData.append("file", image, "profile.jpg");
      const response = await uploadProfileImage(formData as any);
      if (response?.status == 200) handleProfileFetch();
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  const handleProfileFetch = async () => {
    const response = await getProfile();
    setProfile(response?.data.user);
    setPosts(response?.data.posts);
  };

  const handleOpenPost = (data: any) => {
    setPost(data);
  };

  const formatDate = (inputDate: string): string => {
    const date = new Date(inputDate);
    const options: any = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(date);
  };

  useEffect(() => {
    handleProfileFetch();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full items-center">
        <div className="flex gap-12 items-center">
          <div className="relative">
            <label htmlFor="file">
              <Image
                src={profile.profile_img}
                height={100}
                width={100}
                alt="Profile Image"
                className="cursor-pointer aspect-square object-cover rounded-full h-44 w-44"
              />
            </label>
            <input
              id="file"
              className="hidden"
              type="file"
              onChange={handleFileSelect}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-4 items-center">
              <p className="font-medium">{profile.username}</p>

              <Button variant={"secondary"}>Edit Profile</Button>
              <Button variant={"secondary"}>View Archive</Button>
            </div>

            <div className="flex gap-4">
              <div className="flex gap-1">
                <p className="font-semibold">{profile.posts_count}</p>
                <p className="text-muted-foreground">posts</p>
              </div>

              <div className="flex gap-1">
                <p className="font-semibold">{profile.followers_count}</p>
                <p className="text-muted-foreground">followers</p>
              </div>

              <div className="flex gap-1">
                <p className="font-semibold">{profile.following_count}</p>
                <p className="text-muted-foreground">following</p>
              </div>
            </div>

            <p className="font-light">{profile.name}</p>
          </div>
        </div>

        <Separator className="my-12" />

        <Dialog>
          <DialogTrigger asChild>
            <div className="grid grid-cols-3 gap-0.5">
              {posts.map((val, key) => (
                <div key={key} onClick={() => handleOpenPost(val)}>
                  <PostCards
                    user={val.user}
                    img={val.img}
                    likes={val.likes_count}
                    comment={val.comments_count}
                  />
                </div>
              ))}
            </div>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <div className="flex flex-col md:flex-row gap-1">
              <Image
                src={post.img}
                width={100}
                height={100}
                alt="Individual Post"
                className="w-full h-full"
              />
              <div className="w-full flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <p>I</p>
                    <p>username</p>
                  </div>
                  <p>...</p>
                </div>

                <div className="flex flex-col h-full">
                  <p className="font-thin">{post.caption}</p>
                  <p className="text-center">Comments</p>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-4">
                      <HeartIcon className="cursor-pointer" />
                      <MessageCircle className="cursor-pointer" />
                      <Send className="cursor-pointer" />
                    </div>
                    <Bookmark className="cursor-pointer" />
                  </div>

                  <div>
                    <p className="font-semibold text-xs">
                      {post.likes_count} likes
                    </p>
                    <p className="font-thin text-xs">
                      {formatDate(post.created_at)}
                    </p>
                  </div>

                  <Separator />

                  <div className="flex w-full">
                    <Input
                      placeholder="Write a comment"
                      className="w-full border-none focus:outline-none"
                    />
                    <Button variant={"ghost"}>Post</Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
