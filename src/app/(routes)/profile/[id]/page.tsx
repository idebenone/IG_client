"use client";

import { followUser, getOtherProfiles } from "@/components/api/userApi";
import { useEffect, useState } from "react";
import PostCards from "../../_components/post-cards";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Page({ params }: { params: { id: string } }) {
  const [profile, setProfile] = useState<any>({});
  const [posts, setPosts] = useState<any[]>([]);

  const handleFollowUser = async (id: string) => {
    await followUser(id);
  };

  const handleProfileFetch = async () => {
    const response = await getOtherProfiles(params.id);
    setProfile(response?.data.user);
    setPosts(response?.data.posts);
  };

  useEffect(() => {
    handleProfileFetch();
  }, []);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex gap-12 items-center">
        <div className="relative">
          <Image
            src={profile.profile_img}
            height={100}
            width={100}
            alt="Profile Image"
            className="cursor-pointer aspect-square object-cover rounded-full h-44 w-44"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-4 items-center">
            <p className="font-medium">{profile.username}</p>

            <Button
              variant={"secondary"}
              onClick={() => handleFollowUser(profile._id)}
            >
              Follow
            </Button>
            <Button variant={"secondary"}>Message</Button>
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
