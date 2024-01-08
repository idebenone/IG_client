"use client";

import { getProfile } from "@/components/api/userApi";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import PostCards from "../_components/post-cards";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [posts, setPosts] = useState<any[]>([]);

  const handleProfileFetch = async () => {
    const response = await getProfile();
    console.log(response?.data);
    setProfile(response?.data.user);
    setPosts(response?.data.posts);
  };

  useEffect(() => {
    handleProfileFetch();
  }, []);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex gap-12 items-center">
        <p className="bg-white rounded-full h-40 w-40"></p>

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

      <div className="grid grid-cols-3 gap-0.5">
        {posts.map((val, key) => (
          <div key={key}>
            <PostCards
              user={val.user}
              img={val.img}
              likes={val.likes_count}
              comment={val.comments_count}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
